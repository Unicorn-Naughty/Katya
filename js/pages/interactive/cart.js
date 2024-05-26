//Корзина товаров
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

