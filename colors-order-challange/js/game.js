"use strict";

const checkAnswers = (field) => {
  const userAnswersArr = field.children;
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

const playBtnHandleFunc = () => {
  switch (playBtn.innerText) {
    case "Play":
    case "Play Again": {
      playground.innerHTML = "";
      /*Game elements */
      gameTilesArr = new GameTilesArr(
        settingsObject.tilesAmount,
        settingsObject.tileSize,
        settingsObject.tileFormat
      );
      gameTilesArr.display(playground);
      //hiding playBtn and displaying remembered Btn
      playBtn.innerText = "I Remembered";

      gameRules.innerText = "Remember order of colors below:";

      break;
    }

    case "I Remembered": {
      gameRules.innerText = "Restore order of colors below:";

      gameTilesArr.enableSortable(playground);
      gameTilesArr.shuffle();
      gameTilesArr.display(playground);
      //hiding rememberedBtn and displaying commit answerBtn
      playBtn.innerText = "Commit Answer";

      window.scrollTo(0, 0);

      break;
    }

    case "Commit Answer": {
      gameTilesArr.disableSortable();
      checkAnswers(playground);

      playBtn.innerText = "Play Again";
      break;
    }

    default: {
      throw Error("unexpected button");
    }
  }
};

playBtn.addEventListener("click", playBtnHandleFunc);
