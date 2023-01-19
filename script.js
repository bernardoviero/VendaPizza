const dqs = (elemento) => document.querySelector(elemento);
const dqsAll = (elemento) => document.querySelectorAll(elemento);

pizzaJson.map((item, index) => {
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('a').addEventListener("click",(e)=>{
        e.preventDefault();
    })
    dqs('.pizza-area').append(pizzaItem);
});