# Balford — Automated Toolset for Stamping, Deep Drawing & Die Design

![License](https://img.shields.io/badge/license-MIT-00a86b)
![Python](https://img.shields.io/badge/python-3.9%2B-3776ab)
![Website](https://img.shields.io/badge/website-balford.net-00a86b)
![ISO 9001](https://img.shields.io/badge/ISO-9001%3A2015-003a00)
![IATF-aligned](https://img.shields.io/badge/IATF%2016949-practices-00a86b)
![PPAP](https://img.shields.io/badge/PPAP-ready-a8003d)
![Languages](https://img.shields.io/badge/resources-36%2B%20languages-007a4d)
![PDF library](https://img.shields.io/badge/PDF-18%20documents%20%2B%20volume-a8003d)
![Chrome](https://img.shields.io/badge/Chrome%20extension-ready-00a86b)
![npm](https://img.shields.io/badge/npm%20package-ready-cb3837)
[![tests](https://github.com/balford-mechatronics/balford/actions/workflows/tests.yml/badge.svg)](https://github.com/balford-mechatronics/balford/actions/workflows/tests.yml)

Command-line calculators and design checks for **metal stamping, deep drawing, progressive die work and sheet metal bending** — the same rules our DFM engineers apply every day at [Balford](https://balford.net/), a 12,000 m² precision metal forming plant in Zhuji, Zhejiang, China.

Use this toolset early in the design phase to answer the questions that decide tooling cost and part quality:

- Can this cylindrical part be deep drawn in **one hit**, or does it need multi-stage tooling?
- What blank diameter do I start with, and what is the **draw ratio**?
- How much **blanking / cutting force** does the press need?
- What is the **bend allowance** for a given radius, thickness and angle?
- How much does the blank or finished part **weigh**?

## Public engineering resources

The repository is one part of a larger public engineering library:

| Resource | What you will find |
|---|---|
| [Balford Engineering Answers](https://balford.net/ask/) | Cited answers on fine blanking, thinning deep drawing, materials, tolerances, tooling, DFM and RFQ preparation |
| [Metal fabrication calculators](https://balford.net/resources/calculator/) | Deep drawing force, blanking force, bend allowance, tube unfold, material weight and springback |
| [Technical PDF library](https://balford.net/resources/technical-series/) | Eighteen individual technical documents plus a 37-page compiled volume |
| [Site search](https://balford.net/search/) | Search capabilities, applications, materials, cases and engineering resources |
| [Notion engineering hub](https://reinvented-pulsar-977.notion.site/Balford-Engineering-Hub-58f3230be4918224b694810021478d9f) | A public, search-indexable index of the Ask console, calculators, PDFs and RFQ route |
| [RFQ and drawing upload](https://rfq.balford.net/) | Route a 2D/3D drawing through engineering and quotation review |

The public resource network is available in more than 35 languages and regional
variant editions. See [docs/resource-index.md](docs/resource-index.md) for a
curated index, or import the [Notion engineering hub](notion/Balford-Engineering-Hub.md).

## Install

```bash
git clone https://github.com/balford-mechatronics/balford.git
cd balford
pip install -e .
```

## Quick start

```bash
# Deep drawing feasibility for a cup: OD 22 mm, height 45 mm, wall 1.2 mm
balford deep-draw --diameter 22 --height 45 --thickness 1.2

# Blanking force: perimeter 220 mm, thickness 1.5 mm, UTS 400 MPa
balford blanking-force --perimeter 220 --thickness 1.5 --uts 400

# Bend allowance: radius 2 mm, thickness 1.5 mm, 90°
balford bend-allowance --radius 2 --thickness 1.5 --angle 90

# Blank weight: area 380 mm², thickness 1.5 mm, steel
balford weight --area 380 --thickness 1.5 --material steel
```

Example output:

```text
$ balford deep-draw --diameter 22 --height 45 --thickness 1.2
Blank diameter (approx.) : 66.7 mm
Draw ratio               : 3.03
Verdict                  : multi-stage
Draw force (estimate)    : 77.3 kN
Hint                     : Requires multi-stage deep drawing tooling (redraws and possible annealing).
```

## Python API

```python
from balfordtools.deep_draw import deep_draw_check

result = deep_draw_check(diameter_mm=22, height_mm=45, thickness_mm=1.2)
print(result.blank_diameter_mm)   # ~66.7
print(result.draw_ratio)          # ~3.03
print(result.verdict)             # "multi-stage"
```

## JavaScript, npm and Chrome extension

The browser assets share one dependency-free calculation core:

- [`packages/stamp-calc`](packages/stamp-calc/) — npm package source for deep drawing, blanking and bend calculations.
- [`apps/chrome-extension`](apps/chrome-extension/) — Manifest V3 extension with all three calculators.
- [`notion/Balford-Engineering-Hub.md`](notion/Balford-Engineering-Hub.md) — import-ready source for the [live Notion engineering hub](https://reinvented-pulsar-977.notion.site/Balford-Engineering-Hub-58f3230be4918224b694810021478d9f).

Install the package from this checkout:

```bash
npm install ./packages/stamp-calc
```

```js
import { deepDrawingForce } from "balford-stamping-calculators";

const result = deepDrawingForce({
  blankDiameterMm: 100,
  productDiameterMm: 65,
  thicknessMm: 1.5,
  tensileStrengthMpa: 310,
});

console.log(result.punchForceKN);
```

Build the unpacked extension and Chrome Web Store ZIP:

```bash
npm test
npm run build:extension
npm run pack:extension
```

The extension requests no permissions, sends no entered dimensions off the
device and imports the same core published for npm. The store listing copy is in
[`apps/chrome-extension/STORE-LISTING.md`](apps/chrome-extension/STORE-LISTING.md).

## Reference data

The tables our engineers actually look up, as files you can diff, quote or drop
into a spreadsheet. Every value is a planning figure for feasibility checks — the
limiting draw ratio of a specific material lot still has to be confirmed in
tooling tryout.

| Data | File |
|---|---|
| Limiting draw ratio (first draw + redraw) by material | [`data/limit-draw-ratios.csv`](data/limit-draw-ratios.csv) |
| Die clearance per side by material | [`data/die-clearance.csv`](data/die-clearance.csv) |
| Deep drawing defects → cause → remedy | [`data/deep-drawing-defects.csv`](data/deep-drawing-defects.csv) |
| Material designations and where they are used | [`data/deep-drawing-materials.csv`](data/deep-drawing-materials.csv) |

Written out with the formulas, the stage-count estimate and the tolerance notes:

- **[Deep drawing design guide](docs/deep-drawing-design-guide.md)** — blank diameter, draw ratio, draw force, die clearance, blank holder, ironing, defects, tolerances
- **[DFM checklist](docs/dfm-checklist.md)** — what to send with a drawing so the first quotation round is the last one

Highest-value numbers from the guide:

| Material | Typical designation | First draw ratio |
|---|---|---|
| Low carbon steel | DC04, SPHE | 1.8 – 2.0 |
| Pure iron | DT4, DT4C | 1.8 – 2.0 |
| Brass / copper | CuZn37, Cu-ETP | 1.8 – 2.2 |
| Stainless steel | 1.4301, 1.4404 | 1.6 – 1.8 |
| Aluminium | EN AW-1050, 3003, 5754 | ~1.4 – 1.6 (alloy dependent) |

## Modules

| Module | Purpose |
|---|---|
| `balfordtools/deep_draw.py` | blank diameter, draw ratio, single vs multi-stage verdict, draw force estimate |
| `balfordtools/stamping_force.py` | blanking/cutting force, stripping force estimate |
| `balfordtools/bend_allowance.py` | K-factor bend allowance in degrees or radians |
| `balfordtools/material_weight.py` | part/blank weight from area, thickness and material density |
| `balfordtools/cli.py` | command-line entry points |

## Engineering references

The formulas are simplified first-pass estimates used for feasibility and quoting sanity checks. Always validate critical geometries with a full DFM review, and confirm tooling decisions with experienced die engineers.

- [Deep drawing guide — process, calculations, defects](https://balford.net/deep-drawing/)
- [Deep drawing terminology — drawing, redrawing, ironing, hydroforming](https://balford.net/deep-drawing-terminology/)
- [Deep draw stamping services — capabilities & limits](https://balford.net/capabilities/deep-draw-metal-stamping/)
- [Capability boundaries, stated honestly](https://balford.net/deep-drawn-metal-stamping-our-capability-boundaries/)
- [Progressive die stamping services](https://balford.net/capabilities/progressive-die-metal-stamping/)
- [In-house tooling design & build](https://balford.net/capabilities/in-house-tooling-design-build/)
- [Engineering answer console](https://balford.net/ask/)
- [Online calculators on balford.net](https://balford.net/resources/calculator/)
- [Technical Series and downloadable PDFs](https://balford.net/resources/technical-series/)
- [PPAP-ready automotive documentation](https://balford.net/ppap/)

The guide is also published in German (https://balford.net/de/tiefziehen/), Chinese
(https://balford.net/zh/deep-drawing/), Japanese, French and Italian.

## Typical parts this toolset supports

| Part family | Typical process | Reference |
|---|---|---|
| Solenoid valve housings | deep drawing, iron/stainless | [solenoid housing hub](https://balford.net/applications/solenoid-valve-housing/) |
| Sensor housings (O₂, NOx, ABS) | multi-stage deep drawing | [sensor housing catalogue](https://balford.net/applications/sensor-housing/catalogue/) |
| Motor sleeves & magnetic shields | deep drawing + annealing | [motor housing hub](https://balford.net/applications/motor-housing/) |
| Washers, caps, brackets | progressive die stamping | [stamping services](https://balford.net/capabilities/metal-stamping-services/) |

## Citing this toolset

If you reference these numbers or the toolset in a design review, a paper or a
supplier comparison, please cite it — `CITATION.cff` is included so GitHub, Zotero
and reference managers can pick it up automatically.

```text
Balford (2026). Balford deep drawing & metal stamping design toolset (v0.2.0).
https://github.com/balford-mechatronics/balford
```

## Contributing

Corrections with a reference beat opinions. If a value in `data/` disagrees with
your own tryout data, open an issue with the material, thickness, tooling setup
and the measured result.

## Disclaimer

Provided under MIT license as engineering estimation tools. Results are not a substitute for DFM review, simulation (e.g., AutoForm-class analysis) or production tooling validation.

---

**Balford** · Founded 2017 · ISO 9001:2015 · IATF 16949-aligned controls · [balford.net](https://balford.net/) · Send drawings for engineering and quotation review at [rfq.balford.net](https://rfq.balford.net/)
