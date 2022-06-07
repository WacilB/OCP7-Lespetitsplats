let ingredientsArray = []
let  arrayFilter = []
const ingredientList = document.querySelector('.ingredient_list')
const searchContainer = document.getElementById("search_ingredient__container")

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
    console.log(ingredientsArray)


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
             addFilter(filtre)
        let btnFiltre =  document.createElement("span")
            btnFiltre.classList.add("btnFiltre")
             btnFiltre.innerText = filtre.textContent
             searchContainer.appendChild(btnFiltre)
             eventBtnFilter()
         })
     })
 }
  function addFilter(filtre){

      for (i=0 ;i<recipeArray.length; i++){
         for (j=0 ;j<recipeArray[i].ingredients.length ; j++){
             if (recipeArray[i].ingredients[j].ingredient === filtre.textContent){
                 arrayFilter.push(recipeArray[i])
             }
         }
      }

     displayRecipes(arrayFilter)
 }

 function removeFilter(filtre){
     console.log(arrayFilter)
    for (i=0; i< arrayFilter.length; i++){
        for (j=0 ; j<arrayFilter[i].length ; j++){
            console.log(arrayFilter[i].ingredients[j].ingredient)
            if (arrayFilter[i].ingredients[j].ingredient === filtre.textContent){
                arrayFilter.splice(arrayFilter[i],1)
            }
        }
    }
     console.log(arrayFilter)
    displayRecipes(arrayFilter)
 }

 function eventBtnFilter(){
    const btnFiltres = document.querySelectorAll(".btnFiltre")
            btnFiltres.forEach((btnFiltre) =>{
                btnFiltre.addEventListener("click", (e)=>{
                    console.log(btnFiltre.textContent)
                    removeFilter(btnFiltre)
                    btnFiltre.remove()
                })
            })
 }