const tabNavBtn = document.querySelectorAll(".main-content__nav-btn");
const tabNavItem = document.querySelectorAll(".main-content__products");
const mainContentnFood = document.querySelector(".main-content__services");

window.addEventListener("click", function (event) {
  //   console.log(event.target);
  //   console.log(event.target.dataset);

  const tabNavItemFirst = document.querySelector(`[data-tab-item="first"]`);
  const tabNavItemSecond = document.querySelector(`[data-tab-item="second"]`);
  const tabNavItemThird = document.querySelector(`[data-tab-item="third"]`);

  for (btnItem of tabNavBtn) {
    btnItem.classList.remove("active");
  }

  for (navItem of tabNavItem) {
    navItem.hidden = true;
  }

  // event.target.classList.closest("cart-wrapper")
  if (event.target.classList.contains("main-content__nav-btn")) {
    mainContentnFood.hidden = true;

    // for (btnItem of tabNavBtn) {
    //     btnItem.classList.remove("active");
    //   }

    //   for (navItem of tabNavItem) {
    //     navItem.hidden = true;
    //   }

    // data-tab="first" --> .dataset.tab === ""
    if (event.target.dataset.tab === "first") {
      console.log("First BTN");
      event.target.classList.toggle("active");
      tabNavItemFirst.hidden = false;
    }

    if (event.target.dataset.tab === "second") {
      console.log("Second BTN");
      event.target.classList.toggle("active");
      tabNavItemSecond.hidden = false;
    }

    if (event.target.dataset.tab === "third") {
      console.log("Third BTN");
      event.target.classList.toggle("active");
      tabNavItemThird.hidden = false;
    }
  } else {
    mainContentnFood.hidden = false;
  }
});
