if (localStorage.getItem('cart'))
{
    let cart = JSON.parse(localStorage.getItem('cart'));
    let varSubTotal=0;
    let products= [];
    cart.forEach(product => {
        varSubTotal += listCart(product);
        for (let i=0; i<product.quantity; i++){
        products.push(product.id);
        };
    });
    subTotal(varSubTotal);
    contactInfo();
    formRemove();
    order(products);
}
else{
    emptyCart();
}

function listCart(product){
    let varSubTotal=0;
    let totalArticle=0;
    let trElt= document.createElement('tr');
    let tdElt = document.createElement('td');
        let imgElt = document.createElement('img');
        imgElt.src= product.image;
        imgElt.alt= product.name;
        imgElt.setAttribute('width', '100px');
        tdElt.appendChild(imgElt);
    // let td1Elt = document.createElement('td');
    // td1Elt.innerHTML='<strong>' + product.id + '</strong>';
    let td2Elt= document.createElement('td');
    td2Elt.innerHTML='<strong>' + product.name + '</strong>';
    let td3Elt=document.createElement('td');
    let formElt = document.createElement('form');
    formElt.classList.add('form-inline');
    let inputElt= document.createElement('input');
    inputElt.classList.add('form-control');
    inputElt.setAttribute('type', 'number');
    inputElt.setAttribute('value', product.quantity);
    inputElt.setAttribute('min', '0');
    inputElt.setAttribute('max', '10');
    inputElt.setAttribute('name', 'quantity');
    let td4Elt = document.createElement('td');
    td4Elt.innerHTML=product.price/100 + ' EUR';
    td5Elt = document.createElement('td');
    formRemoveElt = document.createElement('form');
    formRemoveElt.classList.add('formRemove');
    formRemoveElt.innerHTML = '<button class="btn btn-primary" type="submit">X</button>';

    totalArticle = (product.price/100) * product.quantity;
    varSubTotal += totalArticle;

    let tbodyElt=document.getElementById('listCart');
    tbodyElt.appendChild(trElt);
    trElt.appendChild(tdElt);
    // trElt.appendChild(td1Elt);
    trElt.appendChild(td2Elt);
    trElt.appendChild(td3Elt);
    trElt.appendChild(td4Elt);
    td3Elt.appendChild(formElt);
    formElt.appendChild(inputElt);
    trElt.appendChild(td5Elt);
    td5Elt.appendChild(formRemoveElt);

    return varSubTotal;
}

