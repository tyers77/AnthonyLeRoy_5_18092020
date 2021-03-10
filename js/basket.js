
/*declaration du parent*/
const product = document.getElementById("panierProduct");/*recuperation de la balise html*/
const userPanier = JSON.parse(localStorage.getItem("userPanier"));
let i = 0
/**méthode annulation d'un produit */
annulerProduit = (i) =>{
      userPanier.splice(i,1);/**vide 1 élément du tableau */
      localStorage.clear();/**vide le localstorage*/
      localStorage.setItem('userPanier', JSON.stringify(userPanier)); /**mettre à jour le localStorage avec le nouveau panier*/
        /*if(userPanier.length = 0){ /**réinitialisation du localstorage 
           localStorage.setItem('userPanier', JSON.stringify(userPanier));
            localStorage.clear()
         }*/
    /**relancer la création de l'addition*/
    window.location.reload();
};


/**appel du localstorage */

panierCreation = () => {
  
   if(Array.isArray(userPanier)){
       document.getElementById("panierVide").remove()
       /*for (let i = 0; i < userPanier.length; i++) {
        if (Array.isArray(userPanier)) {   si userPanier est un tableau, le tableau userPanier pour chaque élément, si le nom est identique ajouté 1  
            userPanier.forEach((element)=>{
               let i = 0*/
                /*attention ne mettre qu une ligne par article */
                /*for (let i = 0; i < userPanier.length; i++) {
                 /* JSON.parse(localStorage.getItem("userPanier"))*/userPanier.forEach((element)=>{
   /*mise en place des balise HTML*/

   let productContenant = document.createElement("article");
   let productIllustration = document.createElement("figure");
   let productElement = document.createElement("figcation");
   let productPicture = document.createElement("img");
   let productName = document.createElement("h3");
   let productPrice = document.createElement("p");
   let deleteProduct = document.createElement("i");
   let labelQuantity = document.createElement("label");
   let quantity = document.createElement("input");
   /**Ajoutez un quantity **********************************/
   /*Ajout des attributs au balise index HTML */
   productContenant.setAttribute("class", "description");
   productIllustration.setAttribute("class", "figure");
   productPicture.setAttribute("src", element.imageUrl);
   productPicture.setAttribute("alt", "Photo"+ element.name);
   productElement.setAttribute("class", "figcaption");
   productName.setAttribute("class", "name");
   productPrice.setAttribute("class", "price");
   deleteProduct.setAttribute("id", "remove"+i);
   deleteProduct.setAttribute('class', "fas fa-trash-alt annulerProduit"+i);
   labelQuantity.setAttribute("for","labelQuantity");
   quantity.setAttribute("id","quantity");
   quantity.setAttribute("type","number");
   quantity.setAttribute("name","quantity");
   quantity.setAttribute("min", "1");
   quantity.setAttribute("max","10");
   quantity.value = element.quantity;
   /**changement de la quantite d 'un même produit sur un input */
   quantity.addEventListener("change",()=>{
      console.log(element.name);
      console.log(userPanier);
      userPanier.forEach(product =>{
         if(product.name == element.name){
            product.quantity = quantity.value;
            console.log(product.name);
         }
      })
      localStorage.setItem("userPanier",JSON.stringify(userPanier));
      setTotalPrice()

   })

   /* Agencement des éléments index HTML */
   panierProduct.appendChild(productContenant);
   productElement.appendChild(labelQuantity);
   productElement.appendChild(quantity);                 
   productContenant.appendChild(productIllustration);
   productIllustration.appendChild(productPicture);
   productIllustration.appendChild(productElement);
   productElement.appendChild(productName);
   productElement.appendChild(productPrice);
   productElement.appendChild(deleteProduct);

   /* Contenu des balises index HTML */
   productName.innerHTML = element.name;
   productPrice.innerHTML = element.price / 100 + "€";
   labelQuantity.innerHTML = "Quantité";
   /**quantity.innerHTML = element.quantity; recherche de l affichage de l'input quantity */
   
    /** écoute et appel de la méthode de suppression produit  */
    
   deleteProduct.addEventListener("click", this.annulerProduit.bind(i))/**supprime toujours le 1er */
   i++
            });
         }
      }          
panierCreation()   

/**méthode de calcul du montant a payer */
setTotalPrice = () =>{
let total = 0
let totalCommande = document.getElementById("total");
/*JSON.parse(localStorage.getItem("userPanier"))*/userPanier.forEach((element)=>{
   total += element.price *element.quantity / 100;
   totalCommande.textContent = total + "€";

});
}

setTotalPrice()


/**formulaire vérifier les champs utilisateur*/

checkForm = ()=>{
/**les regex pour vérifier les caractères utilisé par l'utilisateur*/
const checkNumber = /[0-9]/;
const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;
/**récuperer les inputs */
let formNom = document.getElementById("formNom").value;
let formPrenom = document.getElementById("formPrenom").value;
let formMail = document.getElementById("formMail").value;
let formAdresse = document.getElementById("formAdresse").value;
let formVille = document.getElementById("formVille").value;
/**tests de chaque champs avec if et else + message d'erreur ou ok */
if(checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == ""){
   alert("Veuillez vérifier votre nom");
}else{
   console.log("nom vérifié");
}
if(checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == ""){
   alert("Veuillez vérifier votre prénom");
}else{
   console.log("prénom vérifié");
}
if(checkMail.test(formMail) == false || formMail == ""){
  alert("Veuillez vérifier votre e-mail");
}else{
   console.log("e-mail vérifié");
}
if(checkSpecialCharacter.test(formAdresse)== true || formAdresse==""){
   alert("Veuillez vérifier votre adresse");
}else{
   console.log("adresse vérifié")
}
if(checkNumber.test(formVille)== true || checkSpecialCharacter.test(formVille)== true || formVille==""){
   alert("Veuillez vérifier votre ville");
}else{
   console.log("ville vérifié")
}
/**crée un objet contact si le formulaire est bien rempli( if form est  no ok alert else contact = {objet}) */
if(alert == ""){
   contact ={
      name: formNom,
      firstName: formPrenom,
      email: formMail, 
      address: formAdresse,
      city: formVille,

   }
}else{
   alert("Veuillez vérifier vos informations")
}
};


/**création du tableau et de l'objet à envoyer à l'API */
let contact;
let products = [];

/**méthode de vérification du panier si le panier est a 0 alert panier vide */
checkPanier = () =>{
   if(userPanier.length < 1 || userPanier == null){
      alert("votre panier est vide");
      return false;
   }else{
      console.log("panier vérifié");
      userPanier.forEach((element)=>{
         products.push(element._id);
      });
      return true;
   }
}

/**envoi à l'API */

