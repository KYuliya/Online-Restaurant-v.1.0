// products__buttons-wrapper:
// 1. products__btn-wrapper -- > button (products__btn  data-action="add-to-cart")
// 2. products__control --> button (-/+) p ( data-counter)
// - data-action="minus" , + data-action="plus"

// event.target.dataset. counter, action
window.addEventListener("click", function (event) {
  if (event.target.dataset.action === "add-to-cart") {
    const card = event.target.closest(".products__item");

    const orderBtnWrapper = card.querySelector(".products__btn-wrapper");
    const controlBtnsWrapper = card.querySelector(".products__control");
    const counterOrder = card.querySelector("[data-counter]");

    const cartItemsWrapper = document.querySelector(".cart__items-wrapper");

    const cardInfo = {
      id: card.dataset.id,
      imgSrc: card
        .querySelector(".products__img-wrapper > img")
        .getAttribute("src"),
      title: card.querySelector(".products__title").innerText,
      productName: card.querySelector(".products__product-name").innerText,
      price: card.querySelector(".products__price").innerText,
      weight: card.querySelector(".products__weight").innerText,
      counter: card.querySelector("[data-counter]").innerText,
    };

    const cardItemHTML = `
    <div class="cart__item" data-id="${cardInfo.id}">
    <div class="cart__item-first-column">
      <div class="cart__item-img-wrapper">
        <img src="${cardInfo.imgSrc}" alt="${cardInfo.productName}" />
      </div>
      <div class="cart__item-price">${cardInfo.price}</div>
      <div class="cart__item-weight">${cardInfo.weight}</div>
    </div>
    <div class="cart__item-second-column">
      <div class="cart__item-title-wrapper">
        <h3 class="cart__item-title">${cardInfo.title}</h3>
        <h3 class="cart__item-product-name">${cardInfo.productName}</h3>
      </div>
      <div class="cart__item-order-information">
        <div class="cart__item-count-wrapper">
          <p class="cart__item-count-title">Количество</p>
          <div class="cart__item-count" data-counter>${cardInfo.counter}</div>
        </div>
        <div class="cart__item-total-weight-wrapper">
          <p class="cart__item-total-weight-title">Вес</p>
          <div class="cart__item-total-weight">${cardInfo.weight}</div>
        </div>
        <div class="cart__item-total-price-wrapper">
          <p class="cart__item-total-price-title">Цена</p>
          <div class="cart__item-total-price">${cardInfo.price}</div>
        </div>
      </div>
    </div>

    <button
      class="cart__item-btn-remove"
      type="button"
      data-action="remove-from-cart"
    >
      ×
    </button>
  </div>
    `;

    // check item in cart, avoid duplicate element
    const itemInCart = cartItemsWrapper.querySelector(
      `[data-id="${cardInfo.id}"]`
    ); // return null
    // console.log(itemInCart);

    orderBtnWrapper.style.display = "none";
    controlBtnsWrapper.style.display = "flex";

    // itemInCart -- > return null
    if (!itemInCart) {
      cartItemsWrapper.insertAdjacentHTML("beforeend", cardItemHTML);
      calcTotalPriceAndWeight();
      checkingForProductsInCart();
    }

    // console.log(card);
    // console.log(orderBtnWrapper);
    // console.log(controlBtnsWrapper);
    // console.log(cardInfo);
  }

  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    const card = event.target.closest(".products__item");
    const cardId = card.getAttribute("data-id");
    const orderBtnWrapper = card.querySelector(".products__btn-wrapper");
    const controlBtnsWrapper = card.querySelector(".products__control");
    const counterOrder = card.querySelector("[data-counter]");

    const itemInCart = document.querySelector(
      `.cart__item[data-id="${cardId}"]`
    );
    const counterItemInCart = itemInCart.querySelector("[data-counter]");

    calcTotalPriceAndWeight();
    calcPriceAndWeightItem();
    checkingForProductsInCart();

    console.log(card);
    console.log(cardId);
    console.log(itemInCart);
    console.log(counterItemInCart);

    if (event.target.dataset.action === "plus") {
      counterOrder.innerText = ++counterOrder.innerText;
      counterItemInCart.innerText = counterOrder.innerText;
    }

    if (event.target.dataset.action === "minus") {
      if (parseInt(counterOrder.innerText) > 1) {
        counterOrder.innerText = --counterOrder.innerText;
        counterItemInCart.innerText = counterOrder.innerText;
      } else {
        orderBtnWrapper.style.display = "flex";
        controlBtnsWrapper.style.display = "none";
      }
    }
  }

  if (event.target.dataset.action === "remove-from-cart") {
    const currentItemInCart = event.target.closest(".cart__item");
    const currentItemInCartID = currentItemInCart.getAttribute("data-id");

    const card = document.querySelector(
      `.products__item[data-id="${currentItemInCartID}"]`
    );
    const orderBtnWrapper = card.querySelector(".products__btn-wrapper");
    const controlBtnsWrapper = card.querySelector(".products__control");
    const counterOrder = card.querySelector("[data-counter]");

    currentItemInCart.remove();
    calcTotalPriceAndWeight();
    checkingForProductsInCart();
    orderBtnWrapper.style.display = "flex";
    controlBtnsWrapper.style.display = "none";
    counterOrder.innerText = "1";

    console.log(card);
    console.log("currentItem: " + currentItemInCartID);
    console.log("card: " + card.getAttribute("data-id"));

    // console.log(currentItemInCart.getAttribute("data-id")); // return id
  }
});

