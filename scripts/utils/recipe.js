import { recipes } from "../../data/recipes.js";
import {
  selectedIngredientsList, selectedAppliancesList, selectedUtensilsList
} from "../main.js";

function filtersOnRecipes() {
  // Initialise la variable avec toutes les recettes disponibles pour le filtrage.
  let filteredRecipes = recipes;

  // Si des ingrédients sont sélectionnés, filtre les recettes en conséquence.
  if (selectedIngredientsList._data.length) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedIngredientsList._data.every((selectedIngredient) =>
        recipe.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase() ===
            selectedIngredient
        )
      )
    );
  }

  // Si un appareil est sélectionné, filtre les recettes qui utilisent cet appareil.
  if (selectedAppliancesList._data.length) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.appliance.toLowerCase() === selectedAppliancesList._data[0]
    );
  }

  // Si des ustensiles sont sélectionnés, filtre les recettes qui contiennent ces ustensiles.
  if (selectedUtensilsList._data.length) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      selectedUtensilsList._data.some((selectedUtensil) =>
        recipe.ustensils
          .map((ustensil) => ustensil.toLowerCase())
          .includes(selectedUtensil)
      )
    );
  }

  // Retourne les recettes filtrées après l'application de tous les filtres.
  return filteredRecipes;
}

export { filtersOnRecipes };