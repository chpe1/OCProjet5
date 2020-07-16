if (localStorage.getItem('panier'))
{
    let panier = JSON.parse(localStorage.getItem('panier'));
    let sousTotal=0;
    let products= [];
    panier.forEach(product => {
        sousTotal += listCart(product); // printProduct à faire sur cette page, similaire à la fonction ProduitSeul sur produits.js
        products.push(product.id);
    });
    subTotal(sousTotal);
    commande(products);
}
else{
    panierVide();
}

function listCart(product){
    let sousTotal=0;
    let totalArticle=0;
    let trElt= document.createElement('tr');
    let td2Elt= document.createElement('td');
    td2Elt.innerHTML='<strong>' + product.id + '</strong>';
    let td3Elt=document.createElement('td');
    let formElt = document.createElement('form');
    formElt.classList.add('form-inline');
    let inputElt= document.createElement('input');
    inputElt.classList.add('form-control');
    inputElt.setAttribute('type', 'number');
    inputElt.setAttribute('value', product.quantity);
    inputElt.setAttribute('min', '1');
    inputElt.setAttribute('max', '10');
    inputElt.setAttribute('name', 'quantity');
    let td4Elt = document.createElement('td');
    td4Elt.innerHTML=product.price/100 + ' EUR';
    let td5Elt = document.createElement('td');
    totalArticle = (product.price/100) * product.quantity;
    td5Elt.innerHTML= totalArticle + ' EUR';
    sousTotal += totalArticle;
    
    let tbodyElt=document.getElementById('listePanier');
    tbodyElt.appendChild(trElt);
    trElt.appendChild(td2Elt);
    trElt.appendChild(td3Elt);
    trElt.appendChild(td4Elt);
    trElt.appendChild(td5Elt);
    td3Elt.appendChild(formElt);
    formElt.appendChild(inputElt);

    return sousTotal;

}

function subTotal(sousTotal){
    let fraisDePort=0;
    let tr2Elt= document.createElement('tr');
    let tdAElt= document.createElement('td');
    tdAElt.classList.add('text-right');
    tdAElt.setAttribute('colspan', '3');
    tdAElt.innerHTML = "Sous-Total";
    let td6Elt = document.createElement('td');
    td6Elt.innerHTML = sousTotal + ' EUR';
    tr3Elt= document.createElement('tr');
    td7Elt= document.createElement('td');
    td7Elt.classList.add('text-right');
    td7Elt.setAttribute('colspan', '3');
    td7Elt.innerHTML = "Frais de port";
    let td8Elt = document.createElement('td');
    td8Elt.innerHTML = fraisDePort + ' EUR';
    let tr4Elt= document.createElement('tr');
    let td9Elt= document.createElement('td');
    td9Elt.classList.add('text-right');
    td9Elt.setAttribute('colspan', '3');
    td9Elt.innerHTML = "Total";
    let td10Elt = document.createElement('td');
    td10Elt.innerHTML = sousTotal + fraisDePort + ' EUR';

    tbodyElt=document.getElementById('listePanier');
    tbodyElt.appendChild(tr2Elt);
    tr2Elt.appendChild(tdAElt);
    tr2Elt.appendChild(td6Elt);
    tbodyElt.appendChild(tr3Elt);
    tr3Elt.appendChild(td7Elt);
    tr3Elt.appendChild(td8Elt);
    tbodyElt.appendChild(tr4Elt);
    tr4Elt.appendChild(td9Elt);
    tr4Elt.appendChild(td10Elt);
}

function panierVide(){
    tbodyElt = document.getElementById('listePanier');
    trElt = document.createElement('tr');
    tdElt = document.createElement('td');
    tdElt.setAttribute('colspan', '3');
    tdElt.innerHTML="Votre panier est vide !";
    tdElt.classList.add('text-center');

    tbodyElt.appendChild(trElt);
    trElt.appendChild(tdElt);
}

function commande(products){

    // Récupération des données du formulaire
    let form = document.getElementById('formPanier');
    form.addEventListener('submit', function(event){
        let nom = form.elements.nom.value;
        let prenom = form.elements.prenom.value;
        let email = form.elements.email.value;
        let adresse = form.elements.adresse.value;
        let ville = form.elements.ville.value;

        let contact = {
            lastName : nom,
            firstName : prenom,
            address : adresse,
            city : ville,
            email : email
        };

        let body = {
            contact, 
            products
        };
        console.log(JSON.stringify(body));

        
        let entetes = new Headers();
        entetes.append('Content-Type', 'application/json');
        
        // Paramètres de la fonction fetch pour l'envoi
        let fetchData = { 
            method: 'POST', 
            body: JSON.stringify(body), 
            headers: entetes
        };

        fetch('http://localhost:3000/api/teddies/order', fetchData)
        .then((response) => response.json())
        .then(function() {
            console.log('salut');
        });
    } // fin callback addEventListener
    ); // fin addEventListener
} // fin commande