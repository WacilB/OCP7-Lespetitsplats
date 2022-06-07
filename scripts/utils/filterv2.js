let ingredientsArray = []
let arrayofFilters = []
let  arrayFilter = []
const ingredientList = document.querySelector('.ingredient_list')
const searchContainer = document.getElementById("search_ingredient__container")
const filterContainer = document.querySelector(".filter__container")

async function displayIngredientFilter(){
    recipeArray.map(
        (recipe)=>{
            recipe.ingredients.map((item)=>{
                if (ingredientsArray.includes(item.ingredient)){
                    console.log("no")
                }else{
                    ingredientsArray.push(item.ingredient)
                }

            })
        }
    )
    for (i = 0 ; i < ingredientsArray.length; i++){
        ingredientList.innerHTML += `
        <li><a class="filtre_ingredient">${ingredientsArray[i]}</a></li>
        `
    }

}
function filtreIngredient(){

    const filtreIngredient = document.querySelectorAll('.filtre_ingredient')
    filtreIngredient.forEach((filtre)=>{
        filtre.addEventListener("click", ()=>{
            let btnFiltre =  document.createElement("span")
            btnFiltre.classList.add("btnFiltre")
            btnFiltre.innerText = filtre.textContent
            filterContainer.appendChild(btnFiltre)
            arrayofFilters.push(filtre.textContent)
            filterRecipe()
            removeFilter()
        })
    })
}

 function filterRecipe(){
    if (arrayofFilters.length === 0){
        displayRecipes(recipeArray)
    }else{
        for (i=0 ;i<recipeArray.length; i++){
            for (j=0 ;j<recipeArray[i].ingredients.length ; j++){
                if (arrayofFilters.includes(recipeArray[i].ingredients[j].ingredient)){
                    arrayFilter.push(recipeArray[i])
                }
            }
        }
        displayRecipes(arrayFilter)
    }
    }
    

function removeFilter(){
    const btnFilter = document.querySelectorAll(".btnFiltre")
    btnFilter.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            console.log(btn.textContent)
            for (i = 0 ; i< arrayofFilters.length; i++){
                if (arrayofFilters[i] === btn.textContent){
                    arrayofFilters.splice(arrayofFilters[i],1)
                    console.log(arrayofFilters[i])
                    filterRecipe()
                    btn.remove()
                    return
                }
            }
        })
    })
}


toggleIngredient.addEventListener("click", ()=>{
    console.log("yes")
    ingredientList.classList.toggle( "ingredient_list__toggle")
})

function testFiltre(filtre){
  
    recipeArray.map((recipe)=> {
        let newArray = recipe.ingredients.filter(function (e){
            
            return e.ingredient == filtre
        })
        console.log(newArray)
    })
}
testFiltre()