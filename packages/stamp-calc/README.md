# balford-stamping-calculators

Dependency-free JavaScript calculators for early-stage sheet-metal and stamping
feasibility checks:

- Deep drawing ratio, C1 interpolation, punch force, blank-holder force and radius guidance
- Blanking/cutting force and punch compressive stress
- Bend allowance, outside setback, bend deduction and flat length

The functions use millimetres and MPa. They are planning estimates, not a
substitute for DFM review, simulation or tooling tryout.

## Install

```bash
npm install balford-stamping-calculators
```

## Deep drawing

```js
import { deepDrawingForce } from "balford-stamping-calculators";

const result = deepDrawingForce({
  blankDiameterMm: 100,
  productDiameterMm: 65,
  thicknessMm: 1.5,
  tensileStrengthMpa: 310,
});

console.log(result.punchForceKN); // about 71.4 kN
```

## Blanking force

```js
import { circularBlankingForce } from "balford-stamping-calculators";

const result = circularBlankingForce({
  punchDiameterMm: 80,
  thicknessMm: 1.5,
  shearStrengthMpa: 360,
});

console.log(result.cuttingForceKN);
```

## Bend allowance

```js
import { bendAllowance } from "balford-stamping-calculators";

const result = bendAllowance({
  insideRadiusMm: 2,
  thicknessMm: 1.5,
  bendAngleDeg: 90,
  kFactor: 0.33,
  leg1Mm: 40,
  leg2Mm: 25,
});

console.log(result.flatLengthMm);
```

## Scope

The package is maintained by [Balford](https://balford.net/) and is used by the
Balford Stamping Calculators Chrome extension. The browser calculators remain
available at [balford.net/resources/calculator](https://balford.net/resources/calculator/).

MIT licensed. Confirm production tooling decisions against the drawing, material
certificate and first-article inspection.
