"use strict";

//Getting Game Buttons
const playBtn = document.getElementById("playBtn");

const gameRules = document.getElementById("gameRules");

let gameTilesArr;

/*DOM elements */
const playground = document.getElementById("playground");

const playBtnHandleFunc = () => {
  switch (playBtn.innerText) {
    case "Play":
    case "Play Again": {
      playground.innerHTML = "";
      playBtn.innerText = "I Remembered";

      break;
    }

    case "I Remembered": {
      playBtn.innerText = "Commit Answer";

      break;
    }

    case "Commit Answer": {
      playBtn.innerText = "Play Again";

      break;
    }

    default: {
      throw Error("unexpected button");
    }
  }
};

playBtn.addEventListener("click", playBtnHandleFunc);
