/**variable pour la crtion d'un objet pour le panier */
let myProduct;

/**code permettant de recuperer l id de l objet avec "new urlsearchparams"*/
let param = new URLSearchParams(window.location.search);
let idProduct = param.get("id");
/*repère dans l API */

/**Appel de API */
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

    /**création d'un objet produit pour l ajout au localstorage */
    myProduct = {
        id:element._id,
        name:element.name,
        varnish:element.varnish,
        price:element.price,
        quantity: 1,   /** permettra d augmenter la quantité du produit*/ 
        description:element.description,
        imageUrl:element.imageUrl
    }

    /**permet d afficher pour chaque article les options correspondantes dans la partie deroulante du selecteur */

    element.varnish.forEach(element => { /**pour chaque(foreach) element.vernis on crée un "element"(un écrit qui sera défini par le type de vernis) */
        let option = document.createElement("option")/**on crée une variable "option"qui crée une balise option */
        option.innerHTML = element;/* on utilise la variable crée dessus pour afficher  le nom des vernis*/
        descriptionSelect.appendChild(option);/**on place la balise <option> en tant qu enfant de la balise <select> */    
    });
    addPanier() /**méthode d'ajout au panier dans le local storage */
}  

/**Le Panier */
/*ajouté l'objet au tableau */
/**méthode : */
addPanier = () =>{
  	let inputBuy = document.getElementById("panier");    /**DOM */
  	inputBuy.addEventListener("click", function() {      /*évènement: Au clic de l'user pour mettre le produit dans le panier*/
        let userPanier = JSON.parse(localStorage.getItem("userPanier"));  /**recuperation du tableau dans le local storage*/
        if (Array.isArray(userPanier)){    /**si userPanier est un tableau, le tableau userPanier pour chaque élément, si le nom est identique ajouté 1  */
            userPanier.forEach((element)=>{
                if(element.name == myProduct.name){
                    myProduct.quantity ++
                    return /**stop le code la condition est remplie */
                }else {   /**sinon push de l'objet myproduct dans le tableau userPanier */
                    userPanier.push(myProduct)
                    localStorage.setItem("userPanier",JSON.stringify(userPanier)) /**et le stocké en JSON dans le storage */
                }
            })
            console.log("Administration : le panier de l'utilisateur existe dans le localStorage");
                    }else{
                        console.log("Administration : Le panier n'existe pas, il va être créer et l'envoyer dans le localStorage");
        
        /**création du tableau du local.storage avec transformation en JSON pour la lecture et le passage des produits */
        let panierProducts = []; /**creation du tableau vide */
        panierProducts.push(myProduct) /**ajout de l'objet myProduct dans le tableau panierProducts */
        localStorage.setItem("userPanier",JSON.stringify(panierProducts));/**stockage du tableau JS dans le localstorage sous la forme JSON*/
        }
  });
  };
 
  
