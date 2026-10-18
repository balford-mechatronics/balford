/**
 * First-pass sheet-metal calculations used by the Balford web calculators and
 * browser extension. The functions are deterministic, dependency-free and
 * intentionally return raw values; formatting belongs to the caller.
 */

export const VERSION = "0.1.0";

/** C1 coefficient table for a first deep draw, ordered by m = d / D. */
export const C1_TABLE = Object.freeze([
  Object.freeze({ m: 0.8, c1: 0.4 }),
  Object.freeze({ m: 0.7, c1: 0.6 }),
  Object.freeze({ m: 0.6, c1: 0.9 }),
  Object.freeze({ m: 0.55, c1: 1.1 }),
]);

function requirePositive(name, value) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number`);
  }
  return value;
}

function linearInterpolate(x, x1, y1, x2, y2) {
  return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}

/**
 * Interpolate C1 for a first-draw coefficient m = product diameter / blank
 * diameter. The published table covers m = 0.55 to 0.80.
 */
export function c1ForDrawRatio(m) {
  if (!Number.isFinite(m) || m < 0.55 || m > 0.8) return null;

  for (let i = 0; i < C1_TABLE.length - 1; i += 1) {
    const upper = C1_TABLE[i];
    const lower = C1_TABLE[i + 1];
    if (m <= upper.m && m >= lower.m) {
      return linearInterpolate(m, upper.m, upper.c1, lower.m, lower.c1);
    }
  }

  return null;
}

/**
 * Estimate punch force, blank-holder force and tool-radius guidance for a
 * cylindrical first draw.
 *
 * Punch force: F = pi * C1 * d * t * tensile strength
 * Blank-holder force: approximately 25% of punch force in this first-pass model.
 */
export function deepDrawingForce({
  blankDiameterMm,
  productDiameterMm,
  thicknessMm,
  tensileStrengthMpa,
}) {
  const blankDiameter = requirePositive("blankDiameterMm", blankDiameterMm);
  const productDiameter = requirePositive("productDiameterMm", productDiameterMm);
  const thickness = requirePositive("thicknessMm", thicknessMm);
  const tensileStrength = requirePositive("tensileStrengthMpa", tensileStrengthMpa);

  if (productDiameter > blankDiameter) {
    throw new RangeError("productDiameterMm cannot exceed blankDiameterMm");
  }

  const drawingRatio = productDiameter / blankDiameter;
  const c1 = c1ForDrawRatio(drawingRatio);
  const punchForceN =
    c1 === null ? null : Math.PI * c1 * productDiameter * thickness * tensileStrength;
  const blankHolderForceN = punchForceN === null ? null : punchForceN * 0.25;
  const dieRadiusMinMm = blankDiameter * 0.06;
  const dieRadiusMaxMm = blankDiameter * 0.1;

  let severity = "table";
  if (drawingRatio < 0.5) severity = "severe";
  else if (drawingRatio < 0.55) severity = "below-table";
  else if (drawingRatio > 0.8) severity = "shallow";

  return {
    drawingRatio,
    c1,
    punchForceN,
    punchForceKN: punchForceN === null ? null : punchForceN / 1000,
    punchForceTonf: punchForceN === null ? null : punchForceN / 9806.65,
    blankHolderForceN,
    blankHolderForceKN: blankHolderForceN === null ? null : blankHolderForceN / 1000,
    dieRadiusMinMm,
    dieRadiusMaxMm,
    punchRadiusMinMm: dieRadiusMinMm * 0.6,
    punchRadiusMaxMm: dieRadiusMaxMm,
    severity,
    isEstimateAvailable: c1 !== null,
  };
}

/**
 * Blanking/cutting force from cut perimeter, sheet thickness and shear strength.
 * If punchAreaMm2 is supplied, punch compressive stress is also returned.
 */
export function blankingForce({
  cutPerimeterMm,
  thicknessMm,
  shearStrengthMpa,
  punchAreaMm2 = null,
}) {
  const perimeter = requirePositive("cutPerimeterMm", cutPerimeterMm);
  const thickness = requirePositive("thicknessMm", thicknessMm);
  const shearStrength = requirePositive("shearStrengthMpa", shearStrengthMpa);

  const shearAreaMm2 = perimeter * thickness;
  const cuttingForceN = shearAreaMm2 * shearStrength;
  let punchStressMpa = null;
  if (punchAreaMm2 !== null) {
    const punchArea = requirePositive("punchAreaMm2", punchAreaMm2);
    punchStressMpa = cuttingForceN / punchArea;
  }

  return {
    shearAreaMm2,
    cuttingForceN,
    cuttingForceKN: cuttingForceN / 1000,
    cuttingForceTonf: cuttingForceN / 9806.65,
    strippingForceN: cuttingForceN * 0.12,
    strippingForceKN: (cuttingForceN * 0.12) / 1000,
    punchStressMpa,
  };
}

/** Circular blank convenience wrapper around blankingForce(). */
export function circularBlankingForce({
  punchDiameterMm,
  thicknessMm,
  shearStrengthMpa,
}) {
  const diameter = requirePositive("punchDiameterMm", punchDiameterMm);
  return blankingForce({
    cutPerimeterMm: Math.PI * diameter,
    thicknessMm,
    shearStrengthMpa,
    punchAreaMm2: (Math.PI * diameter * diameter) / 4,
  });
}

/**
 * Bend allowance, outside setback, bend deduction and optional flat length.
 *
 * BA = angleRadians * (insideRadius + K * thickness)
 * OSSB = (insideRadius + thickness) * tan(angle / 2)
 * BD = 2 * OSSB - BA
 */
export function bendAllowance({
  insideRadiusMm,
  thicknessMm,
  bendAngleDeg,
  kFactor = 0.33,
  leg1Mm = null,
  leg2Mm = null,
}) {
  if (!Number.isFinite(insideRadiusMm) || insideRadiusMm < 0) {
    throw new RangeError("insideRadiusMm must be zero or a positive finite number");
  }
  const thickness = requirePositive("thicknessMm", thicknessMm);
  if (!Number.isFinite(bendAngleDeg) || bendAngleDeg <= 0 || bendAngleDeg >= 180) {
    throw new RangeError("bendAngleDeg must be between 0 and 180 degrees");
  }
  if (!Number.isFinite(kFactor) || kFactor < 0 || kFactor > 0.5) {
    throw new RangeError("kFactor must be between 0 and 0.5");
  }

  const angleRadians = (bendAngleDeg * Math.PI) / 180;
  const allowanceMm = angleRadians * (insideRadiusMm + kFactor * thickness);
  const outsideSetbackMm =
    (insideRadiusMm + thickness) * Math.tan(angleRadians / 2);
  const deductionMm = 2 * outsideSetbackMm - allowanceMm;

  let flatLengthMm = null;
  if (leg1Mm !== null || leg2Mm !== null) {
    const leg1 = requirePositive("leg1Mm", leg1Mm);
    const leg2 = requirePositive("leg2Mm", leg2Mm);
    flatLengthMm = leg1 + leg2 - deductionMm;
    if (flatLengthMm <= 0) {
      throw new RangeError("leg lengths are too short for the bend deduction");
    }
  }

  return {
    angleRadians,
    bendAllowanceMm: allowanceMm,
    outsideSetbackMm,
    bendDeductionMm: deductionMm,
    flatLengthMm,
  };
}

/** Mass in kilograms from a volume in cubic millimetres. */
export function massFromVolume({ volumeMm3, densityKgM3 }) {
  const volume = requirePositive("volumeMm3", volumeMm3);
  const density = requirePositive("densityKgM3", densityKgM3);
  return (volume / 1_000_000_000) * density;
}
