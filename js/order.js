
retourOrder = () => {
  if (sessionStorage.getItem("order") != null) {  /**récupératon des éléments */
    let order = JSON.parse(sessionStorage.getItem("order"));
    let firstName = document.getElementById("surName"); /**DOM */
    firstName.innerHTML = order.contact.lastName + " " + order.contact.firstName; /**insertion HTML des éléments de la sessionstorage */
    let numberOfCommand = document.getElementById("numberOfCommand");
    numberOfCommand.innerHTML = "n°: " + order.orderId;
    /**affichage du prix final de la commande (demande du P5)*/
    let totalCommande = document.getElementById("total");
    let price = JSON.parse(sessionStorage.getItem("price"));
    totalCommande.innerHTML = `d'un montant de ` + price +"€";
    console.log(order);
    sessionStorage.removeItem("order");/**remise à zéro de sessionstorage */
  }
  //Redirection vers l'accueil
  else {
    alert("Merci pour vote commande. A bientôt");
    window.location = "./index.html";/**retour en page d'acceuil du site */
  }
};
retourOrder();