import { textes } from "../../data/dataTextes.js";
document.addEventListener("DOMContentLoaded", () => {
  let textAll = ``;
  textes.forEach((text) => {
    textAll += `
<p class="dpublicOfer__text">${text.text}</p>
  `;
  });
  document.querySelector(".dpublicOfer__texeses").innerHTML = textAll;
});
