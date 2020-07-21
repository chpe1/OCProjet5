function cartLength(){
    if (localStorage.getItem('cart')){
      let panier = JSON.parse(localStorage.getItem('cart'));
    let nbrArticleInCart = panier.length;
    let aElt= document.getElementById('cartLink');
    aElt.innerHTML= aElt.innerHTML + ' (' + nbrArticleInCart + ') ';
    }
  }

  cartLength();