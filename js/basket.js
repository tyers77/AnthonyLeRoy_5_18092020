
const product = document.getElementById("panierProduct");/*recuperation de la balise html*/
const userPanier = JSON.parse(localStorage.getItem("userPanier"));

/**création des variables à mettre dans l'objet à POST (un objet contact et un tableau des produits)*/
let contact;
let products = [];
let commande;
let url = "http://localhost:3000/api/furniture/order";

/**appel du localstorage */
panierCreation = () => {
   if (!Array.isArray(userPanier) || userPanier.length > 0) {
      document.getElementById("panierVide").remove();


      userPanier.forEach((element) => {

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

         /*Ajout des attributs au balise index HTML */
         productContenant.setAttribute("class", "description");
         productIllustration.setAttribute("class", "figure");
         productPicture.setAttribute("src", element.imageUrl);
         productPicture.setAttribute("alt", "Photo" + element.name);
         productElement.setAttribute("class", "figcaption");
         productName.setAttribute("class", "name");
         productPrice.setAttribute("class", "price");
         deleteProduct.setAttribute("id", "remove");
         deleteProduct.setAttribute('class', "fas fa-trash-alt annulerProduit");
         labelQuantity.setAttribute("for", "labelQuantity");
         labelQuantity.setAttribute("id", "labelQuantity");
         quantity.setAttribute("id", "quantity");
         quantity.setAttribute("type", "number");
         quantity.setAttribute("name", "quantity");
         quantity.setAttribute("min", "1");
         quantity.setAttribute("max", "10");

         /**indique que la valeur de quantity est la même que celle de l element*/
         quantity.value = element.quantity;
         /**changement de la quantite d 'un même produit sur un input */
         quantity.addEventListener("change", () => {
            console.log(element.name);
            console.log(userPanier);
            userPanier.forEach(product => {
               if (product.name == element.name) {
                  product.quantity = quantity.value;
                  console.log(product.name);
               }
            })
            localStorage.setItem("userPanier", JSON.stringify(userPanier));
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
         labelQuantity.innerHTML = "Quantité : ";

         /**méthode annulation d'un produit */
         /** écoute et appel de la méthode de suppression produit  */
         deleteProduct.addEventListener("click", () => {
            console.log(element.name);
            for (let index = 0; index < userPanier.length; index++) {   /**méthode "for" avec comparaison du name et "splice" pour annulation  */
               if (userPanier[index].name == element.name) {
                  userPanier.splice(index, 1);
                  break;
               }
            }
            console.log(userPanier);
            localStorage.clear();/**vide le localstorage*/
            localStorage.setItem('userPanier', JSON.stringify(userPanier));
            window.location.reload();
         })
      });
   }
}
panierCreation()

/**méthode de calcul du montant a payer */
setTotalPrice = (price) => {
   let total = 0
   let totalCommande = document.getElementById("total");
   userPanier.forEach((element) => {
      total += element.price * element.quantity / 100;
      totalCommande.textContent = total + "€";
      sessionStorage.setItem("price", JSON.stringify(total));/**envoi dans session pour récupération sur la page de confirmation */
   });
}
setTotalPrice()

/**formulaire vérifier les champs utilisateur*/
checkForm = () => {
   /**les regex pour vérifier les caractères utilisé par l'utilisateur*/
   const checkNumber = /[0-9]/;
   const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;
   /**création du message d'erreur */
   let checkMessage = "";

   /**récuperer la valeur des inputs par le DOM */
   let formNom = document.getElementById("formNom").value;
   let formPrenom = document.getElementById("formPrenom").value;
   let formMail = document.getElementById("formMail").value;
   let formAdresse = document.getElementById("formAdresse").value;
   let formVille = document.getElementById("formVille").value;

   /**tests de chaque champs avec if et else + message d'erreur ou ok */
   if (checkNumber.test(formNom) == true || checkSpecialCharacter.test(formNom) == true || formNom == "") {
      checkMessage = "Veuillez vérifier les informations concernant votre nom.";
   } else {
      console.log("nom vérifié");
   }
   if (checkNumber.test(formPrenom) == true || checkSpecialCharacter.test(formPrenom) == true || formPrenom == "") {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom.";
   } else {
      console.log("prénom vérifié");
   }
   if (checkMail.test(formMail) == false || formMail == "") {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre mail.";
   } else {
      console.log("e-mail vérifié");
   }
   if (checkSpecialCharacter.test(formAdresse) == true || formAdresse == "") {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse.";
   } else {
      console.log("adresse vérifié")
   }
   if (checkNumber.test(formVille) == true || checkSpecialCharacter.test(formVille) == true || formVille == "") {
      checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville.";
   } else {
      console.log("ville vérifié")
   }
   /**crée un objet contact si le formulaire est bien rempli( if form est  no ok alert else contact = {objet}) */
   if (checkMessage != "") {
      alert("Veuillez vérifier vos informations");
      return null
   } else {
      contact = { /**respect des noms attribués par le sujet du P5 */
         firstName: formNom,
         lastName: formPrenom,
         address: formAdresse,
         city: formVille,
         email: formMail
      };
      return contact;
   };
};

/**méthode de vérification du panier si le panier est a 0 alert panier vide sinon envoyé l id pour chaque élément*/
checkPanier = () => {
   if (userPanier.length < 1 || userPanier == null) {
      alert("votre panier est vide");
      return false;
   } else {

      console.log("panier vérifié");
   }
   return true;
};

/**méthode 1 de post de la commande avec un session storage de contact et du produit et chargement page order.html 
const envoiFormulaire = (order) => {
   let request = new XMLHttpRequest();
   request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
         sessionStorage.setItem("order", this.responseText);/**sauvegarde pour affichage des infos sur la page confirmation de commande 
         window.location = "../html/order.html";/**changement de page  
      } else {
      }
   };
   request.open("POST", url);
   request.setRequestHeader("Content-Type", "application/json");
   request.send(order);
};*/

/**méthode 2 avec "fetch" pour le POST à l'API avec un session storage de contact et du produit et chargement page order.html*/
const envoiFormulaire = function (order) {
   fetch(url, {
      method: "post",
      headers: {
         "Content-Type": "application/json"
      },
      body: order
   })
      .then(response => response.json())/*ensuite la réponse est une reponse json faire "réponse est une réponse json"*/
      .then(data => {
         console.log(data)
         sessionStorage.setItem("order", JSON.stringify(data));/**a completé ??? OK */
         window.location = "../html/order.html";/**changement de page OK  */
      })
      .catch(error => console.error("erreur" + error))/*si il y a une erreur l inscrire dans la console*/
}

/**écoute sur le boutton de validation : la méthode */
confirmCommande = () => {
   let commander = document.getElementById("envoiPost");
   commander.addEventListener("click", (event) => {
      event.preventDefault()
      if (checkPanier() && checkForm() != null) {/**Si le panier n'est pas vide et que le formulaire est valide => Construction de l'objet commande(contact + produit) a envoyé à l'API*/
         console.log("L'envoi peut etre fait");
         userPanier.forEach((element) => {
            console.log(element);
            products.push(element.id);
         });
         /**objet commande */
         commande = {
            contact: checkForm(),
            products: products,
         };
         console.log("Ce tableau sera envoyé à l'API : " + products);
         let sendForm = JSON.stringify(commande);
         console.log(commande);
         envoiFormulaire(sendForm);
         /**Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage*/
         contact = {};
         products = [];
         localStorage.clear();
      } else {
         console.log("ERROR");
      }
   });
};
confirmCommande();