function subTotal(varSubTotal){
    let shipping=0;
    let tr2Elt= document.createElement('tr');
    let tdAElt= document.createElement('td');
    tdAElt.classList.add('text-right');
    tdAElt.setAttribute('colspan', '3');
    tdAElt.innerHTML = "Sous-Total";
    let td6Elt = document.createElement('td');
    td6Elt.innerHTML = varSubTotal + ' EUR';
    tr3Elt= document.createElement('tr');
    td7Elt= document.createElement('td');
    td7Elt.classList.add('text-right');
    td7Elt.setAttribute('colspan', '3');
    td7Elt.innerHTML = "Frais de port";
    let td8Elt = document.createElement('td');
    td8Elt.innerHTML = shipping + ' EUR';
    let tr4Elt= document.createElement('tr');
    let td9Elt= document.createElement('td');
    td9Elt.classList.add('text-right');
    td9Elt.setAttribute('colspan', '3');
    td9Elt.innerHTML = "Total";
    let td10Elt = document.createElement('td');
    td10Elt.innerHTML = varSubTotal + shipping + ' EUR';

    tbodyElt=document.getElementById('listCart');
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

function emptyCart(){
    tbodyElt = document.getElementById('listCart');
    trElt = document.createElement('tr');
    tdElt = document.createElement('td');
    tdElt.setAttribute('colspan', '6');
    tdElt.innerHTML="Votre panier est vide !";
    tdElt.classList.add('text-center');

    tbodyElt.appendChild(trElt);
    trElt.appendChild(tdElt);
}

function order(products){
    // Récupération des données du formulaire
    let form = document.getElementById('formCart');
    form.addEventListener('submit', function(event){
        let name = form.elements.name.value;
        let firstname = form.elements.firstname.value;
        let email = form.elements.email.value;
        let address = form.elements.address.value;
        let city = form.elements.city.value;

        let contact = {
            lastName : name,
            firstName : firstname,
            address : address,
            city : city,
            email : email
        };

        let body = {
            contact, 
            products
        };
        
        let entetes = new Headers();
        entetes.append('Content-Type', 'application/json');
        
        // Paramètres de la fonction fetch pour l'envoi
        let fetchData = { 
            method: 'POST', 
            body: JSON.stringify(body), 
            headers: entetes
        };

        event.preventDefault();

        fetch('http://localhost:3000/api/teddies/order', fetchData)
        .then(function(response){
            if (response.ok){
              return response.json(); // Transforme cette promesse en une autre promesse au format json.
            }
            else{
              let message = 'Le serveur a reçu la demande indique : ' + error + ' Veuillez réessayer ultérieurement !';
              alert(message);
            }
          }) 
        .then(function(data) {
            localStorage.setItem('order', JSON.stringify(data));
            document.location.href = "./confirmation_commande.html";
        });
    } // fin callback addEventListener
    ); // fin addEventListener
} // fin order


function contactInfo(){
    let divContact = document.getElementById('contact');
    h3Elt = document.createElement('h3');
    h3Elt.innerHTML = 'Laissez-nous des informations utiles à votre commande : ';
    divContact.appendChild(h3Elt);

    formElt = document.createElement('form');
    formElt.id = 'formCart';
    divContact.appendChild(formElt);

        divFormGroupElt = document.createElement('div');
        divFormGroupElt.classList.add('form-group', 'mt-3');
        formElt.appendChild(divFormGroupElt);

            labelName= document.createElement('label');
            labelName.setAttribute('for', 'name');
            labelName.innerHTML = 'Nom :';
            divFormGroupElt.appendChild(labelName);

            inputName= document.createElement('input');
            inputName.classList.add('form-control');
            inputName.id = 'name';
            inputName.setAttribute('type', 'text');
            inputName.setAttribute('placeholder', 'Indiquez votre nom');
            inputName.setAttribute('aria-describedby', 'name');
            inputName.required = true;
            divFormGroupElt.appendChild(inputName);

        divFormGroup2Elt = document.createElement('div');
        divFormGroup2Elt.classList.add('form-group', 'mt-3');
        formElt.appendChild(divFormGroup2Elt);

            labelFirstName= document.createElement('label');
            labelFirstName.setAttribute('for', 'firstname');
            labelFirstName.innerHTML = 'Prénom :';
            divFormGroup2Elt.appendChild(labelFirstName);

            inputFirstName= document.createElement('input');
            inputFirstName.classList.add('form-control');
            inputFirstName.id = 'firstname';
            inputFirstName.setAttribute('type', 'text');
            inputFirstName.setAttribute('placeholder', 'Indiquez votre prénom');
            inputFirstName.setAttribute('aria-describedby', 'firsname');
            inputFirstName.required = true;
            divFormGroup2Elt.appendChild(inputFirstName);

        divFormGroup3Elt = document.createElement('div');
        divFormGroup3Elt.classList.add('form-group', 'mt-3');
        formElt.appendChild(divFormGroup3Elt)

            labelEmail= document.createElement('label');
            labelEmail.setAttribute('for', 'email');
            labelEmail.innerHTML = 'Email :';
            divFormGroup3Elt.appendChild(labelEmail);

            inputFirstName= document.createElement('input');
            inputFirstName.classList.add('form-control');
            inputFirstName.id = 'email';
            inputFirstName.setAttribute('type', 'email');
            inputFirstName.setAttribute('placeholder', 'Indiquez votre email');
            inputFirstName.setAttribute('aria-describedby', 'email');
            inputFirstName.required = true;
            divFormGroup3Elt.appendChild(inputFirstName);
    
        divFormGroup4Elt = document.createElement('div');
        divFormGroup4Elt.classList.add('form-group', 'mt-3');
        formElt.appendChild(divFormGroup4Elt)

            labelAddress= document.createElement('label');
            labelAddress.setAttribute('for', 'address');
            labelAddress.innerHTML = 'Adresse de livraison :';
            divFormGroup4Elt.appendChild(labelAddress);

                textareaElt= document.createElement('textarea');
                textareaElt.classList.add('form-control');
                textareaElt.id = 'address';
                textareaElt.setAttribute('row', '5');
                textareaElt.required = true;
                divFormGroup4Elt.appendChild(textareaElt);

        divFormGroup5Elt = document.createElement('div');
        divFormGroup5Elt.classList.add('form-group', 'mt-3');
        formElt.appendChild(divFormGroup5Elt)
    
            labelCity= document.createElement('label');
            labelCity.setAttribute('for', 'city');
            labelCity.innerHTML = 'Ville :';
            divFormGroup5Elt.appendChild(labelCity);
    
            inputCity= document.createElement('input');
            inputCity.classList.add('form-control');
            inputCity.id = 'city';
            inputCity.setAttribute('type', 'text');
            inputCity.setAttribute('placeholder', 'Indiquez votre ville');
            inputCity.setAttribute('aria-describedby', 'city');
            inputCity.required = true;
            divFormGroup5Elt.appendChild(inputCity);

    buttonElt = document.createElement('button');
    buttonElt.setAttribute('type', 'submit');
    buttonElt.classList.add('btn', 'btn-primary', 'w-100');
    buttonElt.id = 'submit';
    buttonElt.innerHTML = 'Passer la commande';
    formElt.appendChild(buttonElt);
}

function alert(message){
    let productsElt = document.getElementById('contact');
        let divElt = document.createElement('div');
        divElt.classList.add('alert', 'alert-danger');
        divElt.setAttribute('role', 'alert');
        divElt.innerHTML = message + ' <a href="index.html" title="Retour accueil">Retour à l\'accueil</a>';
        productsElt.appendChild(divElt); 
}

function removeProduct(i){ // Lancer cette fonction au clic sur la X
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function formRemove(){
    let formRemoveElt = document.getElementsByClassName('formRemove');
    console.log(formRemoveElt.length);
    for (let i=0;i<formRemoveElt.length;i++){
        formRemoveElt[i].addEventListener('submit', function (e){
            e.preventDefault();
            removeProduct(i);
            document.location.reload();
        });
    }
}