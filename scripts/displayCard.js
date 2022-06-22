// Normaliser le texte

function textNormalize(string) {
  let value = string;
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  value = value.replace(/[.,!;:?]/g, '');
  value = value.split(' ').join('-');
  value = value.replace("'", '-');
  value = value.toLowerCase();
  return value;
}
// Normaliser le texte à afficher
function textDisplayNormalize(string) {
  let value = string;
  value = value.split('-').join(' ');
  value = value.replace('-', ' ');
  return value;
}

// Fonction de création des cards recettes

function recipeConstructor(
  appliance,
  description,
  id,
  ingredients,
  name,
  serving,
  time,
  ustensils,
) {
  const recipesContainer = document.getElementById('recipes__container');
  const recipeCard = document.createElement('div');
  recipeCard.setAttribute('id', `${id} `);
  recipeCard.setAttribute('data-name', `${name} `);
  recipeCard.classList.add('recipe__card');
  ingredients.forEach((item) => recipeCard.classList.add(textNormalize(`ingredients-${item.ingredient}`)));
  recipeCard.classList.add(textNormalize(`appliance-${appliance}`));
  ustensils.forEach((item) => recipeCard.classList.add(textNormalize(`ustensils-${item}`)));
  const ingredientsArray = [];
  ingredients.map((item) => ingredientsArray.push(` <li>${item.ingredient} ${item.quantity ? item.quantity : ''} ${item.unit ? item.unit : ''}</li>`));
  const template = `
	<div class="recipe__picture"></div>
            <div class="recipe__infos">
                <div class="recipe__infos__header">
                 <h3>${name}</h3>
                 <span>${time} min</span>
            </div>
            <div class="recipe__infos__description">
                  <ul>
         		     ${ingredientsArray.join('')}
                  </ul>
                  <p>${description}</p>
            </div>
            </div>
	`;
  recipeCard.innerHTML = template;
  recipesContainer.appendChild(recipeCard);
}
/**
 *  Récupère les données de chaque recette
 */
recipes.forEach((recipe) => {
  const recipeAppliance = recipe.appliance;
  const recipeDescription = recipe.description;
  const recipeID = recipe.id;
  const recipeIngredients = recipe.ingredients;
  const recipeName = recipe.name;
  const recipeServings = recipe.servings;
  const recipeTime = recipe.time;
  const recipeUstensils = recipe.ustensils;
  return recipeConstructor(
    recipeAppliance,
    recipeDescription,
    recipeID,
    recipeIngredients,
    recipeName,
    recipeServings,
    recipeTime,
    recipeUstensils,
  );
});

const recipeList = document.querySelectorAll('.recipe__card');