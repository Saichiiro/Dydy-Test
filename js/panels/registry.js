import { inventairePanel } from "./inventaire-panel.js";
import { fichePanel } from "./fiche-panel.js";

export function getProfilePanels() {
  return [inventairePanel, fichePanel];
}

export function getPanelById(panelId) {
  return getProfilePanels().find((panel) => panel.id === panelId) || null;
}

