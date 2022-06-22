function filterList(type) {
  let list = [];
  for (let i = 0; i < recipes.length; i++) {
    switch (type) {
      case 'ingredients':
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          list.push(textNormalize(recipes[i].ingredients[j].ingredient));
          list.join('');
        }
        break;
      case 'appliance':
        list.push(textNormalize(recipes[i].appliance));
        list.join('');
        break;
      case 'ustensils':
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
          list.push(textNormalize(recipes[i].ustensils[j]));
          list.join('');
        }
        break;
      default:
        break;
    }
  }
  // Tri du tableau par ordre alphabétique
  list = list.sort((a, b) => a.localeCompare(b));

  // Insert les tableaux dans le DOM en évitant les doublons
  new Set(list).forEach((data) => document
    .getElementById(`filter__list__${type}`)
    .insertAdjacentHTML(
      'beforeend',
      `<li class="nom-filtre" id="${type}-${textNormalize(
        data,
      )}" data-type="${type}" data-nom="${textNormalize(
        data,
      )}" onclick="filterAdd('${type}', '${textNormalize(
        data,
      )}')">${textDisplayNormalize(data)}</li>`,
    ));
}

filterList('ingredients');
filterList('appliance');
filterList('ustensils');

// Ouverture
function filterOpen(type) {
  /* Réinitialise les boutons et filtres */
  const btnFiltres = document.querySelectorAll('.filter__btn');
  for (let i = 0; i < btnFiltres.length; i++) {
    btnFiltres[i].classList.remove('btn-cacher');
    btnFiltres[i].classList.add('btn-afficher');
  }
  const filtres = document.querySelectorAll('.search-filter');
  for (let i = 0; i < filtres.length; i++) {
    filtres[i].classList.remove('cherche-filtre-afficher');
    filtres[i].classList.add('cherche-filtre-cacher');
  }
  const btnType = document.getElementById(`btn-${type}`);
  const chercheType = document.getElementById(`search-${type}`);
  btnType.classList.add('btn-cacher');
  chercheType.classList.add('cherche-filtre-afficher');
}
/* Fermeture */
function filterClose(type) {
  const btnType = document.getElementById(`btn-${type}`);
  const chercheType = document.getElementById(`search-${type}`);
  btnType.classList.remove('btn-cacher');
  btnType.classList.add('btn-afficher');
  chercheType.classList.remove('cherche-filtre-afficher');
  chercheType.classList.add('cherche-filtre-cacher');
}

let ingredientsToDisplay = [];
let ustensilsToDisplay = [];
let applianceToDisplay = [];
const ingredientFiltersChosen = [];
const ustensilsFiltersChosen = [];
const applianceFiltersChosen = [];

