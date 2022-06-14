function filterList(type){
	// Création d'un tableau pour lister les filtres selon leurs types
	let list =  [];
	recipes.forEach(item =>{
		switch (type){
			case "ingredients":
				`${item.ingredients.map(data =>
					list.push(textNormalize(data.ingredient))
				).join("")}
				`
				break
			case "appliance":
				list.push(textNormalize(item.appliance))
				break
			case "ustensils":
				`${item.ustensils.map(data =>
					list.push(textNormalize(data))
				).join("")}
				`
				break
			default:
				break
		}
	})
	//Tri du tableau par ordre alphabétique
	list = list.sort((a,b)=> a.localeCompare(b))
	
	new Set(list).forEach((data)=> document.getElementById("filter__list__"+type).insertAdjacentHTML("beforeend", `<li class="nom-filtre" id="${type}-${textNormalize(data)}" data-type="${type}" data-nom="${data}" onclick="filterAdd('${type}', '${textNormalize(data)}')">${data}</li>`))
}
// Affiche les liste de filtres
filterList("ingredients")
filterList("appliance")
filterList("ustensils")

/* Ouverture */
function filterOpen(type) {
	/* Réinitialise les boutons et filtres */
	let btnFiltres = document.querySelectorAll(".filter__btn");
	btnFiltres.forEach(btn => {
		btn.classList.remove("btn-cacher");
		btn.classList.add("btn-afficher");
	});
	let filtres = document.querySelectorAll(".search-filter");
	filtres.forEach(filtre => {
		filtre.classList.remove("cherche-filtre-afficher");
		filtre.classList.add("cherche-filtre-cacher");
	});
	/* Apparence du bouton et filtre en question */
	let btnType = document.getElementById("btn-"+type);
	let chercheType = document.getElementById("search-"+type);
	btnType.classList.add("btn-cacher");
	chercheType.classList.add("cherche-filtre-afficher");
}
/* Fermeture */
function filterClose(type) {
	let btnType = document.getElementById("btn-"+type);
	let chercheType = document.getElementById("search-"+type);
	btnType.classList.remove("btn-cacher");
	btnType.classList.add("btn-afficher");
	chercheType.classList.remove("cherche-filtre-afficher");
	chercheType.classList.add("cherche-filtre-cacher");
}



//Ajoute les filtres choisis dans un tableau

let filterChosen = []
let filterChosenbyId = []
//************************
let ingredientsToDisplay = []
let ustensilsToDisplay = []
let applianceToDisplay = []
let ingredientFiltersChosen =[]
let ustensilsFiltersChosen =[]
let applianceFiltersChosen =[]

function filterAdd(type, name){
	let nameDisplay = name.replace("-", " ")
	document.getElementById("filter__container").insertAdjacentHTML("beforeend", `<span class="filtre filtre-${type}-${textNormalize(name)}">${nameDisplay}<i class="far fa-times-circle" onclick="deleteFilter('${type}', '${name}')"></i></span>`)
	
	
	switch (type){
		case "ingredients":
			ingredientFiltersChosen.push(type+"-"+name)
			document.getElementById("champ-ingredients").value = ""
			recipeList.forEach(recipe=>{
				ingredientFiltersChosen.forEach(classe=>{
					if (recipe.classList.contains(classe)){
						ingredientsToDisplay.push(document.getElementById(recipe.id))
						filterDisplayRecipe()
					}
					
				})
			})
			break
		case "appliance":
			applianceFiltersChosen.push(type+"-"+name)
			document.getElementById("champ-appliance").value = ""
			recipeList.forEach(recipe=>{
				applianceFiltersChosen.forEach(classe =>{
					if (recipe.classList.contains(classe)){
						applianceToDisplay.push(document.getElementById(recipe.id))
						filterDisplayRecipe()
					}
				})
			})
			break
		case "ustensils":
			ustensilsFiltersChosen.push(type+"-"+name)
			document.getElementById("champ-ustensils").value =""
			recipeList.forEach(recipe=>{
				ustensilsFiltersChosen.forEach(classe =>{
					if (recipe.classList.contains(classe)){
						ustensilsToDisplay.push(document.getElementById(recipe.id))
						filterDisplayRecipe()
					}
				})
			})
			break
		default:
			break
	}
	document.getElementById(type+"-"+name).classList.remove("nom-filtre-afficher");
	document.getElementById(type+"-"+name).classList.add("nom-filtre-cacher-choisis");
	document.getElementById(type+"-"+name).style.display = "none";
}

function filterMatch(type){
	switch (type) {
		case "ingredients" :
			ingredientsToDisplay.forEach(recipe =>{
				console.log(recipe)
				listeIngredients.forEach(filter=>{
					if (recipe.classList.contains(filter.id)){
						filter.style.color="green"
					}else{
						filter.style.color ="red"
					}
				})
			})
	}
}

