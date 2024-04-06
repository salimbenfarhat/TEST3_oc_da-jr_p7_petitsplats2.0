const totalRecipes = document.getElementById("totalRecipes");
const container = document.getElementById("recipes");
const template = document.getElementById("recipeCard");



function displayRecipes(recipes) {
  container.innerHTML = "";
  // Mise à jour du nombre total de recettes dans le DOM
  totalRecipes.innerHTML =
    recipes.length === 1 ? "1 recette" : `${recipes.length} recettes`;
  if (recipes.length === 0) {
    container.innerHTML = `<p id="no-recipes">Aucune recette ne contient <b><u>XXX</u></b>. Vous pouvez chercher <b>tarte aux pommes</b>, <b>poisson</b>, etc.</p>`;
  } else {
    // Mise à jour des recettes affichées sous forme de card
    recipes.forEach((recipe) => {
      // Cloner le template pour chaque nouvelle recette
      const clone = template.content.cloneNode(true);
      // Injecter les informations de la recette dans le template
      clone.querySelector(
        ".card-img-top"
      ).src = `./assets/img/Recettes/Resized/${recipe.image}`;
      clone.querySelector(".card-img-top").alt = recipe.name;
      clone.querySelector(".badge").textContent = `${recipe.time} min`;
      clone.querySelector(".card-title").textContent = recipe.name;
      clone.querySelector(".card-text").textContent = recipe.description;
      const ingredientsListElement = clone.querySelector("#ingredientsList");
      // Parcourir les ingrédients
      recipe.ingredients.forEach((ingredient) => {
        const listItem = document.createElement("li");
        // Afficher les informations de l'ingrédient
        listItem.innerHTML = `${
          ingredient.ingredient
        } <span class="ingredient-quantity">${ingredient.quantity || ""} ${
          ingredient.unit || ""
        }</span>`;
        ingredientsListElement.appendChild(listItem);
      });
      container.appendChild(clone);
    });
  }
}

export { displayRecipes };
