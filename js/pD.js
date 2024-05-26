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
