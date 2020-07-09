function listeProduits(data){ // Reconstruction du DOM de la partie CARD
  let produitsElt = document.getElementById('produits');

  for (let i=0; i<data.length; i++){
      let divColElt = document.createElement('div');
      divColElt.classList.add('col-12', 'col-lg-4', 'mb-4');
      
      let divCardElt = document.createElement('div');
      divCardElt.classList.add('card', 'mb-4', 'mb-lg-0', 'border-primary', 'shadow');
      
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
      aElt.href= "#";
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

// Reconstruction de la partie carrousel

function carrousel(data){
  let carrouselElt = document.getElementById('carousel-inner');
  for (let i=0; i<data.length; i++){
    let divElt = document.createElement('div');
    divElt.classList.add('carousel-item');
    if (i==0){
      divElt.classList.add('active');
    }
    let imgElt = document.createElement('img');
    imgElt.src = data[i].imageUrl;
    imgElt.alt = data[i].name;
    imgElt.classList.add('d-block', 'w-100');
    imgElt.setAttribute('height', '479px');

    carrouselElt.appendChild(divElt);
    divElt.appendChild(imgElt);
  }
}


fetch('http://localhost:3000/api/teddies') // Appel de l'API -- qui retourne une promesse nommée response
.then((response) => response.json()) // Transforme cette promesse en une autre promesse au format json. then(response => response.json) est égal à then(fonction (response) { return response.json}
.then(function(data){
  carrousel(data);
  listeProduits(data);
})
.catch(function(error) { // gestion des erreurs renvoyées par le serveur
  console.log(error);
});