export declare const VERSION: "0.1.0";

export interface C1Point {
  readonly m: number;
  readonly c1: number;
}

export declare const C1_TABLE: readonly C1Point[];

export interface DeepDrawingInput {
  blankDiameterMm: number;
  productDiameterMm: number;
  thicknessMm: number;
  tensileStrengthMpa: number;
}

export interface DeepDrawingResult {
  drawingRatio: number;
  c1: number | null;
  punchForceN: number | null;
  punchForceKN: number | null;
  punchForceTonf: number | null;
  blankHolderForceN: number | null;
  blankHolderForceKN: number | null;
  dieRadiusMinMm: number;
  dieRadiusMaxMm: number;
  punchRadiusMinMm: number;
  punchRadiusMaxMm: number;
  severity: "table" | "severe" | "below-table" | "shallow";
  isEstimateAvailable: boolean;
}

export interface BlankingInput {
  cutPerimeterMm: number;
  thicknessMm: number;
  shearStrengthMpa: number;
  punchAreaMm2?: number | null;
}

export interface BlankingResult {
  shearAreaMm2: number;
  cuttingForceN: number;
  cuttingForceKN: number;
  cuttingForceTonf: number;
  strippingForceN: number;
  strippingForceKN: number;
  punchStressMpa: number | null;
}

export interface CircularBlankingInput {
  punchDiameterMm: number;
  thicknessMm: number;
  shearStrengthMpa: number;
}

export interface BendAllowanceInput {
  insideRadiusMm: number;
  thicknessMm: number;
  bendAngleDeg: number;
  kFactor?: number;
  leg1Mm?: number | null;
  leg2Mm?: number | null;
}

export interface BendAllowanceResult {
  angleRadians: number;
  bendAllowanceMm: number;
  outsideSetbackMm: number;
  bendDeductionMm: number;
  flatLengthMm: number | null;
}

export declare function c1ForDrawRatio(m: number): number | null;
export declare function deepDrawingForce(input: DeepDrawingInput): DeepDrawingResult;
export declare function blankingForce(input: BlankingInput): BlankingResult;
export declare function circularBlankingForce(input: CircularBlankingInput): BlankingResult;
export declare function bendAllowance(input: BendAllowanceInput): BendAllowanceResult;
export declare function massFromVolume(input: {
  volumeMm3: number;
  densityKgM3: number;
}): number;
