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

function filterAdd(type, name){
	filterChosen.push(type +"-"+ name)
	let nameDisplay = name.replace("-", " ")
	document.getElementById("filter__container").insertAdjacentHTML("beforeend", `<span class="filtre filtre-${type}-${textNormalize(name)}">${nameDisplay}<i class="far fa-times-circle" onclick="deleteFilter('${type}', '${name}')"></i></span>`)
	let listFilterDisplay = document.querySelectorAll(".nom-filtre")
	switch (type){
		case "ingredients":
			document.getElementById("champ-ingredients").value = ""
			recipeList.forEach( function (recipe){
				if(tableauRechercheID.includes("VIDE") === true) {
					if (recipe.classList.contains("ingredients-" + textNormalize(name))) {
						document.getElementById(recipe.id).classList.add("recette-afficher")
					} else {
						document.getElementById(recipe.id).classList.remove("recette-afficher");
						document.getElementById(recipe.id).classList.add("recette-cacher");
					}
				}else {
					tableauRechercheID.forEach(rechercheID => {
						if(recipe.id === rechercheID.toString()) {
							tableauFiltresChoisis.forEach(item => {
								if (document.getElementById(recipe.id).classList.contains(item) && recipe.classList.contains("recette-afficher")) {
									document.getElementById(recipe.id).classList.remove("recette-cacher");
									document.getElementById(recipe.id).classList.add("recette-afficher");
								} else {
									document.getElementById(recipe.id).classList.remove("recette-afficher");
									document.getElementById(recipe.id).classList.add("recette-cacher");
								}
							});
						}
					});
				}
			})
			break;
		case "appliance":
			document.getElementById("champ-appliance").value = ""
			recipeList.forEach( function (recipe){
				if(tableauRechercheID.includes("VIDE") === true) {
					if (recipe.classList.contains("appliance-" + textNormalize(name))) {
						document.getElementById(recipe.id).classList.add("recette-afficher")
					} else {
						document.getElementById(recipe.id).classList.remove("recette-afficher");
						document.getElementById(recipe.id).classList.add("recette-cacher");
					}
				}else {
					tableauRechercheID.forEach(rechercheID => {
						if(recipe.id === rechercheID.toString()) {
							tableauFiltresChoisis.forEach(item => {
								if (document.getElementById(recipe.id).classList.contains(item) && recipe.classList.contains("recette-afficher")) {
									document.getElementById(recipe.id).classList.remove("recette-cacher");
									document.getElementById(recipe.id).classList.add("recette-afficher");
								} else {
									document.getElementById(recipe.id).classList.remove("recette-afficher");
									document.getElementById(recipe.id).classList.add("recette-cacher");
								}
							});
						}
					});
				}
			})
			break;
		case "ustensils":
			document.getElementById("champ-ustensils").value = ""
			recipeList.forEach( function (recipe){
				if(tableauRechercheID.includes("VIDE") === true) {
					if (recipe.classList.contains("ustensils-" + textNormalize(name))) {
						document.getElementById(recipe.id).classList.add("recette-afficher")
					} else {
						document.getElementById(recipe.id).classList.remove("recette-afficher");
						document.getElementById(recipe.id).classList.add("recette-cacher");
					}
				}else {
					tableauRechercheID.forEach(rechercheID => {
						if(recipe.id === rechercheID.toString()) {
							tableauFiltresChoisis.forEach(item => {
								if (document.getElementById(recipe.id).classList.contains(item) && recipe.classList.contains("recette-afficher")) {
									document.getElementById(recipe.id).classList.remove("recette-cacher");
									document.getElementById(recipe.id).classList.add("recette-afficher");
								} else {
									document.getElementById(recipe.id).classList.remove("recette-afficher");
									document.getElementById(recipe.id).classList.add("recette-cacher");
								}
							});
						}
					});
				}
			})
			break;
		default:
			break
	}
	let recipeDisplay = document.querySelectorAll(".recipe__card:not(.recette-cacher)")
	recipeDisplay.forEach(recipe => filterChosenbyId.push(recipe.getAttribute("id")))
	listFilterDisplay.forEach(filter=>{
		filter.classList.remove("nom-filtre-afficher")
		filter.style.display = "none"
	})
	filterChosenbyId.forEach(id =>{
		listFilterDisplay.forEach(filter=>{
			if (document.getElementById(id).classList.contains(filter.getAttribute("id"))){
				document.getElementById(filter.getAttribute("id")).classList.add("nom-filtre-afficher")
				filter.style.display = "block"
			}
		})
	})
	if (recipeDisplay.length === 0){
		document.getElementById("aucun-resultat").classList.add("aucun-resultat-afficher")
	}else{
		document.getElementById("aucun-resultat").classList.remove("aucun-resultat-afficher")
	}
	document.getElementById(type+"-"+name).classList.remove("nom-filtre-afficher");
	document.getElementById(type+"-"+name).classList.add("nom-filtre-cacher-choisis");
	document.getElementById(type+"-"+name).style.display = "none";
	
}


let tableauRechercheID = [];
tableauRechercheID.push("VIDE")