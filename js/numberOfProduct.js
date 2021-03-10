/**méthode pour l'affichage du nombre de produits dans le panier */
numberOfProducts = () => {
        const productPanier = document.getElementById("productPanier");/**DOM */
        const compteurPanier = JSON.parse(localStorage.getItem("userPanier")); /**verifier si bien un tableau compteurPanier */
        if (!Array.isArray(compteurPanier)) {  /**si compteurPanier n'est pas un tableau avec "!" ecrire "0" */
                productPanier.innerHTML = "0";
        } else {
                productPanier.innerHTML = compteurPanier.length;
         /**sinon indiqué la taille du tableau */
        }
        /*actualisé la page pour le compteur*/
};
numberOfProducts()  /**appel de la méthode */