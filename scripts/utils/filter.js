import {
  selectedIngredientsList, selectedAppliancesList, selectedUtensilsList, ingredientsList, appliancesList, utensilsList
} from "../main.js";
import { displayRecipes } from "../templates/recipes.js";
import {
  filtersOnRecipes
} from "../utils/recipe.js";
import { searchItem } from "../utils/search.js";
import { capitalize } from "./helper.js";

const filtersNavbar = document.getElementById("filtersNavbar");

function filterBySelectableItems(category, selectableItems, selectedItems) {
  // Filtre `selectableItems` pour exclure ceux qui sont déjà sélectionnés.
  const unselectedItems = selectableItems._data.filter(
    (items) => !selectedItems._data.includes(items.toLowerCase())
  );

  switch (category) {
    case "Ingrédients":
      return (ingredientsList._data = unselectedItems);
    case "Appareils":
      return (appliancesList._data = unselectedItems);
    case "Ustensiles":
      return (utensilsList._data = unselectedItems);
  }
}

function displayFilters() {

  displayFilterList("ingredients", ingredientsList);

  // Activation des boutons de filtres
  const buttons = document.querySelectorAll('button[data-btn]');
  buttons.forEach((button) => {
    button.addEventListener('click', handleSelectBtn);
  });
  // Activation de l'écoute de la barre de recherche avancée
  const filterSearch = document.querySelectorAll('.filtersearch');
  filterSearch.forEach((fs) =>
    fs.addEventListener('input', searchItem)
  );

  // Activation du bouton cancel de la barre de recherche avancée
  const cancelSelectBtns = document.querySelectorAll('.clearInputField');
  cancelSelectBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Réinitialiser la valeur de l'input
      const input = e.target.previousElementSibling;
      input.value = '';
      console.log('input', input);
      // Définir la propriété name de l'input pour refléter la catégorie
      const category = e.target.dataset.cat;
      input.name = category;

      // Appeler searchItem en passant un nouvel événement avec l'input comme target
      searchItem({ target: input });
    });
  });

}

function displayFilterList(listName, listItems) {
  const list = document.getElementById(`${listName}Dropdown`).querySelector('[data-list="mainList"]');

  listItems._data.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("selectable");
    li.setAttribute("data-cat", listName);
    li.textContent = capitalize(item);
    li.addEventListener("click", handleSelectBtn);

    list.appendChild(li);
  });

  // repeat for selected items
}

function updateFiltersButton() {
  let recipesList = filtersOnRecipes();
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];
  recipesList.map((recipe) => {
    // liste des ingrédients
    recipe.ingredients.map((ingredient) => {
      ingredientsList.push(ingredient.ingredient.toLowerCase());
    });
    // liste des appareils
    appliancesList.push(recipe.appliance.toLowerCase());
    // liste des ustensiles
    recipe.ustensils.map((ustensil) => {
      utensilsList.push(ustensil.toLowerCase());
    });
  });

  ingredientsList = [...new Set(ingredientsList)];
  ingredientsList._data = ingredientsList;
  filterBySelectableItems(
    "Ingrédients",
    ingredientsList,
    selectedIngredientsList
  );

  appliancesList = [...new Set(appliancesList)];
  appliancesList._data = appliancesList;
  filterBySelectableItems("Appareils", appliancesList, selectedAppliancesList);

  utensilsList = [...new Set(utensilsList)];
  utensilsList._data = utensilsList;
  filterBySelectableItems("Ustensiles", utensilsList, selectedUtensilsList);

  displayFilters();
  displayRecipes(filtersOnRecipes());
}

function handleSelectBtn(e) {
  const infoButton = e.target.closest('button[data-btn]').dataset.btn;
  //const dropdownContent = document.querySelector(`.dropdown-content[data-list="${infoButton}"]`);
  const dropdownContent = document.getElementById(`${infoButton}Dropdown`);

  // Déterminer si la liste déroulante est actuellement ouverte ou fermée
  const isOpen = !dropdownContent.classList.contains('d-none');

  // Trouver les boutons à basculer
  const firstButton = document.querySelector(`button.drop[data-btn="${infoButton}"]`); // Le bouton principal pour ouvrir la liste déroulante

  if (isOpen) {
    // Si ouvert, fermer le dropdown et ajuster les boutons
    dropdownContent.classList.add('d-none'); // Fermer le dropdown
    firstButton.querySelector(".arrow").classList.remove("rotate180");
  } else {
    // Sinon, ouvrir le dropdown et ajuster les boutons
    dropdownContent.classList.remove('d-none'); // Ouvrir le dropdown
    firstButton.querySelector(".arrow").classList.add("rotate180");
  }
}

function handleSelectFilter(e) {
  const category = e.currentTarget.dataset.cat;
  const name = e.currentTarget.innerHTML.toLowerCase();
  switch (category) {
    case 'Ingrédients':
      selectedIngredientsList.add(name.toLowerCase());
      break;
    case 'Appareils':
      selectedAppliancesList.add(name.toLowerCase());
      break;
    case 'Ustensiles':
      selectedUtensilsList.add(name.toLowerCase());
      break;
  }
  updateFiltersButton();
}


export { handleSelectFilter, updateFiltersButton };
