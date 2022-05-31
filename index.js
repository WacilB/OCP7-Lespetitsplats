let recipeArray = []
const recipesContainer = document.getElementById("recipes__container")

async function fetchJson(){
   await fetch("data/recipes.json")
        .then((res) => res.json())
        .then((data)=> recipeArray = data.recipes)
    console.log(recipeArray)
}

function displayRecipes(){
    recipesContainer.innerHTML = recipeArray.map(
        (recipe)=>{
                let ingredients = []
                recipe.ingredients.map((item) =>
                ingredients.push(` <li>${item.ingredient} ${item.quantity ? item.quantity : ""} ${item.unit? item.unit : ""  }</li>`)
                )
            return`
     <div class="recipe__card">
            <div class="recipe__picture"></div>
            <div class="recipe__infos">
                <div class="recipe__infos__header">
                 <h3>${recipe.name}</h3>
                 <span>${recipe.time} min</span>
            </div>
            <div class="recipe__infos__description">
                  <ul>
                    ${ingredients.join("")}
                  </ul>
                  <p>${recipe.description}</p>
            </div>
            
            </div>
            
    </div>
    `
        }


    ).join("")

}


fetchJson().then(() => displayRecipes())
// recipe.ingredients.forEach(function (item){
//     ingredients.push(` <li>${item.ingredient} ${item.quantity} ${item.unit}</li>`)
// })