let ingredientsArray = []
let  arrayFilter = []
const ingredientList = document.querySelector('.ingredient_list')


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

             recipeArray.map((recipe) =>{
                 if (recipe.ingredients.includes(filtre.textContent)){
                     console.log("yes")
                     arrayFilter.push(recipe)
                 }
                 return arrayFilter
             } )
             console.log(arrayFilter)
         })
     })
 }
//  function test(filtre){
//
//      for (i=0 ;i<recipeArray.length; i++){
//         for (j=0 ;j<recipeArray[i].ingredients.length ; j++){
//             if (recipeArray[i].ingredients[j].ingredient === filtre.textContent){
//                 arrayFilter.push(recipeArray[i])
//             }
//         }
//      }
//     displayRecipes(arrayFilter)
//
// }