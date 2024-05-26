import { cart } from "../interactive/cart.js";
document.addEventListener("DOMContentLoaded", () => {
  function upDatePage() {}

  let cartsProduct = ``;
  if (cart.length > 0) {
    cart.forEach((cartItem) => {
      cartsProduct += `
                <div class="orderPage__item">
              <div class="orderPage__imgBox">
                <img
                  class="orderPage__img"
                  src="${cartItem.thumbPics}"
                  alt="Фото товара"
                />
              </div>
              <div class="orderPage__info">
                <div class="orderPage__top">
                  <div class="orderPage__item-title">${cartItem.name}</div>
                  <button class="orderPage__btnCancel">X</button>
                </div>
                <div class="orderPage__item-cost">
                  <span> Цена: </span> ${cartItem.quantity * cartItem.cost} руб
                </div>
                <div class="orderPage__size"><span>Размер:</span>${
                  cartItem.size
                }</div>
                <div class="orderPage__color"><span>Цвет:</span>${
                  cartItem.color
                }</div>
                <div class="orderPage__counter">
                  <div class="quantityStr">Количество:</div>
                  <button class="minus">-</button>
                  <div class="orderPage__quantity">${cartItem.quantity}</div>
                  <button class="plus">+</button>
                </div>
              </div>
            </div>
    `;
    });
    document.querySelector(".orderPage__items").innerHTML = cartsProduct;
  } else {
    let main = document.querySelector(".orderPage__inner");
    main.style.display = " none";
    cartsProduct = `
     <p class="textModal">
        Ваша корзина пуста
        </p>
    `;
    document.querySelector(".hiddenDiv").innerHTML = cartsProduct;
  }

  console.log(cart);
});
