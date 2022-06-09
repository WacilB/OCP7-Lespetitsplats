// Normaliser le texte

function textNormalize(string){
	string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	string = string.replace(/[.,!;:?]/g,"");
	string = string.split(" ").join("-");
	string = string.replace("'", "-");
	string = string.toLowerCase();
	return string
}


//Récupere les données de chaques recettes

recipes.forEach(recipe => {
	let recipeAppliance = recipe["appliance"]
	let recipeDescription = recipe["description"]
	let recipeID = recipe["id"];
	let recipeIngredients = recipe["ingredients"]
	let recipeName = recipe["name"];
	let recipeServings = recipe["servings"];
	let recipeTime = recipe["time"]
	let recipeUstensils = recipe["ustensils"]
	return recipeConstructor( recipeAppliance, recipeDescription, recipeID, recipeIngredients, recipeName , recipeServings , recipeTime , recipeUstensils)
})


//Fonction d'affichage des cards recettes

function recipeConstructor(appliance, description, id, ingredients, name, serving , time, ustensils){
	const recipesContainer = document.getElementById("recipes__container")
	let recipeCard = document.createElement("div")
	recipeCard.setAttribute("id", `${id} `)
	recipeCard.setAttribute("data-name" , `${name} `)
	recipeCard.classList.add("recipe__card")
	ingredients.forEach( item => recipeCard.classList.add(textNormalize(`ingredients-${item.ingredient}`)))
	recipeCard.classList.add(textNormalize(`appliance-${appliance}`))
	ustensils.forEach(item=> recipeCard.classList.add(textNormalize(`ustensils-${item}`)))
	let ingredientsArray = []
	ingredients.map((item) =>
		ingredientsArray.push(` <li>${item.ingredient} ${item.quantity ? item.quantity : ""} ${item.unit? item.unit : ""  }</li>`)
	)
	let template =`
	<div class="recipe__picture"></div>
            <div class="recipe__infos">
                <div class="recipe__infos__header">
                 <h3>${name}</h3>
                 <span>${time} min</span>
            </div>
            <div class="recipe__infos__description">
                  <ul>
         			${ingredientsArray.join("")}
                  </ul>
                  <p>${description}</p>
            </div>
            </div>
	`
	recipeCard.innerHTML = template
	recipesContainer.appendChild(recipeCard)
}
let recipeList = document.querySelectorAll(".recipe__card")