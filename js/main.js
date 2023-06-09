const basketCountArea = document.querySelector('.basket__count');
const basketTotalPriceArea = document.querySelector('.basket__price');
let basketCount = 0;
let totalPrice = 0;

function fetchTasks() {
    return fetch('https://dummyjson.com/products?limit=10')
        .then(res => {
            return res.json()
        })
        .then(cont => {
            return cont.products
        })
}

fetchTasks().then(items => {
    const card = document.querySelector('.cards__content')

    for (let key in items) {

        let discountPercentage = Math.round(items[key].discountPercentage)
        let basePrice = items[key].price
        let priceAfterDiscount = Math.round(basePrice - (basePrice / 100 * discountPercentage))
        let ratingCount = Math.round(items[key].rating)

        let allStars = '';
        for (let i = 0; i < ratingCount; i++) {
            // allStars += `<img src="../assets/images/star.svg" alt="Рейтинг">`
            allStars += `<img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Рейтинг">`
        }

        card.innerHTML += `
        <div class="card">
                        <img class="card__img" src="${items[key].thumbnail}" alt="Фото товара">

                        <div class="card__rating">
                            <span class="card__rating_stars">${allStars}</span>
                            <span class="card__rating_numberOfReviews">${items[key].stock}</span>            
                        </div>

                        <div class="card__description">
                            ${items[key].description}
                        </div>

                            <div class="card__price">
                                <div class="card__oldPriceAndDiscountPercentage">
                                    <span class="card_oldPrice">${items[key].price} ₽</span>
                                    <span class="card_discount">${discountPercentage}%</span>
                                </div>
                                <div class="card__finalPrice">${priceAfterDiscount} ₽</div>
                            </div>
    
                            <button class="card__btn_inBasket" data-price="${priceAfterDiscount}">В корзину</button>
                    </div>`
    }

    const buttons = document.querySelectorAll('.card__btn_inBasket')
    buttons.forEach(button => {

        function addItemToBasket(event) {
            if (event.target.dataset.price) {
                basketCount++
                basketCountArea.innerHTML = basketCount
                totalPrice += Number(event.target.dataset.price)
                basketTotalPriceArea.innerHTML = totalPrice
                    .toLocaleString('ru-Ru') + ' ₽'
            }
            button.setAttribute('disabled', 'disabled')
            button.textContent = 'Товар в корзине';
            button.removeEventListener('click', addItemToBasket)
        }

        button.addEventListener('click', addItemToBasket)
    })
})
