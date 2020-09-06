"use strict";

const checkAnswers = (field) => {
  const userAnswersArr = field.childNodes;
  let rightAnswers = 0;
  let wrongAnswers = 0;
  for (let i = 0; i < userAnswersArr.length; i++) {
    if (userAnswersArr[i].id == i) {
      userAnswersArr[i].classList.add("rightAnswer");
      rightAnswers++;
    } else {
      userAnswersArr[i].classList.add("wrongAnswer");
      wrongAnswers++;
    }
  }
  console.log("right " + rightAnswers + ", wrong " + wrongAnswers);
};

//Getting Game Buttons
const playBtn = document.getElementById("playBtn");
const rememberedBtn = document.getElementById("rememberedBtn");
const commitBtn = document.getElementById("commitBtn");

const gameRules = document.getElementById("gameRules");

let gameTilesArr;

/*DOM elements */
const playground = document.getElementById("playground");

playBtn.addEventListener("click", () => {
  playground.innerHTML = "";
  /*Game elements */
  gameTilesArr = new GameTilesArr(
    settingsObject.tilesAmount,
    settingsObject.tileSize,
    settingsObject.tileFormat
  );
  //generateTiles();
  gameTilesArr.display(playground);
  //hiding playBtn and displaying remembered Btn
  playBtn.style.display = "none";
  rememberedBtn.style.display = "block";

  gameRules.innerText = "Remember order of colors below:";
});

rememberedBtn.addEventListener("click", () => {
  gameRules.innerText = "Restore order of colors below:";

  gameTilesArr.enableSortable(playground);
  gameTilesArr.shuffle();
  gameTilesArr.display(playground);
  //hiding rememberedBtn and displaying commit answerBtn
  rememberedBtn.style.display = "none";
  commitBtn.style.display = "block";

  window.scrollTo(0, 0);
});

commitBtn.addEventListener("click", () => {
  gameTilesArr.disableSortable();
  checkAnswers(playground);

  commitBtn.style.display = "none";
  playBtn.style.display = "block";
});
