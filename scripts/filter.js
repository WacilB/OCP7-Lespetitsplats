function filterList(type) {
  // Création d'un tableau pour lister les filtres selon leurs types
  let list = [];
  recipes.forEach((item) => {
    switch (type) {
      case 'ingredients':
        item.ingredients.map((data) => list.push(textNormalize(data.ingredient))).join('');
        break;
      case 'appliance':
        list.push(textNormalize(item.appliance));
        break;
      case 'ustensils':
        item.ustensils.map((data) => list.push(textNormalize(data))).join('');
        break;
      default:
        break;
    }
  });
  // Tri du tableau par ordre alphabétique
  list = list.sort((a, b) => a.localeCompare(b));

  // Insert les tableau dans le DOM en évitant les doublons
  new Set(list).forEach((data) => document.getElementById(`filter__list__${type}`).insertAdjacentHTML('beforeend', `<li class="nom-filtre" id="${type}-${textNormalize(data)}" data-type="${type}" data-nom="${textNormalize(data)}" onclick="filterAdd('${type}', '${textNormalize(data)}')">${textDisplayNormalize(data)}</li>`));
}
// Affiche les liste de filtres
filterList('ingredients');
filterList('appliance');
filterList('ustensils');

/* Ouverture */
function filterOpen(type) {
  /* Réinitialise les boutons et filtres */
  const btnFiltres = document.querySelectorAll('.filter__btn');
  btnFiltres.forEach((btn) => {
    btn.classList.remove('btn-cacher');
    btn.classList.add('btn-afficher');
  });
  const filtres = document.querySelectorAll('.search-filter');
  filtres.forEach((filtre) => {
    filtre.classList.remove('cherche-filtre-afficher');
    filtre.classList.add('cherche-filtre-cacher');
  });
  /* Apparence du bouton et filtre en question */
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

//* ***********************
let ingredientsToDisplay = [];
let ustensilsToDisplay = [];
let applianceToDisplay = [];
const ingredientFiltersChosen = [];
const ustensilsFiltersChosen = [];
const applianceFiltersChosen = [];

// Fonction d'affichage des recettes selon les filtres et la barre de recherche
function filterDisplayRecipe() {
  // Initialisation des recettes
  // Affichage de toutes les recettes si la barre de recherche est vide
  // et si aucun filtre n'est sélectionné
  recipeList.forEach((recipe) => {
    if (ingredientsToDisplay.length === 0
        && applianceToDisplay.length === 0
        && ustensilsToDisplay.length === 0
        && search.length < 3) {
      recipe.classList.remove('recette-cacher');
      recipe.classList.add('recette-afficher');
      recipe.style.display = 'block';
    } else {
      recipe.classList.add('recette-cacher');
      recipe.classList.remove('recette-afficher');
      recipe.style.display = 'none';
    }
  });

  // Si la barre de recherche est vide
  if (search.length < 3) {
    //	S’il y a au moins un filtre d'ingrédient sélectionné
    if (ingredientsToDisplay.length >= 1) {
      ingredientsToDisplay.forEach((recipe) => {
        recipe.classList.remove('recette-cacher');
        recipe.classList.add('recette-afficher');
        recipe.style.display = 'block';
      });
      // S'il y a au moins un filtre ingrédient et un filtre appareil
      if (applianceToDisplay.length >= 1) {
        document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
          applianceFiltersChosen.forEach((classe) => {
            if (recipe.classList.contains(classe) === false) {
              recipe.classList.add('recette-cacher');
              recipe.classList.remove('recette-afficher');
              recipe.style.display = 'none';
            }
          });
        });
        // S'il y a au moins un filtre ingrédient appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      } else {
        // S'il y a un filtre ingredient et ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      }
      // S'il n'y a pas de filtre ingrédient sélectionné
    } else {
      // S'il y au moins un filtre appareil
      if (applianceToDisplay.length >= 1) {
        applianceToDisplay.forEach((recipe) => {
          recipe.classList.remove('recette-cacher');
          recipe.classList.add('recette-afficher');
          recipe.style.display = 'block';
        });
        // S'il y au moins un filtre appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      } else {
        // S'il y au moins un filtre ustensile
        ustensilsToDisplay.forEach((recipe) => {
          recipe.classList.remove('recette-cacher');
          recipe.classList.add('recette-afficher');
          recipe.style.display = 'block';
        });
      }
    }
    // S’il y a une valeur supérieure à trois dans la barre de recherche
  } else {
    recipeList.forEach((recipe) => {
      if (recipe.querySelector('h3').textContent.toLowerCase().includes(search)
          || recipe.querySelector('ul').textContent.toLowerCase().includes(search)
          || recipe.querySelector('p').textContent.toLowerCase().includes(search)) {
        recipe.classList.remove('recette-cacher');
        recipe.classList.add('recette-afficher');
        recipe.style.display = 'block';
      } else {
        recipe.classList.remove('recette-afficher');
        recipe.classList.add('recette-cacher');
        recipe.style.display = 'none';
      }
    });
    //	S’il y a au moins un filtre d'ingrédient sélectionné
    if (ingredientsToDisplay.length >= 1) {
      document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
        ingredientFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe) === false) {
            recipe.classList.add('recette-cacher');
            recipe.classList.remove('recette-afficher');
            recipe.style.display = 'none';
          }
        });
      });
      // S'il y a au moins un filtre ingrédient et un filtre appareil
      if (applianceToDisplay.length >= 1) {
        document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
          applianceFiltersChosen.forEach((classe) => {
            if (recipe.classList.contains(classe) === false) {
              recipe.classList.add('recette-cacher');
              recipe.classList.remove('recette-afficher');
              recipe.style.display = 'none';
            }
          });
        });
        // S'il y a au moins un filtre ingrédient, appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      } else {
        // S'il y a au moins un filtre ingrédient et un filtre ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      }
      // S'il n'y a pas de filtre ingrédient sélectionné
    } else {
      // S'il y au moins un filtre appareil
      if (applianceToDisplay.length >= 1) {
        document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
          applianceFiltersChosen.forEach((classe) => {
            if (recipe.classList.contains(classe) === false) {
              recipe.classList.add('recette-cacher');
              recipe.classList.remove('recette-afficher');
              recipe.style.display = 'none';
            }
          });
        });
        // S'il y au moins un filtre appareil et ustensile
        if (ustensilsToDisplay.length >= 1) {
          document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
            ustensilsFiltersChosen.forEach((classe) => {
              if (recipe.classList.contains(classe) === false) {
                recipe.classList.add('recette-cacher');
                recipe.classList.remove('recette-afficher');
                recipe.style.display = 'none';
              }
            });
          });
        }
      } else {
        // S'il y a seulement au moins un filtre ustensile
        document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
          ustensilsFiltersChosen.forEach((classe) => {
            if (recipe.classList.contains(classe) === false) {
              recipe.classList.add('recette-cacher');
              recipe.classList.remove('recette-afficher');
              recipe.style.display = 'none';
            }
          });
        });
      }
    }
  }

  // S'il n'y a aucune recette à afficher
  const recipeDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
  if (recipeDisplay.length === 0) {
    document.getElementById('aucun-resultat').classList.add('aucun-resultat-afficher');
  } else {
    document.getElementById('aucun-resultat').classList.remove('aucun-resultat-afficher');
  }
  filtersMatch();
}
// Ajoute les filtres choisis dans un tableau

