import { getProduct } from "../../data/dataCards.js";
import { cart } from "../interactive/cart.js";
import { arrOfProducts } from "../../data/dataCards.js";
document.addEventListener("DOMContentLoaded", () => {
  let idOfelement = [];
  //Перербали локалСтейдж чтобы установить ид куда кликнули
  let getClickedUserProd = JSON.parse(localStorage.getItem("products"));
  let prodNow = getProduct(getClickedUserProd[getClickedUserProd.length - 1]);
  console.log(prodNow);

  let product = getProduct(idOfelement[idOfelement.length - 1]);
  console.log(product);
  let productDetail = `
          <div class="main__inner">
          <div class="product-details__thumb">
            <div class="product-details__thumb-item">
              <img
                class="product-details__thumb-img"
                src="${prodNow.thumbPics}"
                alt="thumb image"
              />
            </div>
            <div class="product-details__thumb-item">
              <img
                class="product-details__thumb-img"
                src="${prodNow.bigPics1}"
                alt="thumb image"
              />
            </div>
            <div class="product-details__thumb-item">
              <img
                class="product-details__thumb-img"
                src="${prodNow.bigPics2}"
                alt="thumb image"
              />
            </div>
          </div>
          <div class="product-details__big">
            <div class="product-details__big-item">
              <img
                class="product-details__big-img"
                src="${prodNow.thumbPics}"
                alt="big image"
              />
            </div>
            <div class="product-details__big-item">
              <img
                class="product-details__big-img"
                src="${prodNow.bigPics1}"
                alt="big image"
              />
            </div>
            <div class="product-details__big-item">
              <img
                class="product-details__big-img"
                src="${prodNow.bigPics2}"
                alt="big image"
              />
            </div>
          </div>
          <div class="product__details">
            <div class="product__deatils-descripiton">
              <h4 class="product__name">${prodNow.name}</h4>
              <p class="product__description">
                ${prodNow.description}
              </p>
              <div class="product__sizes">
                <div class="radio-wrap">
                  <label class="radio-label">
                    <input type="radio" name="sort" class="productSizeInput" value="xs" />
                    <span>XS</span>
                  </label>

                  <label class="radio-label">
                    <input type="radio" name="sort" class="productSizeInput" value="s" checked />
                    <span>S</span>
                  </label>

                  <label class="radio-label">
                    <input type="radio" name="sort" class="productSizeInput" value="m" />
                    <span>M</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" name="sort" class="productSizeInput" value="l" />
                    <span>L</span>
                  </label>
                </div>
              </div>
              <div class="product__buy">
                <button class="addBtn product__page-addBtn">В корзину</button>
                <span class="product__cost">${prodNow.cost}Р</span>
              </div>
              <span class="infoAboutCachestvo">${prodNow.compound}</span>
            </div>
          </div>
        </div>
        <section class="product__reccomendation">
          <h3 class="product__reccomendation-title">Рекомендации по уходу :</h3>
          <p class="product__reccomendation-text">
            <b>Подготовка к стирке:</b>  замочите изделие в холодной воде в
            случае, если сильно его испачкали.
          </p>
          <p class="product__reccomendation-text">
            <b>Стирка:</b>  стирать рекомендуем при температуре не выше 30
            градусов. Не рекомендуем устанавливать высокие обороты для отжима,
            отбеливать изделие нельзя.
          </p>
          <p class="product__reccomendation-text">
            <b>Сушка:</b> не скручивайте изделие при отжиме, не сушите изделие в
            машинке, оно может дать усадку. После стирки необходимо хорошо
            встряхнуть, сушить в расправленном виде вдали от солнечных лучей.
          </p>
          <p class="product__reccomendation-text">
            <b>Глажка:</b> гладьте изделие при температуре 120°С, когда оно
            немного влажное.
          </p>
          <p class="product__reccomendation-text">
            <b>Химчистка:</b> не рекомендована..
          </p>
        </section>
  `;
  document.querySelector(".prdInner").innerHTML = productDetail;
  $(".product-details__thumb").slick({
    asNavFor: ".product-details__big",
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    draggable: false,
  });
  $(".product-details__big").slick({
    asNavFor: ".product-details__thumb",
    draggable: false,
    arrows: false,
    fade: true,
  });
  localStorage.removeItem(`${idOfelement}`);

  let inputFileds = document.querySelectorAll(".productSizeInput");

  document.querySelector(".addBtn").addEventListener("click", () => {
    //CHEKER NA sizes
    inputFileds.forEach((element) => {
      if (element.checked) {
        prodNow.size = element.value;
      }
    });
    //Одинаковые карточки увеличиваем количество на 1
    let matchingProd;
    cart.forEach((cartItem) => {
      if (prodNow.size == cartItem.size && prodNow.id === cartItem.id) {
        matchingProd = cartItem;
      }
    });
    if (matchingProd) {
      matchingProd.quantity += 1;
    } else {
      cart.push(prodNow);
    }
    console.log(matchingProd);
    console.log(prodNow);
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  //slider
  let sliderInner = ``;
  console.log(arrOfProducts);
  arrOfProducts.forEach((sliderProduct) => {
    let name = sliderProduct.name.split(" ");
    sliderInner += `
     <div class="collection__item">
                <div class="collection__boximg">
                  <a class="collection__item-linkImg"
                  data-product-id="${sliderProduct.id}"
                  href="productPage.html">
                    <img
                      class="collection__img"
                      
                      src="${sliderProduct.thumbPics}"
                      alt="Фото карточки товара"
                    />
                  </a>
                </div>
                <div class="collection__item-info">
                  <h5 class="collection__item-name">${name[0]}</h5>
                  <a class="collection__item-btn" data-product-id="${sliderProduct.id}"href="productPage.html">К товару </a>
                </div>
              </div>
    `;
  });
  document.querySelector(".product__additional-items").innerHTML = sliderInner;
  $(".product__additional-items").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 500,
    autoplay: true,
  });
});
