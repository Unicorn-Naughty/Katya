import { arrOfProducts, getProduct } from "../../data/dataCards.js";
import { arrOfSoonCards } from "../../data/soonCards.js";
import { saveToLocal } from "../../scripts/helper.js";
import { cart } from "../interactive/cart.js";
//Дом дерево построено -> Запуск

export let products = [];
document.addEventListener("DOMContentLoaded", () => {
  let producstMain = "";

  //Блока с карточками основными
  arrOfProducts.forEach((productMain) => {
    //Сделали выборку тольок по первому слову
    let name = productMain.name.split(" ");

    //Создание каждой карточки товаров
    producstMain += `             
     <div class="collection__item">
                <div class="collection__boximg">
                  <a class="collection__item-linkImg"
                  data-product-id="${productMain.id}"
                  href="productPage.html">
                    <img
                    class="collection__img"
                      
                    src="${productMain.thumbPics}"
                    alt="Фото карточки товара"
                    />
                    </a>
                    </div>
                    <div class="collection__item-info">
                    <h5 class="collection__item-name">${name[0]}</h5>
                    <a class="collection__item-btn" data-product-id="${productMain.id}"href="productPage.html">К товару </a>
                </div>
              </div>`;
  });
  //Вставили все карточки
  document.querySelector(".collection__items").innerHTML = producstMain;

  //Делаем тоже самое только для товаров которые появятся скоро
  let productsSoon = "";
  arrOfSoonCards.forEach((productSoon) => {
    productsSoon += `              
    <div class="awaitSoon__item">
    <div class="awaitSoon__item-imgBox">
    <img
    class="awaitSoon__item-img"
    src="${productSoon.pics}"
                    alt="Фото карточки товара"
                    />
                    </div>
                    <div class="awaitSoon__item-infobox">
                    <h5 class="awaitSoon__name">${productSoon.name}</h5>
                    <p class="awaitSoon__cost">${productSoon.cost}Р</p>
                </div>
                </div>`;
  });
  document.querySelector(".awaitSoon__items").innerHTML = productsSoon;
  $(".awaitSoon__items").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 500,
    autoplay: true,
  });

  //Добавили переход по карточкам (ссылки)
  let showItem = document.querySelectorAll(".collection__item-btn");
  console.log(showItem);
  showItem.forEach((linkBtn) => {
    linkBtn.addEventListener("mousedown", (e) => {
      let { productId } = linkBtn.dataset;
      products.push(productId);
      localStorage.setItem("products", JSON.stringify(products));
    });
  });
  document.querySelectorAll(".collection__item-linkImg").forEach((imgLink) => {
    imgLink.addEventListener("mousedown", (e) => {
      let { productId } = imgLink.dataset;
      products.push(productId);
      localStorage.setItem("products", JSON.stringify(products));
    });
  });

  //Форма отправки мыла
  let messInputs = document.querySelectorAll(
    ".collection__communictaion-input"
  );
  document
    .querySelector(".collection__communictaion-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let name = messInputs[0].value;
      let email = messInputs[1].value;
      let message = document.querySelector(
        ".collection__communictaion-textarea"
      ).value;

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const body = {
        name,
        email,
        message,
      };

      const options = {
        method: "POST",
        headers,
        mode: "cors",
        body: JSON.stringify(body),
      };

      fetch("https://eoljwqner75npaf.m.pipedream.net", options);

      alert("Сообщение отправлено!");
      this.reset();
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
  //Открыли модалку
  document
    .querySelector(".aboutus__learn-more")
    .addEventListener("click", () => {
      document.querySelector(".modalAboutUs").style.display = "block";
    });
  //Закрыли модалку
  document.querySelector(".cancelModal").addEventListener("click", () => {
    document.querySelector(".modalAboutUs").style.display = "none";
  });
});