function filterAdd(type, name) {
  const nameDisplay = textDisplayNormalize(name);
  document.getElementById('filter__container').insertAdjacentHTML('beforeend', `<span class="filtre filtre-${type}" id="filtre-${type}-${textNormalize(name)}">${nameDisplay}<i class="far fa-times-circle" onclick="deleteFilter('${type}', '${name}')"></i></span>`);

  switch (type) {
    case 'ingredients':
      ingredientFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-ingredients').value = '';
      recipeList.forEach((recipe) => {
        ingredientFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            ingredientsToDisplay.push(document.getElementById(recipe.id));
            filterDisplayRecipe();
          }
        });
      });
      break;
    case 'appliance':
      applianceFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-appliance').value = '';
      recipeList.forEach((recipe) => {
        applianceFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            applianceToDisplay.push(document.getElementById(recipe.id));
            filterDisplayRecipe();
          }
        });
      });
      break;
    case 'ustensils':
      ustensilsFiltersChosen.push(`${type}-${name}`);
      document.getElementById('champ-ustensils').value = '';
      recipeList.forEach((recipe) => {
        ustensilsFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            ustensilsToDisplay.push(document.getElementById(recipe.id));
            filterDisplayRecipe();
          }
        });
      });
      break;
    default:
      break;
  }

  // Cache le filtre choisis dans la liste des filtres
  document.getElementById(`${type}-${name}`).classList.remove('nom-filtre-afficher');
  document.getElementById(`${type}-${name}`).classList.add('nom-filtre-cacher-choisis');
  document.getElementById(`${type}-${name}`).style.display = 'none';
}
//	Fonction pour supprimer un filtre sélectionné,
//	régénérer le tableau des filtres choisis et relancer la fonction d'affichage des filtres
function deleteFilter(type, name) {
  switch (type) {
    case 'ingredients':
      ingredientFiltersChosen.splice(ingredientFiltersChosen.indexOf(`${type}-${name}`), 1);
      ingredientsToDisplay = [];
      document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
        ingredientFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            ingredientsToDisplay.push(document.getElementById(recipe.id));
          }
        });
      });
      break;
    case 'appliance':
      applianceFiltersChosen.splice(applianceFiltersChosen.indexOf(`${type}-${name}`), 1);
      applianceToDisplay = [];
      document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
        applianceFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            applianceToDisplay.push(document.getElementById(recipe.id));
          }
        });
      });
      break;
    case 'ustensils':
      ustensilsFiltersChosen.splice(ustensilsFiltersChosen.indexOf(`${type}-${name}`), 1);
      ustensilsToDisplay = [];
      document.querySelectorAll('.recipe__card:not(.recette-cacher)').forEach((recipe) => {
        ustensilsFiltersChosen.forEach((classe) => {
          if (recipe.classList.contains(classe)) {
            ustensilsToDisplay.push(document.getElementById(recipe.id));
          }
        });
      });
      break;
    default:
      break;
  }
  document.getElementById(`filtre-${type}-${name}`).remove();
  document.getElementById(`${type}-${name}`).classList.remove('nom-filtre-cacher-choisis');
  document.getElementById(`${type}-${name}`).style.display = 'block';
  filterDisplayRecipe();
  filtersMatch();
}