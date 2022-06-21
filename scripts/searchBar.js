// Récupérés les éléments taper dans la barre de recherche

const input = document.getElementById('searchbar');
let search = '';
function searchBar() {
  input.addEventListener('input', (e) => {
    e.preventDefault();
    search = e.target.value.toLowerCase();
    search = String(search);
    filterDisplayRecipe();
  });
}

searchBar();