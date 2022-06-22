/** Gère la barre de recherche dans les filtres * */
const arrayIngredients = [];
const arrayAppareils = [];
const arrayUstensiles = [];
const listeIngredients = document.querySelectorAll("[data-type='ingredients']");
const listeAppareils = document.querySelectorAll("[data-type='appliance']");
const listeUstensils = document.querySelectorAll("[data-type='ustensils']");

for (let i = 0; i < listeIngredients.length; i++) {
  arrayIngredients.push(listeIngredients[i].getAttribute('data-nom'));
}
for (let i = 0; i < listeAppareils.length; i++) {
  arrayAppareils.push(listeAppareils[i].getAttribute('data-nom'));
}
for (let i = 0; i < listeUstensils.length; i++) {
  arrayUstensiles.push(listeUstensils[i].getAttribute('data-nom'));
}
function searchFilter(table, type) {
  const typeList = document.querySelectorAll(`[data-type='${type}']`);
  const champFiltre = document.querySelector(`#champ-${type}`);
  champFiltre.addEventListener('input', (e) => {
    const searchValue = textNormalize(e.target.value);
    if (searchValue.length >= 3) {
      const searchResult = [];
      for (let i = 0; i < table.length; i++) {
        if (textNormalize(table[i]).includes(searchValue)) {
          searchResult.push(table[i]);
        }
      }

      for (let i = 0; i < typeList.length; i++) {
        typeList[i].classList.remove('nom-filtre-afficher');
        typeList[i].classList.add('nom-filtre-cacher');
        typeList[i].style.display = 'none';
        for (let j = 0; j < searchResult.length; j++) {
          if (typeList[i].getAttribute('data-nom').includes(searchResult[j])) {
            typeList[i].classList.remove('nom-filtre-cacher');
            typeList[i].classList.add('nom-filtre-afficher');
            typeList[i].style.display = 'block';
          }
        }
      }
    } else {
      for (let i = 0; i < typeList.length; i++) {
        typeList[i].classList.remove('nom-filtre-cacher');
        typeList[i].classList.add('nom-filtre-afficher');
        typeList[i].style.display = 'block';
      }
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
  for (let i = 0; i < listeIngredients.length; i++) {
    listeIngredients[i].classList.remove('nom-filtre-cacher');
    listeIngredients[i].classList.add('nom-filtre-afficher');
    listeIngredients[i].style.display = 'block';
  }
  for (let i = 0; i < listeAppareils.length; i++) {
    listeAppareils[i].classList.remove('nom-filtre-cacher');
    listeAppareils[i].classList.add('nom-filtre-afficher');
    listeAppareils[i].style.display = 'block';
  }
  for (let i = 0; i < listeUstensils.length; i++) {
    listeUstensils[i].classList.remove('nom-filtre-cacher');
    listeUstensils[i].classList.add('nom-filtre-afficher');
    listeUstensils[i].style.display = 'block';
  }
  // Si la barre de recherche est utilisée, cachez les filtres incompatibles
  if (search.length >= 3) {
    filtreCompatibleSearch = [];
    // Mets dans un tableau les filtres compatibles avec la recherche
    for (let i = 0; i < arrayDisplay.length; i++) {
      for (let j = 0; j < listeIngredients.length; j++) {
        if (arrayDisplay[i].classList.contains(listeIngredients[j].id)) {
          filtreCompatibleSearch.push(listeIngredients[j]);
        }
      }
      for (let j = 0; j < listeAppareils.length; j++) {
        if (arrayDisplay[i].classList.contains(listeAppareils[j].id)) {
          filtreCompatibleSearch.push(listeAppareils[j]);
        }
      }
      for (let j = 0; j < listeUstensils.length; j++) {
        if (arrayDisplay[i].classList.contains(listeUstensils[j].id)) {
          filtreCompatibleSearch.push(listeUstensils[j]);
        }
      }
    }

    // Cache tous les filtres
    for (let i = 0; i < listeIngredients.length; i++) {
      listeIngredients[i].classList.remove('nom-filtre-afficher');
      listeIngredients[i].classList.add('nom-filtre-cacher');
      listeIngredients[i].style.display = 'none';
    }
    for (let i = 0; i < listeAppareils.length; i++) {
      listeAppareils[i].classList.remove('nom-filtre-afficher');
      listeAppareils[i].classList.add('nom-filtre-cacher');
      listeAppareils[i].style.display = 'none';
    }
    for (let i = 0; i < listeUstensils.length; i++) {
      listeUstensils[i].classList.remove('nom-filtre-afficher');
      listeUstensils[i].classList.add('nom-filtre-cacher');
      listeUstensils[i].style.display = 'none';
    }

    // Affiche seulement les filtres compatibles
    for (let i = 0; i < filtreCompatibleSearch.length; i++) {
      filtreCompatibleSearch[i].classList.remove('nom-filtre-cacher');
      filtreCompatibleSearch[i].classList.add('nom-filtre-afficher');
      filtreCompatibleSearch[i].style.display = 'block';
    }
  } else {
    // Si aucun filtre n'est sélectionné, remettre le style de chaque filtre par défaut
    if (ingredientFiltersChosen.length === 0
        && applianceFiltersChosen.length === 0
        && ustensilsFiltersChosen.length === 0) {
      for (let i = 0; i < listeIngredients.length; i++) {
        listeIngredients[i].classList.remove('nom-filtre-incompatible');
        listeIngredients[i].classList.remove('nom-filtre-compatible');
      }
      for (let i = 0; i < listeAppareils.length; i++) {
        listeAppareils[i].classList.remove('nom-filtre-incompatible');
        listeAppareils[i].classList.remove('nom-filtre-compatible');
      }
      for (let i = 0; i < listeUstensils.length; i++) {
        listeUstensils[i].classList.remove('nom-filtre-incompatible');
        listeUstensils[i].classList.remove('nom-filtre-compatible');
      }
    } else {
      for (let i = 0; i < filtresIncompatible.length; i++) {
        filtresIncompatible[i].classList.remove('nom-filtre-incompatible');
      }
      for (let i = 0; i < filtresCompatible.length; i++) {
        filtresCompatible[i].classList.remove('nom-filtre-compatible');
      }
      filtresIncompatible = [];
      filtresCompatible = [];
      for (let i = 0; i < arrayDisplay.length; i++) {
        for (let j = 0; j < listeIngredients.length; j++) {
          if (arrayDisplay[i].classList.contains(listeIngredients[j].id)) {
            filtresCompatible.push(listeIngredients[j]);
          }
        }
        for (let j = 0; j < listeAppareils.length; j++) {
          if (arrayDisplay[i].classList.contains(listeAppareils[j].id)) {
            filtresCompatible.push(listeAppareils[j]);
          }
        }
        for (let j = 0; j < listeUstensils.length; j++) {
          if (arrayDisplay[i].classList.contains(listeUstensils[j].id)) {
            filtresCompatible.push(listeUstensils[j]);
          }
        }
      }
      for (let i = 0; i < filtresCompatible.length; i++) {
        filtresCompatible[i].classList.add('nom-filtre-compatible');
      }
      filtresIncompatible = document.querySelectorAll('.nom-filtre:not(.nom-filtre-compatible)');
      for (let i = 0; i < filtresIncompatible.length; i++) {
        filtresIncompatible[i].classList.add('nom-filtre-incompatible');
      }
    }
  }
}