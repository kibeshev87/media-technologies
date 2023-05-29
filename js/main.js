async function fetchTasks() {
    let response = await fetch('https://dummyjson.com/products?limit=10')
    let content = await response.json()
    let items = content.products
    let card = document.querySelector('.cards__content')

    for (let key in items) {

        let discountPercentage = Math.round(items[key].discountPercentage)
        let basePrice = items[key].price
        let priceAfterDiscount = Math.round(basePrice - (basePrice / 100 * discountPercentage))
        let ratingCount = Math.round(items[key].rating)

        let allStars = '';
        for (let i = 0; i < ratingCount; i++) {
            allStars += `<img src="../assets/images/star.svg" alt="Рейтинг">`
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
    
                            <button class="card__btn_inBasket" data-price="${priceAfterDiscount}" >В корзину</button>
                    </div>`
    }
}

fetchTasks()

