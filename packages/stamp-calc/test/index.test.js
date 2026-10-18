import assert from "node:assert/strict";
import test from "node:test";

import {
  bendAllowance,
  blankingForce,
  c1ForDrawRatio,
  circularBlankingForce,
  deepDrawingForce,
} from "../src/index.js";

test("C1 interpolation follows the published table", () => {
  assert.equal(c1ForDrawRatio(0.8), 0.4);
  assert.equal(c1ForDrawRatio(0.55), 1.1);
  assert.ok(Math.abs(c1ForDrawRatio(0.675) - 0.675) < 1e-12);
  assert.equal(c1ForDrawRatio(0.9), null);
});

test("deep drawing force returns force, holder force and radius guidance", () => {
  const result = deepDrawingForce({
    blankDiameterMm: 100,
    productDiameterMm: 65,
    thicknessMm: 1.5,
    tensileStrengthMpa: 310,
  });

  assert.ok(Math.abs(result.drawingRatio - 0.65) < 1e-12);
  assert.ok(Math.abs(result.c1 - 0.75) < 1e-12);
  assert.ok(Math.abs(result.punchForceKN - 71.216) < 0.1);
  assert.ok(Math.abs(result.blankHolderForceKN - 17.804) < 0.1);
  assert.equal(result.dieRadiusMinMm, 6);
  assert.equal(result.dieRadiusMaxMm, 10);
  assert.equal(result.isEstimateAvailable, true);
});

test("blanking force uses shear area times shear strength", () => {
  const result = blankingForce({
    cutPerimeterMm: 220,
    thicknessMm: 1.5,
    shearStrengthMpa: 360,
  });

  assert.equal(result.shearAreaMm2, 330);
  assert.equal(result.cuttingForceKN, 118.8);
  assert.equal(result.strippingForceKN, 14.256);
});

test("circular blanking force also reports punch stress", () => {
  const result = circularBlankingForce({
    punchDiameterMm: 80,
    thicknessMm: 1.5,
    shearStrengthMpa: 360,
  });

  assert.ok(Math.abs(result.cuttingForceKN - 135.717) < 0.01);
  assert.ok(Math.abs(result.punchStressMpa - 27) < 1e-9);
});

test("bend allowance returns BA, BD, OSSB and flat length", () => {
  const result = bendAllowance({
    insideRadiusMm: 2,
    thicknessMm: 1.5,
    bendAngleDeg: 90,
    kFactor: 0.33,
    leg1Mm: 40,
    leg2Mm: 25,
  });

  assert.ok(Math.abs(result.bendAllowanceMm - 3.919) < 0.001);
  assert.ok(Math.abs(result.outsideSetbackMm - 3.5) < 1e-12);
  assert.ok(Math.abs(result.bendDeductionMm - 3.081) < 0.001);
  assert.ok(Math.abs(result.flatLengthMm - 61.919) < 0.001);
});

test("invalid dimensions are rejected", () => {
  assert.throws(
    () =>
      deepDrawingForce({
        blankDiameterMm: 50,
        productDiameterMm: 60,
        thicknessMm: 1,
        tensileStrengthMpa: 300,
      }),
    /cannot exceed/
  );
  assert.throws(
    () =>
      bendAllowance({
        insideRadiusMm: 2,
        thicknessMm: 1,
        bendAngleDeg: 180,
      }),
    /between 0 and 180/
  );
});
