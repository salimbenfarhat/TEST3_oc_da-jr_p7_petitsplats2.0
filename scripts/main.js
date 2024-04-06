import { recipes } from "../data/recipes.js";
import { Array as ItemArray } from "../scripts/models/Array.js";
import { initSearchbar } from "./utils/search.js";
import { updateFiltersButton } from "./utils/filter.js";

// Déclaration de variables globales pour initialiser chacune des listes d'éléments(ingredients, appareils, ustensiles) uniques et ceux sélectionnés.
let selectedIngredientsList = new ItemArray(),
  ingredientsList = new ItemArray(),
  selectedAppliancesList = new ItemArray(),
  appliancesList = new ItemArray(),
  selectedUtensilsList = new ItemArray(),
  utensilsList = new ItemArray();

function init() {
  // Fonction de mise à jour des boutons de filtre dans la barre de navigation avec les données récupérées du fichier des recettes.
  updateFiltersButton(recipes);
  // Foncton qui initialise la barre de recherche et permet à l'utilisateur de rechercher des recettes spécifiques.
  initSearchbar();
}

// Appel de la fonction d'initialisation après chargement du DOM
window.addEventListener("DOMContentLoaded", init);

export { selectedIngredientsList, selectedAppliancesList, selectedUtensilsList, ingredientsList, appliancesList, utensilsList };