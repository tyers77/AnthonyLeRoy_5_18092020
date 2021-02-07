
/*fonction requète Get by Fetch pour récuperer le tableau des produits c'est le lien avec l'API*/
const getAllProduct = function(){
    fetch("http://localhost:3000/api/furniture")/*requète GET by url*/
    .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/ 
    .then(response => createProductHtml(response))/*ensuite faire de la réponse  ???*/
    .catch(error => console.error("erreur" + error))/*si il y a une erreur l inscrire dans la console*/  
}
getAllProduct()

/*declaration du parent*/
const listContainer = document.getElementById("listContainer");/*recuperation de la balise html*/

/*creation de la constante avec une fonction (produits) forEach signifie pour chaque elements du tableau montre le dans la console*/
const createProductHtml = function (products){
    products.forEach((element) => { 
       
        /*let myP = document.createElement("p");
        myP.innerHTML = `<div class="figcaption">${element.name}</div>`
        listContainer.appendChild(myP)

        let myHtml = document.createElement("article")
        myHtml.innerHTML = `<figure class="description"><img src="${element.imageUrl}" alt="photo ${element.name}"><figcaption>${element.name}<br><span class="price">${element.price /100}$</span>
        <a href="product.html?id=${element._id}">
        <i class="fas fa-bars"></i><span>Description</span></a></figure>`
        listContainer.appendChild(myHtml)*/

    /*mise en place des balise HTML*/

    let productContenant = document.createElement("article");
    let productIllustration = document.createElement("figure");
    let productElement = document.createElement("figcation");
    let productPicture = document.createElement("img");
    let productName = document.createElement("h3");
    let productPrice = document.createElement("p");
    let productLien = document.createElement("a");

    /*Ajout des attributs au balise index HTML */
    productContenant.setAttribute("class", "description");
    productIllustration.setAttribute("class", "figure");
    productPicture.setAttribute("src", element.imageUrl);
    productPicture.setAttribute("alt", "Photo" + element.name);
    productElement.setAttribute("class", "figcaption");
    productName.setAttribute("class", "name");
    productPrice.setAttribute("class", "price");
    productLien.setAttribute("href", "product.html?id=" + element._id);
    productLien.setAttribute("class","lienDetail")

    /* Agencement des éléments index HTML */
    listContainer.appendChild(productContenant);
    productContenant.appendChild(productIllustration);
    productIllustration.appendChild(productPicture);
    productIllustration.appendChild(productElement);
    productElement.appendChild(productName);
    productElement.appendChild(productPrice);
    productElement.appendChild(productLien);

    /* Contenu des balises index HTML */
    productName.innerHTML = element.name;
    productPrice.innerHTML = element.price / 100 + "€";
    productLien.textContent = "Détails";

    });
}
/*tentative d'écoute a voir ????
 const lienId = document.getElementsByClassName("lienDetail");
    lienId.addEventListener("click",function(){
        lienId.innerHTML = "patientez"
    })*/