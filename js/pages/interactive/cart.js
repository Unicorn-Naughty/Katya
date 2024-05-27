//Корзина товаров
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}
//Отчистка корзины
export function removeFromCart(productId, cart) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      // Все кроме того на который мы попали
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  localStorage.setItem("cart", JSON.stringify(cart));

}