function calcTotalPriceAndWeight() {
  const itemsInCart = document.querySelectorAll(".cart__item");
  const totalPriceInCart = document.querySelector(".cart__total-price");
  const totalWeightInCart = document.querySelector(".cart__total-weight");

  // const totalPriceItem = document.querySelector(".cart__item-total-price");
  // const totalWeightItem = document.querySelector(".cart__item-total-weight");

  let totalPrice = 0;
  let totalWeight = 0;

  itemsInCart.forEach(function (item) {
    const amountItem = item.querySelector("[data-counter]").innerText;
    const priceItem = item.querySelector(".cart__item-price").innerText;
    const weigthItem = item.querySelector(".cart__item-weight").innerText;

    const totalPriceItem = item.querySelector(".cart__item-total-price");
    const totalWeightItem = item.querySelector(".cart__item-total-weight");

    totalPrice += parseInt(amountItem) * parseInt(priceItem);
    totalWeight += parseInt(amountItem) * parseInt(weigthItem);
  });
  totalPriceInCart.innerText = totalPrice;
  totalWeightInCart.innerText = totalWeight;

  // console.log("Total price: " + totalPriceInCart.innerText);
  // console.log("Total weigth: " + totalWeightInCart.innerText);
  // console.log(itemsInCart);
  // console.log(totalPriceInCart);
  // console.log(totalWeightInCart);
}
// calcTotalPrice();

function calcPriceAndWeightItem() {
  const itemsInCart = document.querySelectorAll(".cart__item");

  itemsInCart.forEach(function (item) {
    const amountItem = item.querySelector("[data-counter]").innerText;
    const priceItem = item.querySelector(".cart__item-price").innerText;
    const weigthItem = item.querySelector(".cart__item-weight").innerText;

    const totalPriceItem = item.querySelector(".cart__item-total-price");
    const totalWeightItem = item.querySelector(".cart__item-total-weight");

    let totalPrice = 0;
    let totalWeight = 0;

    totalPrice += parseInt(amountItem) * parseInt(priceItem);
    totalWeight += parseInt(amountItem) * parseInt(weigthItem);

    totalPriceItem.innerText = totalPrice;
    totalWeightItem.innerText = totalWeight;

    console.log("Total price item: " + totalPriceItem.innerText);
    console.log("Total price weight: " + totalWeightItem.innerText);
  });
}

function checkingForProductsInCart() {
  const cartItems = document.querySelectorAll(".cart__item");
  const cartStatusFull = document.querySelector(".cart__cart-status--full");
  const cartStatusEmpty = document.querySelector(".cart__cart-status--empty");
  const cartCounterProductsBtn = document.querySelector(
    ".cart-menu__counter-products"
  );

  let counterInCart = 0;

  cartItems.forEach(function (item) {
    const itemCount = item.querySelector("[data-counter]").innerText;
    counterInCart += parseInt(itemCount);
    console.log(item);
    console.log(itemCount);
    console.log(counterInCart);
  });
  cartCounterProductsBtn.innerText = counterInCart;
  if (cartItems.length > 0) {
    cartStatusFull.hidden = false;
    cartStatusEmpty.hidden = true;
    // cartCounterProductsBtn.innerText = cartItems.length;
  } else {
    cartStatusFull.hidden = true;
    cartStatusEmpty.hidden = false;
    cartCounterProductsBtn.innerText = "";
  }

  // console.log(cartItems);
  // console.log(cartItems.length);
}

//_____________________________________________________________
// const firstCard = document.querySelector(".products__item");
// const priceFirstCard = firstCard.querySelector(".products__price").innerText;

// console.log(firstCard);
// console.log(priceFirstCard)
// console.log(parseInt(priceFirstCard));

// function cartStatus(){
//   const
// }
