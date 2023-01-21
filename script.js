let modalQtd = 1;
let cart = [];
let modalKey = 0;

const dqs = (elemento) => document.querySelector(elemento);
const dqsAll = (elemento) => document.querySelectorAll(elemento);


// listagem pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener("click", (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;
        modalKey = key;

        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaBig img').src = pizzaJson[key].img;
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        dqsAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if (sizeIndex == 2) {
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })
        dqs('.pizzaInfo--qt').innerHTML = modalQtd;

        dqs('.pizzaWindowArea').style.opacity = 0;
        dqs('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            dqs('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })
    dqs('.pizza-area').append(pizzaItem);

});


// event modal
function closeModal() {
    dqs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        dqs('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

dqsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

dqs('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQtd > 1){
        modalQtd--;
        dqs('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});
dqs('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQtd++;
    dqs('.pizzaInfo--qt').innerHTML = modalQtd;
});

dqsAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e)=>{
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

dqs('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = parseInt(dqs('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > 1){
        cart[key].qtd += modalQtd;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qtd:modalQtd
        })
    }

    updatedCart();
    closeModal();
})

dqs('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        dqs('aside').style.left = '0vw';
    }
});

dqs('.menu-closer').addEventListener('click',()=>{
    dqs('aside').style.left = '100vw';
});

function updatedCart(){
    dqs('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        dqs('aside').classList.add('show');
        dqs('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qtd;
            let cartItem = dqs('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qtd > 1){
                    cart[i].qtd--;
                }else{
                    cart.splice(i,1);
                }
                updatedCart();
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qtd++;
                updatedCart();
            })
            dqs('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        dqs('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        dqs('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        dqs('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        dqs('aside').classList.remove('show');
        dqs('aside').style.left = '100vw';
    }
}

