import { cart, removeFromCart } from "../interactive/cart.js";
document.addEventListener("DOMContentLoaded", () => {
  let checkBoxesDel = document.querySelectorAll(".orderRadio--del");
  let totalCost;
  let orderId = `AZ${Math.abs(Math.ceil(100) * 100)}BZ${Math.ceil(
    Math.random(10) * 90
  )}`;
  class UserOrder {
    constructor() {
      user: {
        (this.name = inputs[1].value),
          (this.Surname = inputs[0].value),
          (this.phone = inputs[2].value),
          (this.addres = inputs[4].value),
          (this.email = inputs[3].value),
          (this.payment = payment),
          (this.delivery = delivery),
          (this.order = cart);
        this.id = orderId;
        this.orderCost = totalCost;
      }
    }
  }
  function upDatePage() {
    let cartsProduct = ``;
    if (cart.length > 0) {
      cart.forEach((cartItem) => {
        cartsProduct += `
                <div class="orderPage__item orderPage__item-${cartItem.id}">
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
                  <button class="orderPage__btnCancel" data-product-id="${
                    cartItem.id
                  }" >X</button>
                </div>
                <div class="orderPage__item-cost">
                  <span> Цена: </span> ${cartItem.quantity * cartItem.cost} руб
                </div>
                <div class="orderPage__size"><span>Размер: </span>${
                  cartItem.size
                }</div>
                <div class="orderPage__color"><span>Цвет: </span>${
                  cartItem.color
                }</div>
                <div class="orderPage__counter">
                  <div class="quantityStr">Количество:</div>
                  <button class="minus" data-product-id="${
                    cartItem.id
                  }">-</button>
                  <div class="orderPage__quantity">${cartItem.quantity}</div>
                  <button class="plus" data-product-id="${
                    cartItem.id
                  }">+</button>
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

    //Кнопка крестика на карточке товаров
    document.querySelectorAll(".orderPage__btnCancel").forEach((btnCancel) => {
      btnCancel.addEventListener("click", () => {
        const { productId } = btnCancel.dataset;
        removeFromCart(productId, cart);
        document.querySelector(`.orderPage__item-${productId}`).remove();
        location.reload();
      });
    });
    //плюс
    document.querySelectorAll(".plus").forEach((plus) => {
      plus.addEventListener("click", () => {
        const { productId } = plus.dataset;
        cart.forEach((cartItem) => {
          if (cartItem.id === productId) {
            cartItem.quantity += 1;
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        upDatePage();
      });
    });
    //минус
    document.querySelectorAll(".minus").forEach((minus) => {
      minus.addEventListener("click", () => {
        const { productId } = minus.dataset;
        cart.forEach((cartItem) => {
          if (cartItem.id === productId) {
            if (cartItem.quantity > 1) {
              cartItem.quantity -= 1;
            }
          }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        upDatePage();
      });
    });
    //Общая сумма без доставки
    let cost = 0;
    cart.forEach((cartItem) => {
      cost += cartItem.cost * cartItem.quantity;
    });
    document.querySelector(".allCost__item__cost").innerHTML = `${cost} руб`;
    // Сумма дсотавки
    let deliveryCost = 0;
    checkBoxesDel.forEach((chekBoxDel) => {
      if (chekBoxDel.checked) {
        if (chekBoxDel.value == "courier") {
          deliveryCost += 300;
        }
      }
    });

    //Цена доставки
    document.querySelector(
      ".allCost__item__cost-del"
    ).innerHTML = `${deliveryCost} руб`;

    document.querySelectorAll(".orderRadio").forEach((element) => {
      element.addEventListener("click", () => {
        upDatePage();
      });
    });
    //Цена Заказа
    totalCost = cost + deliveryCost;
    document.querySelector(".itogo__cost").innerHTML = `${totalCost} руб`;
  }
  upDatePage();

  //Форма
  let inputs = document.querySelectorAll(".order__form-input");
  let phone = inputs[2];
  let delivery = "";
  let payment = "";

  //Проверка телефона
  phone.onfocus = function () {
    if (phone.value.length !== 12) {
      phone.value = "+7";
    }
  };
  phone.onblur = function () {
    checkPhoneNumber(phone);
  };
  function checkPhoneNumber(inField) {
    if (inField.value.length !== 12) {
      inField.value = "";
    }
  }
  //Создали пользователя
  let user;
  //Работа с формой
  document
    .querySelector(".order__info-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      inputs.forEach((input) => {
        if (
          input.value < 1 ||
          input.value === "" ||
          input.value === undefined
        ) {
          e.preventDefault();
          input.style.border = "1px solid red";
          input.scrollIntoView({ block: "center", behavior: "smooth" });
        } else {
        }
      });

      let checkBoxesPayment = document.querySelectorAll(".orderRadio--payment");
      checkBoxesPayment.forEach((chekBoxPayment) => {
        if (chekBoxPayment.checked) {
          payment = chekBoxPayment.value;
        }
      });
      checkBoxesDel.forEach((chekBoxDel) => {
        if (chekBoxDel.checked) {
          delivery = chekBoxDel.value;
        }
      });
      let number = phone.value.slice(1);
      if (+number) {
        //Создали юзера
        user = new UserOrder();
        console.log(user);
      } else {
        e.preventDefault();
        phone.style.border = "1px solid red";
        phone.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      let strCart = ``;
      let x = "";
      cart.forEach((cartItem) => {
        x = `
        Название: ${cartItem.name} 
        Цвет: ${cartItem.color}
        Размер: ${cartItem.size} 
        Количество: ${cartItem.quantity} 
        Цена: ${cartItem.cost}

        `;
        strCart += x;
      });
      console.log(strCart);
      let data = {
        service_id: "service_7ld8kpw",
        template_id: "template_kbt83e9",
        template_params: {
          username: `${user.name}`,
          mail: `${user.email}`,
          id: `${user.id}`,
          del: `${user.delivery}`,
          phone: `${user.phone}`,
          addres: `${user.addres}`,
          delivery: `${user.delivery}`,
          payment: `${user.payment}`,
          orderCost: `${user.orderCost}`,
          order: strCart,
        },
        user_id: "mlL_j8ayB-p55W9V3",
      };

      $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      })
        .done(function () {
          alert("Данные о заказе были отправленны на вашу почту!");
          window.location.href = "index.html";
          localStorage.clear();
        })
        .fail(function (error) {
          alert("Возникла ошибка :" + JSON.stringify(error));
        });
    });
});
