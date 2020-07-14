if (localStorage.getItem('panier'))
{
    let panier = JSON.parse(localStorage.getItem('panier'));
    listCart(panier);
}
else{
    panierVide();
}


function listCart(panier){
    let sousTotal=0;
    let fraisDePort=0;
    let totalArticle=0;
    for (let i=0; i<panier.length; i++)
    {
        trElt= document.createElement('tr');
        td2Elt= document.createElement('td');
        td2Elt.innerHTML='<strong>' + panier[i].id + '</strong>';
        td3Elt=document.createElement('td');
        formElt = document.createElement('form');
        formElt.classList.add('form-inline');
        inputElt= document.createElement('input');
        inputElt.classList.add('form-control');
        inputElt.setAttribute('type', 'number');
        inputElt.setAttribute('value', panier[i].quantity);
        inputElt.setAttribute('min', '1');
        inputElt.setAttribute('max', '10');
        inputElt.setAttribute('name', 'quantity');
        td4Elt = document.createElement('td');
        td4Elt.innerHTML=panier[i].price/100 + ' EUR';
        td5Elt = document.createElement('td');
        totalArticle = (panier[i].price/100) * panier[i].quantity;
        td5Elt.innerHTML= totalArticle + ' EUR';
        sousTotal += totalArticle;
    }
    tr2Elt= document.createElement('tr');
    tdAElt= document.createElement('td');
    tdAElt.classList.add('text-right');
    tdAElt.setAttribute('colspan', '3');
    tdAElt.innerHTML = "Sous-Total";
    td6Elt = document.createElement('td');
    td6Elt.innerHTML = totalArticle + ' EUR';
    tr3Elt= document.createElement('tr');
    td7Elt= document.createElement('td');
    td7Elt.classList.add('text-right');
    td7Elt.setAttribute('colspan', '3');
    td7Elt.innerHTML = "Frais de port";
    td8Elt = document.createElement('td');
    td8Elt.innerHTML = fraisDePort + ' EUR';
    tr4Elt= document.createElement('tr');
    td9Elt= document.createElement('td');
    td9Elt.classList.add('text-right');
    td9Elt.setAttribute('colspan', '3');
    td9Elt.innerHTML = "Total";
    td10Elt = document.createElement('td');
    td10Elt.innerHTML = totalArticle + fraisDePort + ' EUR';

    let tbodyElt=document.getElementById('listePanier');
    tbodyElt.appendChild(trElt);
    trElt.appendChild(td2Elt);
    trElt.appendChild(td3Elt);
    trElt.appendChild(td4Elt);
    trElt.appendChild(td5Elt);
    td3Elt.appendChild(formElt);
    formElt.appendChild(inputElt);
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

function commande(){
    // Récupération des données du formulaire
    let form = document.querySelector("form");
    buttonSubmit.addEventListener('submit', function(event){
        let nom = form.elements.nom.value;
        let prenom = form.elements.prenom.value;
        let email = form.elements.email.value;
        let adresse = form.elements.adresse.value;
        let ville = form.elements.ville.value;
        // contact doit être un objet JSON qui contient les infos du formulaire à envoyer au serveur
        // envoyer aussi le tableau de produits

        ajaxPost("http://localhost:3000/api/teddies/order", contact,
        function (reponse) {
            // Affichage dans la console en cas de succès
            console.log("Commande envoyée au serveur" + reponse);
        }
    );
    });
}


// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
// Le paramètre isJson permet d'indiquer si l'envoi concerne des données JSON
function ajaxPost(url, data, callback, isJson) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    if (isJson) {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader("Content-Type", "application/json");
        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify(data);
    }
    req.send(data);
}