const cartMenuBtn = document.querySelector(".cart-menu__btn");
const cart = document.querySelector(".cart");
const cartBtnControl = document.querySelector(".cart__btn-control");

cartMenuBtn.addEventListener("click", function () {
  cartMenuBtn.classList.toggle("active");
  console.log(" cartMenuBtn:" + cartMenuBtn.classList);

  if (cartMenuBtn.classList.contains("active")) {
    cart.hidden = false;
    cartMenuBtn.hidden = true;
    cartBtnControl.classList.remove("active")
  } 
  // cartBtnControl.classList.toggle("active");
});

cartBtnControl.addEventListener("click", function () {
  cartBtnControl.classList.toggle("active");
  if (cartBtnControl.classList.contains("active")) {
    cartMenuBtn.hidden = false;
    cart.hidden = true;
    cartMenuBtn.classList.toggle("active");
  }

  console.log("cartBtnControl: " + this.classList);
  console.log(" cartMenuBtn:" + cartMenuBtn.classList);
});
