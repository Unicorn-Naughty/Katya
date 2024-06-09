import { getProduct } from "../../data/dataCards.js";
import { cart } from "../interactive/cart.js";
import { arrOfProducts } from "../../data/dataCards.js";
import { products } from "./index.js";
document.addEventListener("DOMContentLoaded", () => {
  function upDatePage() {
    let idOfelement = [];
    //Перербали локалСтейдж чтобы установить ид куда кликнули
    let getClickedUserProd = JSON.parse(localStorage.getItem("products"));
    let prodNow = getProduct(getClickedUserProd[getClickedUserProd.length - 1]);
    document.querySelector(
      ".tIc"
    ).innerHTML = `<h2 class="title-section main title-section-vstavka">${prodNow.secondName}:</h2>`;
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
                <span class="product__cost">${prodNow.cost}₽</span>
              </div>
              <span class="infoAboutCachestvo">${prodNow.compound}</span>
              <span class="infoAboutCachestvo">Параметры модели: рост 167 см, ОГ/ОТ/ОБ — 78/62/88, размер на модели: S
</span>
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
      console.log(prodNow.size);
      console.log(prodNow);
      cart.forEach((cartItem) => {
        if (prodNow.id + prodNow.size === cartItem.id) {
          matchingProd = cartItem;
        }
      });
      if (matchingProd) {
        matchingProd.quantity += 1;
      } else {
        cart.push({
          name: prodNow.name,
          id: prodNow.id + prodNow.size,
          color: prodNow.color,
          quantity: prodNow.quantity,
          description: prodNow.description,
          thumbPics: prodNow.thumbPics,
          cost: prodNow.cost,
          size: prodNow.size,
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));

      //Сделанно не корректно
      location.reload();
      alert("Товар доавблен в корзину");
    });
    //Количество товара в корзине отображение на странице
    let quantity = 0;
    cart.forEach((element) => {
      quantity += element.quantity;
    });
    if (cart.length > 0) {
      document
        .querySelector(".nav__list-item--cart")
        .insertAdjacentHTML(
          "afterbegin",
          `<span class="cartCount">${quantity}</span>`
        );
    }

    //Переход по карточкам из слайдера
    let showItem = document.querySelectorAll(".collection__item-btn");
    showItem.forEach((linkBtn) => {
      linkBtn.addEventListener("mousedown", (e) => {
        let { productId } = linkBtn.dataset;
        products.push(productId);
        localStorage.setItem("products", JSON.stringify(products));
      });
    });
    document
      .querySelectorAll(".collection__item-linkImg")
      .forEach((imgLink) => {
        imgLink.addEventListener("mousedown", (e) => {
          let { productId } = imgLink.dataset;
          products.push(productId);
          localStorage.setItem("products", JSON.stringify(products));
        });
      });
  }

  let sliderInner = ``;
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
                  <h5 class="collection__item-name">${sliderProduct.secondName}</h5>
                  <a class="collection__item-btn" data-product-id="${sliderProduct.id}"href="productPage.html">${sliderProduct.cost}₽</a>
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

  upDatePage();
});
