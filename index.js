function init(){
    displayRecipes(recipeArray)
    displayIngredientFilter().then(()=> filtreIngredient())
}
fetchJson().then(() => init())