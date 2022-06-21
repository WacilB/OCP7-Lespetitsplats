/** Gère la barre de recherche dans les filtres * */
const arrayIngredients = [];
const arrayAppareils = [];
const arrayUstensiles = [];
const listeIngredients = document.querySelectorAll("[data-type='ingredients']");
const listeAppareils = document.querySelectorAll("[data-type='appliance']");
const listeUstensils = document.querySelectorAll("[data-type='ustensils']");

listeIngredients.forEach((ingredient) => {
  arrayIngredients.push(ingredient.getAttribute('data-nom'));
});
listeAppareils.forEach((appareil) => {
  arrayAppareils.push(appareil.getAttribute('data-nom'));
});
listeUstensils.forEach((utensils) => {
  arrayUstensiles.push(utensils.getAttribute('data-nom'));
});

function searchFilter(table, type) {
  const typeList = document.querySelectorAll(`[data-type='${type}']`);
  const champFiltre = document.querySelector(`#champ-${type}`);
  champFiltre.addEventListener('input', (e) => {
    const searchValue = textNormalize(e.target.value);
    if (searchValue.length >= 1) {
      const searchResult = table.filter((item) => textNormalize(item).includes(searchValue));

      typeList.forEach((filter) => {
        filter.classList.remove('nom-filtre-afficher');
        filter.classList.add('nom-filtre-cacher');
        filter.style.display = 'none';
        searchResult.forEach((match) => {
          if (filter.getAttribute('data-nom').includes(match)) {
            filter.classList.remove('nom-filtre-cacher');
            filter.classList.add('nom-filtre-afficher');
            filter.style.display = 'block';
          }
        });
      });
    }
  });
}

searchFilter(arrayIngredients, 'ingredients');
searchFilter(arrayAppareils, 'appliance');
searchFilter(arrayUstensiles, 'ustensils');

// Fonction pour afficher les filtres compatibles avec la recherche actuelle
// Dans le cas ou la barre de recherche est active les filtres incompatibles ne sont pas affiché
// Dans le cas ou la recherche s'effectue uniquement par les filtres
// les filtres incompatibles sont grisée

let filtresCompatible = [];
let filtresIncompatible = [];
let filtreCompatibleSearch = [];
function filtersMatch() {
  const arrayDisplay = document.querySelectorAll('.recipe__card:not(.recette-cacher)');
  // Réinitialise toutes les listes de filtre
  listeIngredients.forEach((ingredients) => {
    ingredients.classList.remove('nom-filtre-cacher');
    ingredients.classList.add('nom-filtre-afficher');
    ingredients.style.display = 'block';
  });
  listeAppareils.forEach((appareils) => {
    appareils.classList.remove('nom-filtre-cacher');
    appareils.classList.add('nom-filtre-afficher');
    appareils.style.display = 'block';
  });
  listeUstensils.forEach((ustensils) => {
    ustensils.classList.remove('nom-filtre-cacher');
    ustensils.classList.add('nom-filtre-afficher');
    ustensils.style.display = 'block';
  });

  // Si la barre de recherche est utilisée, cachez les filtres incompatibles
  if (search.length > 3) {
    filtreCompatibleSearch = [];
    // Mets dans un tableau les filtres compatibles avec la recherche
    arrayDisplay.forEach((recipe) => {
      listeIngredients.forEach((ingredients) => {
        if (recipe.classList.contains(ingredients.id)) {
          filtreCompatibleSearch.push(ingredients);
        }
      });
      listeAppareils.forEach((appareils) => {
        if (recipe.classList.contains(appareils.id)) {
          filtreCompatibleSearch.push(appareils);
        }
      });
      listeUstensils.forEach((ustensils) => {
        if (recipe.classList.contains(ustensils.id)) {
          filtreCompatibleSearch.push(ustensils);
        }
      });
    });
    // Cache tous les filtres
    listeIngredients.forEach((filtresIngredient) => {
      filtresIngredient.classList.remove('nom-filtre-afficher');
      filtresIngredient.classList.add('nom-filtre-cacher');
      filtresIngredient.style.display = 'none';
    });
    listeAppareils.forEach((filtresAppareil) => {
      filtresAppareil.classList.remove('nom-filtre-afficher');
      filtresAppareil.classList.add('nom-filtre-cacher');
      filtresAppareil.style.display = 'none';
    });
    listeUstensils.forEach((filtresUstensils) => {
      filtresUstensils.classList.remove('nom-filtre-afficher');
      filtresUstensils.classList.add('nom-filtre-cacher');
      filtresUstensils.style.display = 'none';
    });

    // Affiche seulement les filtres compatibles
    filtreCompatibleSearch.forEach((filtre) => {
      filtre.classList.remove('nom-filtre-cacher');
      filtre.classList.add('nom-filtre-afficher');
      filtre.style.display = 'block';
    });
  } else {
    // Si aucun filtre n'est sélectionné, remettre le style de chaque filtre par défaut
    if (ingredientFiltersChosen.length === 0
	    && applianceFiltersChosen.length === 0
	    && ustensilsFiltersChosen.length === 0) {
      listeIngredients.forEach((filtreIngredient) => {
        filtreIngredient.classList.remove('nom-filtre-incompatible');
        filtreIngredient.classList.remove('nom-filtre-compatible');
      });
      listeAppareils.forEach((filtreAppareil) => {
        filtreAppareil.classList.remove('nom-filtre-incompatible');
        filtreAppareil.classList.remove('nom-filtre-compatible');
      });
      listeUstensils.forEach((filtreUstensils) => {
        filtreUstensils.classList.remove('nom-filtre-incompatible');
        filtreUstensils.classList.remove('nom-filtre-compatible');
      });
    } else {
      filtresIncompatible.forEach((filtre) => {
        filtre.classList.remove('nom-filtre-incompatible');
      });
      filtresCompatible.forEach((filtre) => {
        filtre.classList.remove('nom-filtre-compatible');
      });
      filtresIncompatible = [];
      filtresCompatible = [];

      arrayDisplay.forEach((recipe) => {
        listeIngredients.forEach((ingredientsFiltre) => {
          if (recipe.classList.contains(ingredientsFiltre.id)) {
            filtresCompatible.push(ingredientsFiltre);
          }
        });
        listeUstensils.forEach((ustensilFiltre) => {
          if (recipe.classList.contains(ustensilFiltre.id)) {
            filtresCompatible.push(ustensilFiltre);
          }
        });
        listeAppareils.forEach((appareilsFiltre) => {
          if (recipe.classList.contains(appareilsFiltre.id)) {
            filtresCompatible.push(appareilsFiltre);
          }
        });
      });

      filtresCompatible.forEach((ingredient) => {
        ingredient.classList.add('nom-filtre-compatible');
      });

      document.querySelectorAll('.nom-filtre:not(.nom-filtre-compatible)').forEach((filtre) => {
        filtresIncompatible.push(filtre);
      });
      filtresIncompatible.forEach((ingredient) => {
        ingredient.classList.add('nom-filtre-incompatible');
      });
    }
  }
}