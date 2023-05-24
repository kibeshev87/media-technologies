let basketCountAria = document.querySelector('.basket__count')
let basketCount = 0;
let basketTotalPriceArea = document.querySelector('.basket__price')
let totalPrice = 0;
let btn = document.querySelector('.card__btn_inBasket')

document.onclick = (event) => {
    if (event.target.dataset.price) {
        basketCount++
        basketCountAria.innerHTML = basketCount;
        totalPrice += Number(event.target.dataset.price);
        basketTotalPriceArea.innerHTML = totalPrice.toLocaleString('ru-Ru') + ' ₽';
        btn.setAttribute('disabled', 'disabled')
    }
}


