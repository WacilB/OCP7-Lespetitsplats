/** Gère la barre de recherche dans les filtres **/
let arrayIngredients = [];
let arrayAppareils = [];
let arrayUstensiles = [];
let listeIngredients = document.querySelectorAll("[data-type='ingredients']");
let listeAppareils = document.querySelectorAll("[data-type='appliance']");
let listeUstensils = document.querySelectorAll("[data-type='ustensils']");
listeIngredients.forEach(ingredient => {
	arrayIngredients.push(ingredient.getAttribute("data-nom"));
});
listeAppareils.forEach(appareil => {
	arrayAppareils.push(appareil.getAttribute("data-nom"));
});
listeUstensils.forEach(utensils => {
	arrayUstensiles.push(utensils.getAttribute("data-nom"));
});

function searchFilter(table , type ){
	let typeList = document.querySelectorAll("[data-type='"+type+"']")
	let champFiltre = document.querySelector('#champ-' + type)
	champFiltre.addEventListener("input", (e)=>{
		let searchValue = textNormalize(e.target.value)
		
		if (searchValue.length >= 1){
			let searchResult = table.filter((item)=>{
				return textNormalize(item).includes(searchValue)
			})
			if (filterChosen.length === 0 && tableauRechercheID.includes("VIDE") === true){
				typeList.forEach( item=>{
					item.classList.remove("nom-filtre-afficher")
					item.classList.add("nom-filtre-cacher")
					item.style.display= "none"
				})
				searchResult.forEach(filter =>{
					typeList.forEach(item=>{
						if (filter === item.getAttribute("data-nom")){
							item.classList.remove("nom-filtre-cacher")
							item.classList.add("nom-filtre-afficher")
							item.style.display = "block"
						}
					})
				})
		}else{
			typeList.forEach(item =>{
				item.classList.remove("nom-filtre-afficher")
				item.classList.add("nom-filtre-cacher")
				item.style.display ="none"
			})
				searchResult.forEach(filter =>{
					let classe = type+"-"+textNormalize(filter)
					recipeList.forEach(recipe=>{
						if (recipe.classList.contains("recette-afficher") && recipe.classList.contains(classe)){
							document.getElementById(classe).classList.add("nom-filtre-afficher")
							document.getElementById(classe).style.display = "block"
						}
					})
				})
			}
	}else{
			if (filterChosen.length === 0 && tableauRechercheID.includes("VIDE") === true){
				typeList.forEach(item=>{
					item.classList.remove("nom-filtre-cacher")
					item.classList.add("nom-filtre-afficher")
					item.style.display = "block"
				})
			}else{
				recipeList.forEach(recipe=>{
					recipe.classList.forEach(classe=>{
						if (recipe.classList.contains("recette-afficher")){
							if (classe !== "recette"){
								if (document.getElementById(classe) !== null){
									document.getElementById(classe).classList.add("nom-filtre-afficher")
									document.getElementById(classe).style.display =" block"
								}
							}
						}
					})
				})
			}
		}
	})
}

searchFilter(arrayIngredients, "ingredients")
searchFilter(arrayAppareils, "appliance")
searchFilter(arrayUstensiles, "ustensils")