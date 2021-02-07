/*est ce utile ?? de rappeler l API??*/
const getProduct=function(){
    fetch("http://localhost:3000/api/furniture?id=")/*requète GET by url*/
    .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/ 
    .then(response => productdescription(response))/*ensuite faire de la réponse  ???*/
    .catch(error => console.error("erreur" + error))/*si il y a une erreur l inscrire dans la console*/
}

getProduct()

/*squelette HTML*/
const product = document.getElementById("product");

const productdescription = function(products){ /*mettre un evenement ? faire un if si le produit est cliqué ?*/
    products.forEach(element => {
        /* ce n est pas forEach ??? mai s juste pour l'élément selectionner avec _id */
    let descriptionContenant = document.createElement("article");
    let descriptionIllustration = document.createElement("figure");
    let descriptionElement = document.createElement("figcation");
    let descriptionPicture = document.createElement("img");
    let descriptionName = document.createElement("h3");
    let descriptionDetail = document.createElement("p")
    let descriptionPrice = document.createElement("p");
    let descriptionLien = document.createElement("a");
    let descriptionOption = document.getElementById("detailOption");
    let descriptionpanier = document.getElementById("panier");


    descriptionContenant.setAttribute("class", "description");
    descriptionIllustration.setAttribute("class", "figure");
    descriptionPicture.setAttribute("src", element.imageUrl);/*faire apparitre l element choisi*/
    descriptionPicture.setAttribute("alt", element.name);
    descriptionElement.setAttribute("class", "figcaption");
    descriptionName.setAttribute("class", "name");
    descriptionDetail.setAttribute("class", "detail");
    descriptionPrice.setAttribute("class", "price");

    product.appendChild(descriptionContenant);
    descriptionContenant.appendChild(descriptionIllustration);
    descriptionIllustration.appendChild(descriptionPicture);
    descriptionIllustration.appendChild(descriptionElement);
    descriptionElement.appendChild(descriptionName);
    descriptionElement.appendChild(descriptionDetail);
    descriptionElement.appendChild(descriptionPrice);

    descriptionName.textContent = element.name;
    descriptionDetail.textContent = element.description;
    descriptionPrice.textContent = element.price / 100 + "€";
    })
}  


