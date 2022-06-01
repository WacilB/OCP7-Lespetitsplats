
const searchBar = document.getElementById("searchbar")
const form = document.querySelector('form')

searchBar.addEventListener("input" ,(e)=>{
    searchBarFilter =[]
    recipeArray.map((recipe) =>{
        if (recipe.name.toUpperCase().includes(e.target.value.toUpperCase())){
            searchBarFilter.push(recipe)
        }
    })
    displayRecipes(searchBarFilter)
})
form.addEventListener("submit" , (e)=>{
    e.preventDefault()
})