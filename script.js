let modalQtd = 1;
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

        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaBig img').src = pizzaJson[key].img;
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
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
        dqs('.pizzaWindowArea').style.dispaly = 'none';
    }, 500);
}

dqsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});