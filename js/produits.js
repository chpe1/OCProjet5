var produitsElt = document.getElementById("produits"); // On sélectionne l'élément avec l'id "Produits" soit le UL
ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
    var produits = JSON.parse(reponse); // Transforme la réponse JSON en un tableau de produits
    produits.forEach(function (produit) { // On lit le tableau
        var titreElt = document.createElement("li"); // Création d'un élément li
        titreElt.id= produit._id; // Définition de son identifiant
        titreElt.textContent = produit.name + " - " + produit.price + " EUR - " + produit.description; // Définition de son contenu textuel
        produitsElt.appendChild(titreElt); // Insertion du nouvel élément
    });
});

// Il faut d'abord construire le DOM sans récupération des produits.
// Une fois que ce sera fait, il suffira d'y ajouter les produits en question