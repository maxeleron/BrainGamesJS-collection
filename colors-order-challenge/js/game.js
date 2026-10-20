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

// Getting Game Buttons
const playBtn = document.getElementById("playBtn");
const changeSettingsBtn = document.getElementById("changeSettingsBtn");
const rememberedBtn = document.getElementById("rememberedBtn");
const commitBtn = document.getElementById("commitBtn");

const gameRules = document.getElementById("gameRules");
const initialGameRulesHtml = gameRules.innerHTML;

let gameTilesArr;

/* DOM elements */
const playground = document.getElementById("playground");
const quickSettings = document.getElementById("quickSettings");
const appShellElements = document.querySelectorAll(
  "header.appElement, main.appElement, footer.appElement"
);

playground.addEventListener("wheel", (event) => {
  if (!playground.classList.contains("display-vertical") || event.deltaY === 0 || event.ctrlKey) return;

  event.preventDefault();
  playground.scrollLeft += event.deltaY;
}, { passive: false });

const playBtnHandleFunc = () => {
  switch (playBtn.innerText) {
    case "Play":
    case "Play Again": {
      closeCustomSizeEditor();
      // Clean up previous game (sortable instance + tiles)
      if (gameTilesArr) {
        gameTilesArr.disableSortable();
      }
      playground.innerHTML = "";
      playground.className = "display-" + settingsObject.tileDisplay;
      appShellElements.forEach((element) => {
        element.classList.toggle("expanded-layout", settingsObject.tileDisplay === "vertical");
      });

      gameTilesArr = new GameTilesArr(
        settingsObject.tilesAmount,
        settingsObject.tileSize,
        { width: settingsObject.customWidth, height: settingsObject.customHeight }
      );
      gameTilesArr.display(playground);

      playBtn.innerText = "I Remembered";
      quickSettings.style.display = "none";
      changeSettingsBtn.style.display = "none";
      gameRules.innerText = "Remember order of colors below:";

      break;
    }

    case "I Remembered": {
      gameRules.innerText = "Restore order of colors below:";

      // Shuffle array, re-render in new order, then enable drag & drop
      gameTilesArr.shuffle();
      playground.innerHTML = "";
      gameTilesArr.display(playground);
      gameTilesArr.enableSortable(playground);

      playBtn.innerText = "Commit Answer";
      quickSettings.style.display = "none";

      window.scrollTo(0, 0);

      break;
    }

    case "Commit Answer": {
      gameTilesArr.disableSortable();
      checkAnswers(playground);

      playBtn.innerText = "Play Again";
      quickSettings.style.display = "none";
      changeSettingsBtn.style.display = "inline-flex";
      break;
    }

    default: {
      throw Error("unexpected button");
    }
  }
};

playBtn.addEventListener("click", playBtnHandleFunc);

changeSettingsBtn.addEventListener("click", () => {
  if (gameTilesArr) {
    gameTilesArr.disableSortable();
    gameTilesArr = null;
  }
  playground.innerHTML = "";
  appShellElements.forEach((element) => {
    element.classList.remove("expanded-layout");
  });
  quickSettings.style.display = "";
  changeSettingsBtn.style.display = "none";
  playBtn.innerText = "Play";
  gameRules.innerHTML = initialGameRulesHtml;
});
