# Balford Engineering Hub

> A working index for sheet-metal designers, buyers and manufacturing engineers: ask a focused question, run a first-pass calculation, download a technical document, then send the drawing for review.

This page is maintained by [Balford](https://balford.net/), a metal forming manufacturer in Zhuji, Zhejiang, China. The resources below are public and do not sit behind a lead form.

## Start with the question you have

| If you need to… | Start here |
|---|---|
| Understand a process or check a definition | [Balford Engineering Answers](https://balford.net/ask/) |
| Estimate force, mass or flat length | [Metal fabrication calculators](https://balford.net/resources/calculator/) |
| Read a detailed technical argument | [Technical PDF library](https://balford.net/resources/technical-series/) |
| Search the published website | [Search balford.net](https://balford.net/search/) |
| Send a drawing for engineering and quotation review | [RFQ and drawing upload](https://rfq.balford.net/) |

## Engineering answer console

The [Balford Ask console](https://balford.net/ask/) answers questions about fine blanking, thinning and ironing deep drawing, materials, tolerances, tooling, PPAP, DFM and RFQ preparation. Each answer cites the published Balford page used as evidence. When the public material does not cover a point, the answer says so instead of filling the gap with a guess.

Useful starting questions:

- [What is fine blanking?](https://balford.net/ask/q/what-is-fine-blanking/)
- [What is thinning deep drawing?](https://balford.net/ask/q/what-is-thinning-deep-drawing/)
- [What does a DFM review cover?](https://balford.net/ask/q/what-is-dfm-and-what-does-a-review-cover/)
- [What information is needed for an RFQ?](https://balford.net/ask/q/what-information-is-needed-for-an-rfq/)

## Six calculators

All six calculators are free, work without an account and accept metric values unless the page states otherwise. They are first-pass checks, not substitutes for process simulation or tooling tryout.

| Calculator | What it answers |
|---|---|
| [Deep drawing force](https://balford.net/resources/calculator/deep-draw/) | Drawing ratio, C1 coefficient, punch force, blank-holder force and die-radius guidance |
| [Stamping and blanking force](https://balford.net/resources/calculator/stamping-force/) | Cutting force and press-tonnage requirement from perimeter, thickness and shear strength |
| [Bend allowance](https://balford.net/resources/calculator/bend-allowance/) | Bend allowance, bend deduction, K-factor and flat length |
| [Tube bending unfold](https://balford.net/resources/calculator/tube-unfold/) | Developed length for round and square tube bend sequences |
| [Material weight](https://balford.net/resources/calculator/material-weight/) | Gross mass for plates, bars, tubes, angles and rings |
| [Springback](https://balford.net/resources/calculator/springback/) | Springback ratio, overbend setpoint and final radius for V bending |

The same three core checks are also packaged as a Manifest V3 browser extension
source and a `balford-stamping-calculators` JavaScript package in the Balford
GitHub repository. The extension can be loaded unpacked; it is not distributed
through the Chrome Web Store.

## Technical PDF library

The [Balford Technical Series](https://balford.net/resources/technical-series/) currently contains eighteen documents plus a 37-page compiled volume. The individual PDFs are:

1. [Deep drawn, stamped and machined metal components](https://balford.net/downloads/technical-series/balford-technical-series-01-balford-deep-drawn-stamped-machined-metal-components.pdf)
2. [How to choose a deep drawing supplier](https://balford.net/downloads/technical-series/balford-technical-series-02-how-to-choose-a-deep-drawing-supplier-in-china.pdf)
3. [Deep drawing versus progressive die stamping](https://balford.net/downloads/technical-series/balford-technical-series-03-deep-drawing-vs-progressive-die-stamping.pdf)
4. [Solenoid valve housing manufacturing](https://balford.net/downloads/technical-series/balford-technical-series-04-solenoid-valve-housing-manufacturing.pdf)
5. [Soft magnetic materials for solenoid housings](https://balford.net/downloads/technical-series/balford-technical-series-05-soft-magnetic-materials-solenoid-valve-housings.pdf)
6. [IMDS, PPAP and material compliance](https://balford.net/downloads/technical-series/balford-technical-series-06-imds-ppap-material-compliance-stamped-parts.pdf)
7. [Inside a 12,000 m² metal stamping factory](https://balford.net/downloads/technical-series/balford-technical-series-07-inside-a-12000-m2-metal-stamping-factory.pdf)
8. [From drawing to PPAP](https://balford.net/downloads/technical-series/balford-technical-series-08-from-drawing-to-ppap-deep-drawn-part.pdf)
9. [Aluminium versus stainless steel deep drawing](https://balford.net/downloads/technical-series/balford-technical-series-09-deep-drawing-aluminium-vs-stainless-steel.pdf)
10. [Magnetic annealing for solenoid components](https://balford.net/downloads/technical-series/balford-technical-series-10-magnetic-annealing-solenoid-components.pdf)
11. [Reading stamping tolerances on a drawing](https://balford.net/downloads/technical-series/balford-technical-series-11-metal-stamping-tolerance-standards-reading-a-drawing.pdf)
12. [Motor housing end cap and wall thickness](https://balford.net/downloads/technical-series/balford-technical-series-12-motor-housing-end-cap-stamping-wall-thickness.pdf)
13. [Leak tightness in deep drawn housings](https://balford.net/downloads/technical-series/balford-technical-series-13-deep-drawn-housing-leak-tightness.pdf)
14. [Drawn-part temper selection](https://balford.net/downloads/technical-series/balford-technical-series-14-drawn-part-temper-selection.pdf)
15. [Sensor housing wall thickness](https://balford.net/downloads/technical-series/balford-technical-series-15-sensor-housing-wall-thickness.pdf)
16. [K-factor in sheet metal](https://balford.net/downloads/technical-series/balford-technical-series-16-k-factor-sheet-metal.pdf)
17. [How to audit a stamping supplier remotely](https://balford.net/downloads/technical-series/balford-technical-series-17-how-to-audit-a-stamping-supplier-without-visiting.pdf)
18. [In-die tapping versus secondary tapping](https://balford.net/downloads/technical-series/balford-technical-series-18-in-die-tapping-vs-secondary-tapping.pdf)

[Download all eighteen documents in Volume 1](https://balford.net/downloads/technical-series/balford-technical-series-volume-1.pdf).

The longer-form whitepapers are collected at [balford.net/resources/whitepapers](https://balford.net/resources/whitepapers/).

## A practical DFM packet

Send these items with the drawing when the part is being quoted:

1. 2D drawing with revision, datum scheme, critical dimensions and tolerance class.
2. 3D model in STEP, Parasolid or native format, matched to the drawing revision.
3. Material grade and temper, plus the surface or magnetic requirements that drive the choice.
4. Annual volume, order frequency and expected programme life.
5. Functional surfaces: sealing, bearing, sliding, magnetic or cosmetic.
6. The feature that must remain machined after forming, if any.
7. Surface treatment and the corrosion or electrical requirement behind it.
8. Required PPAP level, IMDS expectation and any customer-specific documentation.

For drawn parts, state the measurement position for wall thickness. A single wall figure is not enough when the wall changes from the base to the rim.

## Which process fits?

| Part condition | First route to examine |
|---|---|
| Thin-wall cylindrical housing, sleeve, can or shell | Thinning / ironing deep drawing |
| Function-critical flat part with a high proportion of smooth cut edge | Fine blanking |
| Higher-volume part with several forming, piercing or tapping stations | Progressive die stamping |
| Side holes or features that would otherwise need re-fixturing | Four-slide side piercing or a carefully planned progressive tool |
| A drawn feature that would otherwise require a separate turning operation | Ironing or stamping with extrusion, subject to drawing review |
| Very long thin wall beyond the normal draw envelope | Multi-stage deep drawing with the annealing route confirmed |

The [deep drawing guide](https://balford.net/deep-drawing/) and [DFM checklist](https://balford.net/resources/dfm-analysis/) explain the trade-offs behind this table.

## Search and language editions

[Site search](https://balford.net/search/) covers capabilities, applications, materials, cases, technical resources and company pages.

The public resource network is published in more than 35 languages and regional variants, including German, French, Italian, Spanish, European and Brazilian Portuguese, Chinese, Japanese, Korean, Arabic, Turkish, Vietnamese and Indonesian. The language selector in the site header opens the corresponding edition. English-only surfaces such as the Ask console remain clearly marked.

## Scope and claims

- Balford holds **ISO 9001:2015** certification.
- Balford's controls are aligned with **IATF 16949** requirements; IATF certification is not claimed.
- **ISO 14001 is not claimed.**
- PPAP Level 3 is the standard submission for new programmes and is confirmed against the customer's requirement.
- The 0.001 mm reference applies only to selected critical machined features where the drawing, process, geometry, material and inspection conditions support it.
- Heat treatment, plating, passivation, electropolishing, phosphating, painting, e-coating and several near-net pre-forms are purchased from qualified external partners. The route is stated per part.
- Calculator and PDF values are planning references. Production limits are confirmed from the drawing, material lot, tooling and first-article inspection.

## Send a drawing

Use [rfq.balford.net](https://rfq.balford.net/) for a 2D/3D drawing upload and quotation route. For a definition or process question that does not involve a drawing, start with [Balford Ask](https://balford.net/ask/).
