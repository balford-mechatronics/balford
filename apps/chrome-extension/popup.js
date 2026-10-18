import {
  bendAllowance,
  circularBlankingForce,
  deepDrawingForce,
} from "./lib/stamp-calc.js";

const fmt = (value, digits = 2) => {
  if (value === null || !Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", { maximumFractionDigits: digits });
};

const readNumber = (form, name) => Number(form.elements.namedItem(name).value);

function metric(label, value) {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function showError(target, error) {
  target.classList.add("is-error");
  target.innerHTML = `<strong>Check the inputs</strong><p class="warning">${error.message}</p>`;
}

function resetResult(target) {
  target.classList.remove("is-error");
  target.innerHTML = "";
}

function renderDeep() {
  const form = document.querySelector("#deep-form");
  const target = document.querySelector("#deep-result");
  resetResult(target);
  try {
    const result = deepDrawingForce({
      blankDiameterMm: readNumber(form, "blankDiameterMm"),
      productDiameterMm: readNumber(form, "productDiameterMm"),
      thicknessMm: readNumber(form, "thicknessMm"),
      tensileStrengthMpa: readNumber(form, "tensileStrengthMpa"),
    });
    const force =
      result.punchForceKN === null ? "Outside C1 table" : `${fmt(result.punchForceKN, 1)} kN`;
    const warning =
      result.severity === "severe"
        ? "The draw is below the table range. Plan a redraw or a smaller first-draw step."
        : result.severity === "below-table"
          ? "C1 is not defined below m = 0.55. Use a redraw and confirm with DFM."
          : result.severity === "shallow"
            ? "m is above 0.80. Check flange wrinkling and blank-holder control."
            : "";
    target.innerHTML = `
      <span class="primary-label">Estimated punch force</span>
      <strong class="primary-value">${force}</strong>
      <div class="metric-grid">
        ${metric("Drawing ratio m = d/D", fmt(result.drawingRatio, 3))}
        ${metric("C1 coefficient", fmt(result.c1, 2))}
        ${metric("Blank-holder force", result.blankHolderForceKN === null ? "—" : `${fmt(result.blankHolderForceKN, 1)} kN`)}
        ${metric("Die radius guidance", `${fmt(result.dieRadiusMinMm, 1)}–${fmt(result.dieRadiusMaxMm, 1)} mm`)}
      </div>
      ${warning ? `<p class="warning">${warning}</p>` : ""}
    `;
  } catch (error) {
    showError(target, error);
  }
}

function renderBlanking() {
  const form = document.querySelector("#blank-form");
  const target = document.querySelector("#blank-result");
  resetResult(target);
  try {
    const result = circularBlankingForce({
      punchDiameterMm: readNumber(form, "punchDiameterMm"),
      thicknessMm: readNumber(form, "thicknessMm"),
      shearStrengthMpa: readNumber(form, "shearStrengthMpa"),
    });
    target.innerHTML = `
      <span class="primary-label">Estimated cutting force</span>
      <strong class="primary-value">${fmt(result.cuttingForceKN, 1)} kN</strong>
      <div class="metric-grid">
        ${metric("Equivalent ton-force", `${fmt(result.cuttingForceTonf, 1)} tf`)}
        ${metric("Stripping force", `${fmt(result.strippingForceKN, 1)} kN`)}
        ${metric("Shear area", `${fmt(result.shearAreaMm2, 0)} mm²`)}
        ${metric("Punch stress", `${fmt(result.punchStressMpa, 0)} MPa`)}
      </div>
    `;
  } catch (error) {
    showError(target, error);
  }
}

function renderBend() {
  const form = document.querySelector("#bend-form");
  const target = document.querySelector("#bend-result");
  resetResult(target);
  try {
    const result = bendAllowance({
      insideRadiusMm: readNumber(form, "insideRadiusMm"),
      thicknessMm: readNumber(form, "thicknessMm"),
      bendAngleDeg: readNumber(form, "bendAngleDeg"),
      kFactor: readNumber(form, "kFactor"),
      leg1Mm: readNumber(form, "leg1Mm"),
      leg2Mm: readNumber(form, "leg2Mm"),
    });
    target.innerHTML = `
      <span class="primary-label">Estimated flat length</span>
      <strong class="primary-value">${fmt(result.flatLengthMm, 2)} mm</strong>
      <div class="metric-grid">
        ${metric("Bend allowance", `${fmt(result.bendAllowanceMm, 2)} mm`)}
        ${metric("Bend deduction", `${fmt(result.bendDeductionMm, 2)} mm`)}
        ${metric("Outside setback", `${fmt(result.outsideSetbackMm, 2)} mm`)}
        ${metric("Bend angle", `${fmt(readNumber(form, "bendAngleDeg"), 1)}°`)}
      </div>
    `;
  } catch (error) {
    showError(target, error);
  }
}

function activateTab(key) {
  document.querySelectorAll(".tab").forEach((button) => {
    const active = button.dataset.tab === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".panel").forEach((panel) => {
    const active = panel.id === `${key}-panel`;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  });
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

document.querySelector("#deep-form").addEventListener("input", renderDeep);
document.querySelector("#blank-form").addEventListener("input", renderBlanking);
document.querySelector("#bend-form").addEventListener("input", renderBend);
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => event.preventDefault());
});

renderDeep();
renderBlanking();
renderBend();
