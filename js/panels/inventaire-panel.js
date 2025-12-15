import { el, safeNumber } from "./panel-utils.js";

export const inventairePanel = {
  id: "inventaire",
  title: "Inventaire",
  fullPageHref: "inventaire.html",
  fullPageLabel: "Ouvrir l’inventaire",
  renderPanel(ctx) {
    const wrapper = el("div", "panel-card");
    wrapper.appendChild(el("h3", "panel-card-title", "Résumé"));

    const character = ctx?.character || null;
    const profileData = character?.profile_data || {};
    const inventory = profileData?.inventory || null;

    if (!character) {
      wrapper.appendChild(
        el("p", "panel-muted", "Sélectionnez un personnage pour afficher un résumé d’inventaire.")
      );
      return wrapper;
    }

    const itemCount =
      safeNumber(inventory?.itemCount) ??
      (Array.isArray(inventory?.items) ? inventory.items.length : null);

    const totalQty =
      safeNumber(inventory?.totalQty) ??
      (Array.isArray(inventory?.items)
        ? inventory.items.reduce((sum, entry) => sum + (safeNumber(entry?.qty) || 0), 0)
        : null);

    const summary = el("p", "panel-muted");
    const pieces = [];
    if (typeof itemCount === "number") pieces.push(`${itemCount} type(s)`);
    if (typeof totalQty === "number") pieces.push(`${totalQty} total`);

    summary.textContent =
      pieces.length === 0
        ? "Inventaire pas encore synchronisé (V1). Ouvre la page complète pour gérer."
        : pieces.join(" • ");

    wrapper.appendChild(summary);

    wrapper.appendChild(
      el("p", "panel-muted panel-spacer", "Ce panneau est un aperçu. Les détails restent sur la page inventaire.")
    );

    return wrapper;
  },
};

