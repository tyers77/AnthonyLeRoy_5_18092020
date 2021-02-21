/*let param = new URLSearchParams(window.location.search);
let idProduct = param.get("id");*/
/*repère dans l API */
let idProduct =""
const getmyProduct=function(){
    fetch("http://localhost:3000/api/furniture" + "/" + idProduct)/*requète GET by url*/
    .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/ 
    .then(response => productdescription(response))/*ensuite que faire de la réponse...la mettre dans la constante productdescription déclarer juste après*/
    .catch(error => console.error("erreur" + error))/*si il y a une erreur l inscrire dans la console*/
}

getmyProduct()

let panierProduct = document.getElementById("panierProduct");

const productdescription = function(element){ /*fonction qui crée le HTML de la page via JS*/
    console.log(element)

let command = document.createElement("h2");
let recapProduct = document.createElement("p");
let recapContenant = document.createElement("article");
let recapIllustration = document.createElement("figure");
let recapElement = document.createElement("figcation");
let recapPicture = document.createElement("img");
let recapName = document.createElement("h3");
let recapOption = document.createElement("p");
let recapPrice = document.createElement("p");

/**definition des attributs */
command.setAttribute("class","title");
recapProduct.setAttribute("class","recap"),

recapContenant.setAttribute("class", "description");
recapIllustration.setAttribute("class", "figure");
recapPicture.setAttribute("src", element.imageUrl);
recapPicture.setAttribute("alt", element.name);
recapElement.setAttribute("class", "figcaption");
recapName.setAttribute("class", "name");
recapPrice.setAttribute("class", "price");
recapOption.setAttribute("class","varnish");

/*placement des enfants dans les balises*/
panierProduct.appendChild(command);
panierProduct.appendChild(recapProduct);
panierProduct.appendChild(recapContenant);
recapContenant.appendChild(recapIllustration);
recapIllustration.appendChild(recapPicture);
recapIllustration.appendChild(recapElement);
recapElement.appendChild(recapName);
recapElement.appendChild(recapPrice);
recapElement.appendChild(recapOption);

/**insertion texte */
command.innerHTML = "Récapitulatif de votre panier";
recapProduct.innerHTML = "Veuillez vérifier votre commande avant de valider";
recapName.textContent = element.name;
recapPrice.textContent = element.price / 100 + "€";
recapOption.innerHTML = element.varnish;
};


/**création du tableau du local.storage avec transformation en JSON pour la lecture et le passage des produits */
let tableauPanier = []; /**creation du tableau vide */
localStorage.setItem("tableauBasket",JSON.stringify(tableauPanier));/**stockage du tableau JS dans le localstorage sous la forme JSON*/

/**création des objets produitspour le tableauPanier*/
let myproduct = {
    id:"element.id",
    name:"element.name",
    varnish:"element.varnish",
    price:"element.price",
    description:"element.description",
    imageUrl:"element.imageUrl",
}