function filterDisplayRecipe() {
  for (let i = 0; i < recipeList.length; i++) {
    if (
      ingredientsToDisplay.length === 0
        && applianceToDisplay.length === 0
        && ustensilsToDisplay.length === 0
        && search.length < 3
    ) {
      recipeList[i].classList.remove('recette-cacher');
      recipeList[i].classList.add('recette-afficher');
      recipeList[i].style.display = 'block';
    } else {
      recipeList[i].classList.remove('recette-afficher');
      recipeList[i].classList.add('recette-cacher');
      recipeList[i].style.display = 'none';
    }
  }

  // Si la barre de recherche est vide
  if (search.length < 3) {
    //	S’il y a au moins un filtre d'ingrédient sélectionné
    if (ingredientsToDisplay.length >= 1) {
      for (let i = 0; i < ingredientsToDisplay.length; i++) {
        ingredientsToDisplay[i].classList.remove('recette-cacher');
        ingredientsToDisplay[i].classList.add('recette-afficher');
        ingredientsToDisplay[i].style.display = 'block';
      }
      // S'il y a au moins un filtre ingrédient et un filtre appareil
      if (applianceToDisplay.length >= 1) {
        const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
        for (let i = 0; i < recipeDisplay.length; i++) {
          for (let j = 0; j < applianceFiltersChosen.length; j++) {
            if (recipeDisplay[i].classList.contains(applianceFiltersChosen[j]) === false) {
              recipeDisplay[i].classList.add('recette-cacher');
              recipeDisplay[i].classList.remove('recette-afficher');
              recipeDisplay[i].style.display = 'none';
            }
          }
        }
        // S'il y a au moins un filtre ingrédient appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      } else {
        // S'il y a un filtre ingredient et ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      }
      // S'il n'y a pas de filtre ingrédient sélectionné
    } else {
      // S'il y au moins un filtre appareil
      if (applianceToDisplay.length >= 1) {
        for (let i = 0; i < applianceToDisplay.length; i++) {
          applianceToDisplay[i].classList.remove('recette-cacher');
          applianceToDisplay[i].classList.add('recette-afficher');
          applianceToDisplay[i].style.display = 'block';
        }
        // S'il y au moins un filtre appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      } else {
        // S'il y au moins un filtre ustensile
        for (let i = 0; i < ustensilsToDisplay.length; i++) {
          ustensilsToDisplay[i].classList.remove('recette-cacher');
          ustensilsToDisplay[i].classList.add('recette-afficher');
          ustensilsToDisplay[i].style.display = 'block';
        }
      }
    }
    // S’il y a une valeur supérieure à trois dans la barre de recherche
  } else {
    for (let i = 0; i < recipeList.length; i++) {
      if (
        recipeList[i].querySelector('h3').textContent.toLowerCase().includes(search)
          || recipeList[i].querySelector('ul').textContent.toLowerCase().includes(search)
          || recipeList[i].querySelector('p').textContent.toLowerCase().includes(search)
      ) {
        recipeList[i].classList.remove('recette-cacher');
        recipeList[i].classList.add('recette-afficher');
        recipeList[i].style.display = 'block';
      } else {
        recipeList[i].classList.remove('recette-afficher');
        recipeList[i].classList.add('recette-cacher');
        recipeList[i].style.display = 'none';
      }
    }
    //	S’il y a au moins un filtre d'ingrédient sélectionné
    if (ingredientsToDisplay.length >= 1) {
      const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
      for (let i = 0; i < recipeDisplay.length; i++) {
        for (let j = 0; j < ingredientFiltersChosen.length; j++) {
          if (recipeDisplay[i].classList.contains(ingredientFiltersChosen[j]) === false) {
            recipeDisplay[i].classList.add('recette-cacher');
            recipeDisplay[i].classList.remove('recette-afficher');
            recipeDisplay[i].style.display = 'none';
          }
        }
      }
      // S'il y a au moins un filtre ingrédient et un filtre appareil
      if (applianceToDisplay.length >= 1) {
        const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
        for (let i = 0; i < recipeDisplay.length; i++) {
          for (let j = 0; j < applianceToDisplay.length; j++) {
            if (recipeDisplay[i].classList.contains(applianceFiltersChosen[j]) === false) {
              recipeDisplay[i].classList.add('recette-cacher');
              recipeDisplay[i].classList.remove('recette-afficher');
              recipeDisplay[i].style.display = 'none';
            }
          }
        }
        // S'il y a au moins un filtre ingrédient, appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      } else {
        // S'il y a au moins un filtre ingrédient et un filtre ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      }
      // S'il n'y a pas de filtre ingrédient sélectionné
    } else {
      // S'il y au moins un filtre appareil
      if (applianceToDisplay.length >= 1) {
        const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
        for (let i = 0; i < recipeDisplay.length; i++) {
          for (let j = 0; j < applianceToDisplay.length; j++) {
            if (recipeDisplay[i].classList.contains(applianceFiltersChosen[j]) === false) {
              recipeDisplay[i].classList.add('recette-cacher');
              recipeDisplay[i].classList.remove('recette-afficher');
              recipeDisplay[i].style.display = 'none';
            }
          }
        }
        // S'il y au moins un filtre appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      } else {
        // S'il y a seulement au moins un filtre ustensile
        if (ustensilsToDisplay.length >= 1) {
          const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
          for (let i = 0; i < recipeDisplay.length; i++) {
            for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
              if (recipeDisplay[i].classList.contains(ustensilsFiltersChosen[j]) === false) {
                recipeDisplay[i].classList.add('recette-cacher');
                recipeDisplay[i].classList.remove('recette-afficher');
                recipeDisplay[i].style.display = 'none';
              }
            }
          }
        }
      }
    }
  }

  // S'il n'y a aucune recette à afficher
  const recipeDisplay = document.querySelectorAll(
    '.recipe__card:not(.recette-cacher)',
  );
  if (recipeDisplay.length === 0) {
    document
      .getElementById('aucun-resultat')
      .classList.add('aucun-resultat-afficher');
  } else {
    document
      .getElementById('aucun-resultat')
      .classList.remove('aucun-resultat-afficher');
  }
  filtersMatch();
}

// Ajoute les filtres choisis dans un tableau

function filterAdd(type, name) {
  const nameDisplay = textDisplayNormalize(name);
  document
    .getElementById('filter__container')
    .insertAdjacentHTML(
      'beforeend',
      `<span class="filtre filtre-${type}" id="filtre-${type}-${textNormalize(
        name,
      )}">${nameDisplay}<i class="far fa-times-circle" onclick="deleteFilter('${type}', '${name}')"></i></span>`,
    );

  switch (type) {
    case 'ingredients':
      ingredientFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-ingredients').value = '';
      for (let i = 0; i < recipeList.length; i++) {
        for (let j = 0; j < ingredientFiltersChosen.length; j++) {
          if (recipeList[i].classList.contains(ingredientFiltersChosen[j])) {
            ingredientsToDisplay.push(document.getElementById(recipeList[i].id));
            filterDisplayRecipe();
          }
        }
      }
      break;
    case 'appliance':
      applianceFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-appliance').value = '';
      for (let i = 0; i < recipeList.length; i++) {
        for (let j = 0; j < applianceFiltersChosen.length; j++) {
          if (recipeList[i].classList.contains(applianceFiltersChosen[j])) {
            applianceToDisplay.push(document.getElementById(recipeList[i].id));
            filterDisplayRecipe();
          }
        }
      }
      break;
    case 'ustensils':
      ustensilsFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-ustensils').value = '';
      for (let i = 0; i < recipeList.length; i++) {
        for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
          if (recipeList[i].classList.contains(ustensilsFiltersChosen[j])) {
            ustensilsToDisplay.push(document.getElementById(recipeList[i].id));
            filterDisplayRecipe();
          }
        }
      }
      break;
    default:
      break;
  }
  // Cache le filtre choisis dans la liste des filtres
  document
    .getElementById(`${type}-${name}`)
    .classList.remove('nom-filtre-afficher');
  document
    .getElementById(`${type}-${name}`)
    .classList.add('nom-filtre-cacher-choisis');
  document.getElementById(`${type}-${name}`).style.display = 'none';
}
//	Fonction pour supprimer un filtre sélectionné,
//	régénérer le tableau des filtres choisis et relancer la fonction d'affichage des filtres
function deleteFilter(type, name) {
  switch (type) {
    case 'ingredients':
      ingredientFiltersChosen.splice(
        ingredientFiltersChosen.indexOf(`${type}-${name}`),
        1,
      );
      ingredientsToDisplay = [];
      const IngredientRecipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
      for (let i = 0; i < IngredientRecipeDisplay.length; i++) {
        for (let j = 0; j < ingredientFiltersChosen.length; j++) {
          if (IngredientRecipeDisplay[i].classList.contains(ingredientFiltersChosen[j])) {
            ingredientsToDisplay.push(document.getElementById(IngredientRecipeDisplay[i].id));
          }
        }
      }
      break;
    case 'appliance':
      applianceFiltersChosen.splice(
        applianceFiltersChosen.indexOf(`${type}-${name}`),
        1,
      );
      applianceToDisplay = [];
      const ApplianceRecipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
      for (let i = 0; i < ApplianceRecipeDisplay.length; i++) {
        for (let j = 0; j < applianceFiltersChosen.length; j++) {
          if (ApplianceRecipeDisplay[i].classList.contains(applianceFiltersChosen[j])) {
            applianceToDisplay.push(document.getElementById(ApplianceRecipeDisplay[i].id));
          }
        }
      }
      break;
    case 'ustensils':
      ustensilsFiltersChosen.splice(
        ustensilsFiltersChosen.indexOf(`${type}-${name}`),
        1,
      );
      ustensilsToDisplay = [];
      const UstensilsRecipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
      for (let i = 0; i < UstensilsRecipeDisplay.length; i++) {
        for (let j = 0; j < ustensilsFiltersChosen.length; j++) {
          if (UstensilsRecipeDisplay[i].classList.contains(ustensilsFiltersChosen[j])) {
            ustensilsToDisplay.push(document.getElementById(UstensilsRecipeDisplay[i].id));
          }
        }
      }
      break;
    default:
      break;
  }
  document.getElementById(`filtre-${type}-${name}`).remove();
  document
    .getElementById(`${type}-${name}`)
    .classList.remove('nom-filtre-cacher-choisis');
  document.getElementById(`${type}-${name}`).style.display = 'block';
  filterDisplayRecipe();
}