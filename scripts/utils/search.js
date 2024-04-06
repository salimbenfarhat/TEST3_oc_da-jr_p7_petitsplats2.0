import {
  ingredientsList, appliancesList, utensilsList
} from "../main.js";
import { displayRecipes } from "../templates/recipes.js";
import { formatFiltersList } from "../templates/dropdown.js";
import { filtersOnRecipes } from "../utils/recipe.js";
import { handleSelectFilter } from "../utils/filter.js";

const searchBar = document.querySelector("#searchbar");
const searchInput = searchBar.querySelector("input");
const searchClose = searchBar.querySelector("svg");

function searchRecipesWithLoops(recipes, searchTerm) {
  let results = []; // Initialise le tableau des résultats
  // Parcourt chaque recette dans le tableau des recettes
  for (let i = 0; i < recipes.length; i++) {
      let recipe = recipes[i]; // Obtient la recette courante
      // Vérifie si le terme de recherche est inclus dans le titre ou la description de la recette
      if (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(recipe); // Ajoute la recette aux résultats si correspondance
          continue; // Passe à la recette suivante
      }

      // Parcourt chaque ingrédient de la recette courante
      for (let j = 0; j < recipe.ingredients.length; j++) {
          // Vérifie si le terme de recherche est inclus dans l'ingrédient
          if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
              results.push(recipe); // Ajoute la recette aux résultats si correspondance
              break; // Sort de la boucle d'ingrédients car correspondance trouvée
          }
      }
  }
  return results; // Retourne le tableau des résultats
}


function searchRecipesWithFunctionalProgramming(recipes, searchTerm) {
  // Utilise la méthode `filter` pour filtrer les recettes
  const results = recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Vérifie le nom de la recette
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) || // Vérifie la description
      recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) // Vérifie chaque ingrédient
  );
  // La méthode `some` retourne true si au moins un ingrédient correspond au terme de recherche
  return results; // Retourne le tableau des résultats filtrés
}

function filterRecipesBySearchbar(searchTerm) {
  let currentFilteredRecipes = filtersOnRecipes();
  currentFilteredRecipes = searchRecipesWithLoops(currentFilteredRecipes, searchTerm);
  //let filteredRecipes = searchRecipesWithFunctionalProgramming(currentFilteredRecipes, searchTerm);
  displayRecipes(currentFilteredRecipes);
}

function mainSearch(e) {
  const searchValue = e.target.value;
  const onClick = () => {
    searchInput.value = "";
    displayRecipes(filtersOnRecipes());
    searchClose.style.display = "none";
  };


  if (searchValue.length > 2) {
    filterRecipesBySearchbar(searchValue);
  } else {
    displayRecipes(filtersOnRecipes());
  }
}

function searchItem(e) {
  const value = e.target.value;
  const category = e.target.name;

  const clearSearch = e.target.nextElementSibling;
  if (value) {
    clearSearch.classList.remove('d-none');
  } else {
    clearSearch.classList.add('d-none');
  }

  const selectableList = document.querySelector(
    `.dropdown-content[data-list="${category}"] [data-list="mainList"]`
  );
  
  let selectableItems = [];
  switch (category) {
    case 'Ingrédients':
      selectableItems = ingredientsList._data;
      break;
    case 'Appareils':
      selectableItems = appliancesList._data;
      break;
    case 'Ustensiles':
      selectableItems = utensilsList._data;
      break;
  }
  selectableItems = selectableItems.filter(
    (item) => item.toLowerCase().indexOf(value.toLowerCase()) > -1
  );
  selectableList.innerHTML = formatFiltersList(selectableItems, category);
  // Activation de la sélection des filtres
  const filters = document.querySelectorAll('.selectable');
  filters.forEach((filter) => {
    filter.addEventListener('click', handleSelectFilter);
  });
}

function initSearchbar() {
  searchBar.addEventListener("input", mainSearch);
}

export { searchItem, initSearchbar };
