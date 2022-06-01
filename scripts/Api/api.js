let recipeArray = []


async function fetchJson(){
    await fetch("data/recipes.json")
        .then((res) => res.json())
        .then((data)=> recipeArray = data.recipes)
    console.log(recipeArray)
}