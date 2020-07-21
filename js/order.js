if (localStorage.getItem('order'))
{
    let order = JSON.parse(localStorage.getItem('order'));
    console.log(order);

    jumbotonElt = document.getElementById('thanks');
        h1Elt = document.createElement('h1');
        h1Elt.classList.add('text-center');
        h1Elt.innerHTML = "Merci pour votre commande";
        jumbotonElt.appendChild(h1Elt);

        pElt = document.createElement('p');
        pElt.classList.add('text-center');
        pElt.innerHTML = "L'équipe d'Oronico vous remercie pour votre commande et vous dit à bientôt !";
        jumbotonElt.appendChild(pElt);

        divElt = document.createElement('div');
        divElt.classList.add('table-responsive');
        jumbotonElt.appendChild(divElt);

        tableElt = document.createElement('table');
        tableElt.classList.add('table');
        divElt.appendChild(tableElt);

            theadElt = document.createElement('thead');
            tableElt.appendChild(theadElt);

                trElt = document.createElement('tr');
                trElt.id = "orderId";
                theadElt.appendChild(trElt);

                thElt=document.createElement('th');
                thElt.classList.add('text-center');
                thElt.setAttribute('colspan', '2');
                thElt.innerHTML='Récapitulatif de votre commande numéro : ' + order.orderId;
                trElt.appendChild(thElt);

            tbodyElt = document.createElement('tbody');
            tbodyElt.id="orderList";
            tableElt.appendChild(tbodyElt);

    order.products.forEach(product => {
        orderList(product); 
    });

    div2Elt = document.getElementById('sendOrder');
        h3Elt = document.createElement('h3');
        h3Elt.classList.add('text-center');
        h3Elt.innerHTML = "Votre commande vous sera envoyée à cette adresse :";
        div2Elt.appendChild(h3Elt);

        tabAddress(order.contact);

    localStorage.clear();
}
else{
    // rien à faire sur cette page
    jumbotonElt = document.getElementById('thanks');
    pElt = document.createElement('p');
    pElt.classList.add('text-center');
    pElt.innerHTML = "Vous n'avez rien à faire sur cette page ! ";
    aElt = document.createElement('a');
    aElt.href="index.html";
    aElt.title="Retournez à la page d'accueil";
    aElt.innerHTML="Retournez à la page d'accueil";
    pElt.appendChild(aElt);
    jumbotonElt.appendChild(pElt);
}

function orderList(product){
    let trElt= document.createElement('tr');
    let td1Elt= document.createElement('td');
    td1Elt.innerHTML='<img src="' + product.imageUrl + '" alt="' + product._id + '" width="100px">';
    let td2Elt= document.createElement('td');
    td2Elt.innerHTML= product.name;    
    let tbodyElt=document.getElementById('orderList');
    tbodyElt.appendChild(trElt);
    trElt.appendChild(td1Elt);
    trElt.appendChild(td2Elt);
}

function tabAddress(contact){ 
    pElt = document.createElement('p');
    pElt.classList.add('text-left');
    pElt.innerHTML = contact.lastName + ' ' + contact.firstName + ' ' + '<br/>' + contact.address + '<br/>' + contact.city;
    div2Elt.appendChild(pElt);
}