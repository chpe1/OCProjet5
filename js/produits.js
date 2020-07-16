function listeProduits(data){ // Reconstruction du DOM de la partie CARD
  let produitsElt = document.getElementById('produits');

  for (let i=0; i<data.length; i++){
      let divColElt = document.createElement('div');
      divColElt.classList.add('col-12', 'col-lg-4', 'mb-4');
      
      let divCardElt = document.createElement('div');
      divCardElt.classList.add('card', 'border-primary', 'shadow');
      
      let imgElt = document.createElement('img');
      imgElt.src = data[i].imageUrl;
      imgElt.alt = data[i].name;
      imgElt.classList.add('card-img-top');
      imgElt.setAttribute('height', '231px');
      
      let divBodyElt = document.createElement('div');
      divBodyElt.classList.add('card-body');
      
      let h5Elt = document.createElement('H5');
      h5Elt.classList.add('card-title', 'text-center');
      h5Elt.appendChild(document.createTextNode(data[i].name));
      
      let pElt = document.createElement('p');
      pElt.classList.add('card-text');
      pElt.appendChild(document.createTextNode(data[i].description));
      
      let aElt = document.createElement('a');
      aElt.href= "index.html?id=" + data[i]._id;
      aElt.classList.add('btn', 'btn-primary', 'stretched-link');
      aElt.setAttribute('role', 'button');
      aElt.appendChild(document.createTextNode('Voir ce produit'));
      
      divBodyElt.appendChild(h5Elt);
      divBodyElt.appendChild(pElt);
      divCardElt.appendChild(imgElt);
      divCardElt.appendChild(divBodyElt);
      divCardElt.appendChild(aElt);
      divColElt.appendChild(divCardElt);
      produitsElt.appendChild(divColElt);
  }
}

// Récupération des données de l'API
fetch('http://localhost:3000/api/teddies') // Appel de l'API -- qui retourne une promesse nommée response
.then((response) => response.json()) // Transforme cette promesse en une autre promesse au format json. then(response => response.json) est égal à then(fonction (response) { return response.json}
.then(function(data){ // Les données sont contenues dans data qui est un tableau d'objets.
  if (obtenirParametre("id")){ // Si id existe dans l'URL
    for (let i=0;i<data.length;i++){ // On parcourt tout le tableau pour retrouver l'id correspondant
      if (data[i]._id == obtenirParametre("id")){ // Une fois le produit correspondant obtenu
        ProduitSeul(data[i]); // On affiche les caractéristiques du produit seul
        addCart();
      }
    }
  }
  else{ // Si id n'existe pas dans l'URL -> On affiche la liste des produits.
    listeProduits(data);
  }
})
.catch(function(error) { // gestion des erreurs renvoyées par le serveur
  console.log(error);
});


// Fonction de récupération de l'ID trouvée sur https://developer.mozilla.org/fr/docs/Web/API/window/location

function obtenirParametre (sVar) {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


// Reconstruction du DOM pour un produit
function ProduitSeul(data){
  let produitElt = document.getElementById('produits'); 

  let divLeftElt = document.createElement('div');
  divLeftElt.classList.add('col-12', 'col-lg-6');

  let divRightElt = document.createElement('div');
  divRightElt.classList.add('col-12', 'col-lg-6');

  let imgElt = document.createElement('img');
  imgElt.classList.add('w-100');
  imgElt.src=data.imageUrl;
  imgElt.alt=data.name;

  let h1Elt = document.createElement('H1');
  h1Elt.classList.add('text-center');
  h1Elt.appendChild(document.createTextNode(data.name));

  let formElt = document.createElement('form');
  formElt.setAttribute('role', 'form');
  formElt.setAttribute('action', '');
  formElt.setAttribute('method', 'post');

  let formGroupElt1 = document.createElement('div');
  formGroupElt1.classList.add('form-group');

  let labelSelectElt = document.createElement('label');
  labelSelectElt.setAttribute('for', 'couleur');
  labelSelectElt.textContent = 'Couleurs :';
  labelSelectElt.classList.add('col-12', 'text-center', 'text-lg-left');

  let selectElt = document.createElement('select');
  selectElt.classList.add('form-control', 'form-control-md');
  selectElt.setAttribute('name', 'couleur');

  for (let i=0; i<data.colors.length; i++){
    let optionElt = document.createElement('option');
    optionElt.text = data.colors[i];
    optionElt.setAttribute('value', data.colors[i]);
    selectElt.appendChild(optionElt);
  }

  let pElt= document.createElement('p');
  pElt.textContent = data.description;

  let formGroupElt2 = document.createElement('div');
  formGroupElt2.classList.add('form-group');

  let labelInputElt = document.createElement('label');
  labelInputElt.setAttribute('for', 'quantity');
  labelInputElt.textContent = "Quantité :";
  labelInputElt.classList.add('col-12', 'text-center', 'text-lg-left');

  let inputElt = document.createElement('input');
  inputElt.setAttribute('type', 'number');
  inputElt.setAttribute('min', '1');
  inputElt.setAttribute('max', '10');
  inputElt.setAttribute('name', 'quantity');
  inputElt.setAttribute('value', '1');
  inputElt.classList.add('form-control');
  inputElt.id = "quantity";

  let prixElt = document.createElement('p');
  prixElt.textContent = 'Prix : ' + data.price/100 + ' EUR';
  prixElt.classList.add('col-12', 'text-center', 'text-lg-left','font-weight-bold');

  let hiddenElt = document.createElement('input');
  hiddenElt.setAttribute('type', 'hidden');
  hiddenElt.setAttribute('value', data.price);
  hiddenElt.id = "price";

  let buttonElt = document.createElement('button');
  buttonElt.setAttribute('type', 'submit');
  buttonElt.textContent = "Ajoutez au panier";
  buttonElt.classList.add('btn', 'btn-primary', 'w-100');
  buttonElt.id = "submit";


  formGroupElt1.appendChild(labelSelectElt);
  formGroupElt1.appendChild(selectElt);

  formElt.appendChild(pElt);
  formElt.appendChild(formGroupElt1);
  formElt.appendChild(formGroupElt2);
  formGroupElt2.appendChild(labelInputElt);
  formGroupElt2.appendChild(inputElt);
  formElt.appendChild(prixElt);
  formElt.appendChild(hiddenElt);
  formElt.appendChild(buttonElt);

  divLeftElt.appendChild(imgElt);

  divRightElt.appendChild(h1Elt);
  divRightElt.appendChild(formElt);

  produitElt.appendChild(divLeftElt);
  produitElt.appendChild(divRightElt);
}

function addCart(){
  let buttonSubmit = document.getElementById('submit');
  buttonSubmit.addEventListener('click', function(event){
    let inputValue = document.getElementById('quantity').value
    let panier=JSON.parse(localStorage.getItem('panier'));
    if (panier == null){
      panier = [];
    }
    let hiddenValue = document.getElementById('price').value;
    let idValue = obtenirParametre('id');
    let lignePanier = {'id' : idValue, 'price' : hiddenValue, 'quantity' : inputValue};
    panier.push(lignePanier);
    console.log(panier);
    localStorage.setItem('panier', JSON.stringify(panier));
  });
}