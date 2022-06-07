// Normaliser le texte

function textNormalize(string){
	string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	string = string.replace(/[.,!;:?]/g,"");
	string = string.split(" ").join("-");
	string = string.replace("'", "-");
	string = string.toLowerCase();
}


//Récupere les données de chaques recettes

recipes.forEach(recipe => {
	let recipeAppliance = recipe["appliance"]
	let recipeID = recipe["id"];
	let recipeName = recipe["name"]
	let recipeServings = recipe["servings"]
	
	
	
})