# Balford Stamping Calculators browser extension source

Manifest V3 popup with three offline calculators:

- Deep drawing force and draw ratio
- Circular blanking force
- Bend allowance and flat length

The extension requests no permissions and sends no calculated values off the
device. It imports the same JavaScript calculation core published from
`packages/stamp-calc`.

## Build

From the repository root:

```bash
npm run build:extension
npm run pack:extension
```

The unpacked extension is written to `dist/balford-stamping-calculator/`. An
optional self-distribution ZIP is written to
`dist/balford-stamping-calculator-v0.1.0.zip`.

There is no Chrome Web Store registration or submission in the current
distribution plan.

## Local test

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Choose **Load unpacked**.
4. Select `dist/balford-stamping-calculator/`.

The popup works without network access.
