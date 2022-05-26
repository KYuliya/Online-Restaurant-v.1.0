const shopSlogan = document.querySelectorAll(".shop-slogan__content > div");
const btnReverse = document.querySelector(".shop-slogan__btn-reverse");
const btnAnimationControl = document.querySelector(
  ".shop-slogan__btn-animation-control"
);

const animation = document.querySelectorAll(".animation");

btnReverse.addEventListener("click", function (event) {
  btnReverse.classList.toggle("active");
  // btnReverse.classList.add("active");
  if (btnReverse.classList.contains("active")) {
    console.log("active");
    createGridRightToLeft();
  } else {
    console.log("inactive");
    createGridLeftToRight();
  }
});

btnAnimationControl.addEventListener("click", function () {
  btnAnimationControl.classList.toggle("active");
  if (btnAnimationControl.classList.contains("active")) {
    for (letterItem of shopSlogan) {
      letterItem.style.animationPlayState = "paused";
      btnAnimationControl.innerText = "Запустить \n анимацию"
    }
    for(itemImg of animation){
      itemImg.style.animationPlayState = "paused";
    }
    console.log("paused");
  } else {
    for (letterItem of shopSlogan) {
      letterItem.style.animationPlayState = "running";
      btnAnimationControl.innerText = "Остановить\n анимацию"
    }
    for(itemImg of animation){
      itemImg.style.animationPlayState = "running";
    }
    console.log("running");
  }
});

function createGridLeftToRight() {
  let columnRow = 0;
  for (itemLetter of shopSlogan) {
    columnRow++;
    itemLetter.style.gridArea = `${columnRow}/${columnRow}`;
    // console.log(itemLetter.textContent + " :" + columnRow);
  }
}

function createGridRightToLeft() {
  let gridRow = 0;
  let gridColumn = 16;
  for (itemLetter of shopSlogan) {
    gridRow++;
    gridColumn--;
    itemLetter.style.gridArea = `${gridRow}/${gridColumn}`; // console.log(itemLetter.textContent + "--> row:" + gridRow + ", column: " + gridColumn);
  }
}

function createGrid() {
  let gridRow = 0;
  let gridColumn = 8;
  for (itemLetter of shopSlogan) {
    gridRow++;
    itemLetter.style.gridArea = `${gridRow}/${gridColumn}`; // console.log(itemLetter.textContent + "--> row:" + gridRow + ", column: " + gridColumn);
  }
}

function gridAanimation() {
  let columnRow = 1;
  let interval = 1000;
  for (letter of shopSlogan) {
    letter.animate(
      [{ color: "green" }, { color: "red" }, { color: "blue" }],
      {
        duration: 3000 + interval,
        // iterations: Infinity,
        iterations: 2,
      }
    );
    columnRow++;
    interval += 100;
    console.log(letter.textContent + " - interval: " + interval);
  }
  // gridArea: columnRow + "/" + columnRow
}

// setTimeout(createGridLeftToRight, 6000);
createGrid();
// gridAanimation();



