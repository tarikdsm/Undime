// a11y.js — utilitários de acessibilidade
let liveRegion = null;
export function announce(msg) {
  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "visually-hidden";
    document.body.appendChild(liveRegion);
  }
  liveRegion.textContent = "";
  // força re-anúncio
  window.requestAnimationFrame(() => { liveRegion.textContent = msg; });
}