function filterDisplayRecipe(){
	//Initialisation des recettes
	recipeList.forEach(recipe =>{
		if (ingredientsToDisplay.length === 0 && applianceToDisplay.length === 0 && ustensilsToDisplay.length === 0){
			recipe.classList.remove("recette-cacher")
			recipe.classList.add("recette-afficher")
			recipe.style.display = "block"
		}else{
			recipe.classList.add("recette-cacher")
			recipe.classList.remove("recette-afficher")
			recipe.style.display = "none"
		}
	})
	
	//Si il y a au moins un filtre d'ingrédient séléctionné
	if (ingredientsToDisplay.length >= 1){
		ingredientsToDisplay.forEach(recipe =>{
			recipe.classList.remove("recette-cacher")
			recipe.classList.add("recette-afficher")
			recipe.style.display = "block"
		})
		//Si il y a au moins  un filtre ingrédient et un filtre appareil
		if (applianceToDisplay.length >= 1){
			document.querySelectorAll(".recipe__card:not(.recette-cacher)").forEach(recipe=>{
				applianceFiltersChosen.forEach(classe =>{
					if (recipe.classList.contains(classe) === false){
						recipe.classList.add("recette-cacher")
						recipe.classList.remove("recette-afficher")
						recipe.style.display = "none"
					}
				})
			})
			//Si il y a au moins un filtre ingrédient appareil et ustensil
			if (ustensilsToDisplay.length >=1){
				document.querySelectorAll(".recipe__card:not(.recette-cacher)").forEach(recipe=>{
					ustensilsFiltersChosen.forEach(classe =>{
						if (recipe.classList.contains(classe) === false){
							recipe.classList.add("recette-cacher")
							recipe.classList.remove("recette-afficher")
							recipe.style.display = "none"
						}
					})
				})
			}
		}else{
			//Si il y a un filtre ingredient et ustensil
			if (ustensilsToDisplay.length >=1){
				document.querySelectorAll(".recipe__card:not(.recette-cacher)").forEach(recipe=>{
					ustensilsFiltersChosen.forEach(classe =>{
						if (recipe.classList.contains(classe) === false){
							recipe.classList.add("recette-cacher")
							recipe.classList.remove("recette-afficher")
							recipe.style.display = "none"
						}
					})
				})
			}
		}
		//Si il n'y a pas de filtre ingrédient séléctionné
	}else{
		//Si seulement un filtre appareil est séléctionné
		if (applianceToDisplay.length >= 1){
			applianceToDisplay.forEach(recipe =>{
				recipe.classList.remove("recette-cacher")
				recipe.classList.add("recette-afficher")
				recipe.style.display = "block"
			})
			//Si il y au moins un filtre appareil et ustensil
			if (ustensilsToDisplay.length >= 1){
				document.querySelectorAll(".recipe__card:not(.recette-cacher)").forEach(recipe=>{
					ustensilsFiltersChosen.forEach(classe =>{
						if (recipe.classList.contains(classe) === false){
							recipe.classList.add("recette-cacher")
							recipe.classList.remove("recette-afficher")
							recipe.style.display = "none"
						}
					})
				})
			}
		}else{
			//Si il y a seulement au moins un filtre ustensil
			ustensilsToDisplay.forEach(recipe =>{
				recipe.classList.remove("recette-cacher")
				recipe.classList.add("recette-afficher")
				recipe.style.display = "block"
			})
		}
	}
	
	
	
	// Si il n'y a aucune recette à afficher
	let recipeDisplay = document.querySelectorAll(".recipe__card:not(.recette-cacher)")
	if (recipeDisplay.length ===0){
		document.getElementById("aucun-resultat").classList.add("aucun-resultat-afficher")
	}else{
		document.getElementById("aucun-resultat").classList.remove("aucun-resultat-afficher")
	}
	
	
}

function deleteFilter(type, name){
	switch (type){
		case "ingredients":
			ingredientFiltersChosen.splice(ingredientFiltersChosen.indexOf(type+"-"+name) , 1)
			ingredientsToDisplay = []
			recipeList.forEach(recipe=>{
				ingredientFiltersChosen.forEach(classe=>{
					if (recipe.classList.contains(classe)){
						ingredientsToDisplay.push(document.getElementById(recipe.id))
					}
				})
			})
			break
		case "appliance":
			applianceFiltersChosen.splice(applianceFiltersChosen.indexOf(type+"-"+name),1)
			applianceToDisplay = []
			recipeList.forEach(recipe =>{
				applianceFiltersChosen.forEach(classe =>{
					if (recipe.classList.contains(classe)){
						applianceToDisplay.push(document.getElementById(recipe.id))
					}
				})
			})
		case "ustensils":
			ustensilsFiltersChosen.splice(ustensilsFiltersChosen.indexOf(type+"-"+name), 1)
			ustensilsToDisplay =[]
			recipeList.forEach(recipe =>{
				ustensilsFiltersChosen.forEach(classe=>{
					if (recipe.classList.contains(classe)){
						ustensilsToDisplay.push(document.getElementById(recipe.id))
					}
				})
				}
			)

	}
	document.querySelector(".filtre-"+type+"-"+name).remove()
	filterDisplayRecipe()
}