// Récupération des données de l'API
fetch('http://localhost:3000/api/teddies') // Appel de l'API -- qui retourne une promesse nommée response
.then(function(response){
  if (response.ok){
    return response.json(); // Transforme cette promesse en une autre promesse au format json.
  }
  else{
    let message = 'Le serveur a reçu la demande indique : ' + error + ' Veuillez réessayer ultérieurement !';
    alert(message);
  }
}) 
.then(function(data){ // Les données sont contenues dans data qui est un tableau d'objets.
  if (getParamToURL("id")){ // Si id existe dans l'URL
    let idExist = false;
    for (let i=0;i<data.length;i++){ // On parcourt tout le tableau pour retrouver l'id correspondant
      if (data[i]._id == getParamToURL("id")){ // Une fois le produit correspondant obtenu
        productOnly(data[i]); // On affiche les caractéristiques du produit seul
        addCart();
        idExist = true;
      }
    }
    if (!idExist){ // Si l'id de l'URL n'est pas dans le tableau de l'API
        let message = 'Ce produit n\'existe pas !';
        alert(message); 
    }
  }
  else { // Si id n'existe pas dans l'URL -> On affiche la liste des produits.
    productsList(data);
  }
})
.catch(function(error) { // gestion des erreurs renvoyées par le serveur
    let message = 'Le serveur a renvoyé une erreur ! ' + error + ' Veuillez réessayer ultérieurement !';
    alert(message);
});

function productsList(data){ // Reconstruction du DOM de la partie CARD
  let productsElt = document.getElementById('products');

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
      productsElt.appendChild(divColElt);
  }
}

function getParamToURL(){
    let parsedUrl = new URL(window.location.href);
    return parsedUrl.searchParams.get("id");
}

// Reconstruction du DOM pour un produit
function productOnly(data){
  let productElt = document.getElementById('products'); 

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

  let hidden2Elt = document.createElement('input');
  hidden2Elt.setAttribute('type', 'hidden');
  hidden2Elt.setAttribute('value', data.name);
  hidden2Elt.id = "name";

  let hidden3Elt = document.createElement('input');
  hidden3Elt.setAttribute('type', 'hidden');
  hidden3Elt.setAttribute('value', data.imageUrl);
  hidden3Elt.id = "image";

  let buttonElt = document.createElement('button');
  buttonElt.setAttribute('type', 'submit');
  buttonElt.setAttribute('data-toggle', 'modal');
  buttonElt.setAttribute('data-target', '#modalAddCart');
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
  formElt.appendChild(hidden2Elt);
  formElt.appendChild(hidden3Elt);
  formElt.appendChild(buttonElt);

  divLeftElt.appendChild(imgElt);

  divRightElt.appendChild(h1Elt);
  divRightElt.appendChild(formElt);

  productElt.appendChild(divLeftElt);
  productElt.appendChild(divRightElt);
}

function addCart(){
  let buttonSubmit = document.getElementById('submit');
  buttonSubmit.addEventListener('click', function(event){
    event.preventDefault();
    let inputValue = document.getElementById('quantity').value
    let cart=JSON.parse(localStorage.getItem('cart'));
    if (cart == null){
      cart = [];
    }
    let hiddenValue = document.getElementById('price').value;
    let hidden2Value = document.getElementById('name').value;
    let hidden3Value = document.getElementById('image').value;
    let idValue = getParamToURL('id');
    let lineCart = {'id' : idValue, 'price' : hiddenValue, 'quantity' : inputValue, 'name' : hidden2Value, 'image' : hidden3Value};
    let idExist = false;
    cart.forEach(product => {
      if (product.id == lineCart.id)
      {
        idExist = true;
        let newQuantity = 0;
        newQuantity = parseInt(product.quantity,10) + parseInt(lineCart.quantity,10);
        product.quantity = newQuantity.toString();
        popup();
        
      }
    });
    if (!idExist){
      cart.push(lineCart);
      popup();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  });
}

function popup() // Ouvre un popup quand on ajoute un produit dans le panier
{
    divModalElt = document.createElement('div');
    divModalElt.classList.add('modal', 'fade');
    divModalElt.id='modalAddCart';
    divModalElt.setAttribute('tabindex', '-1');
    divModalElt.setAttribute('role', 'dialog');
    divModalElt.setAttribute('aria-labelledby', 'modalAddCardTitle');
    divModalElt.setAttribute('aria-hidden', 'true');
    divModalElt.innerHTML = '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="modalAddCartTitle">Votre produit a été ajouté au panier</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Continuez vos achats</button><a class="btn btn-primary" href="panier.html" role="button">Voir le panier</a></div></div></div>';
    let productElt = document.getElementById('products'); 
    productElt.appendChild(divModalElt);
}

function alert(message){
    let productsElt = document.getElementById('products');
        let divElt = document.createElement('div');
        divElt.classList.add('alert', 'alert-danger');
        divElt.setAttribute('role', 'alert');
        divElt.innerHTML = message + ' <a href="index.html" title="Retour accueil">Retour à l\'accueil</a>';
        productsElt.appendChild(divElt); 
}