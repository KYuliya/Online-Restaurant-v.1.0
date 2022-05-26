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
        .querySelector(".products__information > img")
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

    // console.log(card);
    // console.log(orderBtnWrapper);
    // console.log(controlBtnsWrapper);
    // console.log(cardInfo);

    if (event.target.dataset.action === "add-to-cart") {
      orderBtnWrapper.style.display = "none";
      controlBtnsWrapper.style.display = "flex";
      // itemInCart -- > return null
      if (!itemInCart) {
        cartItemsWrapper.insertAdjacentHTML("beforeend", cardItemHTML);
        calcTotalPriceAndWeight();
      }
    }
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

    console.log(card);
    console.log(cardId);
    console.log(itemInCart);
    console.log(counterItemInCart);

    if (event.target.dataset.action === "plus") {
      counterOrder.innerText = ++counterOrder.innerText;
      counterItemInCart.innerText = counterOrder.innerText;
      calcTotalPriceAndWeight();
    }

    if (event.target.dataset.action === "minus") {
      if (parseInt(counterOrder.innerText) > 1) {
        counterOrder.innerText = --counterOrder.innerText;
        counterItemInCart.innerText = counterOrder.innerText;
        calcTotalPriceAndWeight();
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
    orderBtnWrapper.style.display = "flex";
    controlBtnsWrapper.style.display = "none";
    counterOrder.innerText = "1";
    calcTotalPriceAndWeight();

    console.log(card);
    console.log("currentItem: " + currentItemInCartID);
    console.log("card: " + card.getAttribute("data-id"));

    // console.log(currentItemInCart.getAttribute("data-id")); // return id
  }
  
  //  Version 2
  //   if (event.target.dataset.action === "remove-from-cart") {
  //   const  currentItemInCart = event.target.closest(".cart__item");
  //     const card = document.querySelectorAll(".products__item");
  //     for (cardItem of card) {
  //       //   console.log(cardItem.getAttribute("data-id"));
  //       if (
  //         parseInt(currentItemInCart.getAttribute("data-id")) ===
  //         parseInt(cardItem.getAttribute("data-id"))
  //       ) {
  //         currentItemInCart.remove();

  //         orderBtnWrapper = cardItem.querySelector(".products__btn-wrapper");
  //         controlBtnsWrapper = cardItem.querySelector(".products__control");
  //         const counterOrder = cardItem.querySelector("[data-counter]");

  //         orderBtnWrapper.style.display = "flex";
  //         controlBtnsWrapper.style.display = "none";
  //         counterOrder.innerText = "1";

  //         console.log("True");
  //         console.log(
  //           "currentItem: " + currentItemInCart.getAttribute("data-id")
  //         );
  //         console.log("card: " + cardItem.getAttribute("data-id"));
  //       }
  //     }

  //     console.log(card);
  //     console.log(currentItemInCart);

  //     // console.log(currentItemInCart.getAttribute("data-id")); // return id
  //   }

});

function calcTotalPriceAndWeight() {
  const itemsInCart = document.querySelectorAll(".cart__item");
  let totalPriceItem = document.querySelector(".cart__total-price");
  const totalWeightItem = document.querySelector(".cart__total-weight");

  let totalPrice = 0;
  let totalweight = 0;

  itemsInCart.forEach(function (item) {
    const amountItem = item.querySelector("[data-counter]").innerText;
    const priceItem = item.querySelector(".cart__item-price").innerText;
    const weigthItem = item.querySelector(".cart__item-weight").innerText;

    totalPrice += parseInt(amountItem) * parseInt(priceItem);
    totalweight += parseInt(amountItem) * parseInt(weigthItem);
  });
  totalPriceItem.innerText = totalPrice;
  totalWeightItem.innerText = totalweight;

  console.log("Total price: " + totalPriceItem.innerText);
  console.log("Total weigth: " + totalWeightItem.innerText);
  console.log(itemsInCart);
  console.log(totalPriceItem);
  console.log(totalWeightItem);
}
// calcTotalPrice();

//_____________________________________________________________
// const firstCard = document.querySelector(".products__item");
// const priceFirstCard = firstCard.querySelector(".products__price").innerText;

// console.log(firstCard);
// console.log(priceFirstCard)
// console.log(parseInt(priceFirstCard));



