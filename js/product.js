/**code permettant de recuperer l id de l objet avec "new urlsearchparams"*/

let param = new URLSearchParams(window.location.search);
let idProduct = param.get("id");
/*repère dans l API */

const getProduct=function(){
    fetch("http://localhost:3000/api/furniture" + "/" + idProduct)/*requète GET by url*/
    .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/ 
    .then(response => productdescription(response))/*ensuite que faire de la réponse...la mettre dans la constante productdescription déclarer juste après*/
    .catch(error => console.error("erreur" + error))/*si il y a une erreur l inscrire dans la console*/
}

getProduct()

/*utilisation du DOM pour récuperer id de la page HTML*/
const product = document.getElementById("product");

const productdescription = function(element){ /*fonction qui crée le HTML de la page via JS*/
    console.log(element)
    
    /**création des balises */

    let descriptionContenant = document.createElement("article");
    let descriptionIllustration = document.createElement("figure");
    let descriptionElement = document.createElement("figcation");
    let descriptionPicture = document.createElement("img");
    let descriptionName = document.createElement("h3");
    let descriptionDetail = document.createElement("p")
    let descriptionPrice = document.createElement("p");
    let descriptionLien = document.createElement("a");
    let descriptionSelect = document.createElement("select");
    let descriptionOption = document.createElement("option");
    let descriptionPanier = document.createElement("button");

    /**création des attributs (class, id, src etc...) */

    descriptionContenant.setAttribute("class", "description");
    descriptionIllustration.setAttribute("class", "figure");
    descriptionPicture.setAttribute("src", element.imageUrl);
    descriptionPicture.setAttribute("alt", element.name);
    descriptionElement.setAttribute("class", "figcaption");
    descriptionSelect.setAttribute("id","choice");
    descriptionSelect.setAttribute("name","option");
    /*descriptionSelect.setAttribute("required");
    /*descriptionOption.setAttribute("disabled value","", "selected");*/ 
    descriptionName.setAttribute("class", "name");
    descriptionDetail.setAttribute("class", "detail");
    descriptionPrice.setAttribute("class", "price");
    descriptionPanier.setAttribute("id","panier");

    /**placement des balises enfants dans les balises parents (<figure> enfant de <article>)*/

    product.appendChild(descriptionContenant);
    descriptionContenant.appendChild(descriptionIllustration);
    descriptionIllustration.appendChild(descriptionPicture);
    descriptionIllustration.appendChild(descriptionElement);
    descriptionIllustration.appendChild(descriptionSelect);
    descriptionSelect.appendChild(descriptionOption);
    descriptionElement.appendChild(descriptionName);
    descriptionElement.appendChild(descriptionDetail);
    descriptionElement.appendChild(descriptionPrice);
    product.appendChild(descriptionPanier);

    /**insertion du texte dans les balises */

    descriptionName.textContent = element.name;
    descriptionDetail.textContent = element.description;
    descriptionPrice.textContent = element.price / 100 + "€";
    descriptionPanier.innerHTML = "Ajouter au panier";
    descriptionOption.innerHTML = "Vernis"
    
    /**permet d afficher pour chaque article les options correspondantes dans la partie deroulante du selecteur */

    element.varnish.forEach(element => { /**pour chaque(foreach) element.vernis on crée un "element"(un écrit qui sera défini par le type de vernis) */
        let option = document.createElement("option")/**on crée une variable "option"qui crée une balise option */
        option.innerHTML = element;/* on utilise la variable crée dessus pour afficher  le nom des vernis*/
        descriptionSelect.appendChild(option);/**on place la balise <option> en tant qu enfant de la balise <select> */
        
    });
}  
/**Le Panier */
/*local.storage = ajout produit dans tableau */
/**pour afficher le nombre de produit dans le panier */

/**création du tableau du local.storage avec transformation en JSON pour la lecture et le passage des produits */
let panierProducts = []; /**creation du tableau vide */
localStorage.setItem("tableauPanier",JSON.stringify(panierProducts));/**stockage du tableau JS dans le localstorage sous la forme JSON*/
let userPanier = JSON.parse(localStorage.getItem("tableauPanier"));

/**création des objets produits pour le tableauPanier*/
let myproduct = {
    id:"element.id",
    name:"element.name",
    varnish:"element.varnish",
    price:"element.price",
    quantity:"element.quantity",/** permettra d augmenter la quantité d'un meme produit */
    description:"element.description",
    imageUrl:"element.imageUrl",
}
/*localStorage.getItem(panier);
if(panier == null ,)*/


/*ajouté l objet au tableau 
addPanier = () =>{
  	//Au clic de l'user pour mettre le produit dans le panier
  	let inputBuy = document.getElementById("panier");
  	inputBuy.addEventListener("click", async function() {
  		const produits = await getProduct();
  	//Récupération du panier dans le localStorage et ajout du produit dans le panier avant revoit dans le localStorage
  	userPanier.push(produits);
  	localStorage.setItem("tableauPanier", JSON.stringify(userPanier));
  	console.log("Administration : le produit a été ajouté au panier");
  	alert("Vous avez ajouté ce produit dans votre panier")
  });
  };*/

