"use strict";

const drawRectangle = (startX, startY, endX, endY) => {
  let temp = document.createElement("div");

  temp.classList.add("drawedRectacngle");

  temp.style.height = Math.abs(endY - startY) + "px";
  temp.style.width = Math.abs(endX - startX) + "px";

  console.log("h:", temp.style.height, "w:", temp.style.width);

  temp.style.top = Math.min(startY, endY) + "px";
  temp.style.left = Math.min(startX, endX) + "px";
  playground.appendChild(temp);

  //console.log(`Sy: ${startY}  and  Sx: ${startY}`);
};

//Getting Game Buttons
const playBtn = document.getElementById("playBtn");

const gameRules = document.getElementById("gameRules");

let gameTilesArr;

/*DOM elements */
const playground = document.getElementById("playground");
playground.style.position = "relative";

const playBtnHandleFunc = () => {
  playground.innerHTML = "";
  playground.style.height = "400px";
  playground.style.width = "100%";
  playground.style.background = "white";
  playBtn.innerText = "I Remembered";

  gameRules.innerText = "";

  // switch (playBtn.innerText) {
  //   case "Play":
  //   case "Play Again": {
  //     playground.innerHTML = "";
  //     playground.style.height = "400px";
  //     playground.style.width = "100%";
  //     playground.style.background = "white";
  //     playBtn.innerText = "I Remembered";

  //     gameRules.innerText = "Remember size & position";
  //     break;
  //   }

  //   case "I Remembered": {
  //     playBtn.innerText = "Commit Answer";

  //     break;
  //   }

  //   case "Commit Answer": {
  //     playBtn.innerText = "Play Again";

  //     break;
  //   }

  //   default: {
  //     throw Error("unexpected button");
  //   }
  // }
};

playBtn.addEventListener("click", playBtnHandleFunc);

let arr = [];
let startDot = null;

playground.addEventListener("mousedown", (event) => {
  console.log(`Sy: ${event.offsetY}  and  Sx: ${event.offsetY}`);
  startDot = { x: event.offsetX, y: event.offsetY };
  console.log(startDot);
});

playground.addEventListener("mousemove", (event) => {
  // let temp = document.createElement("div");
  // temp.classList.add("drawedRectacngle");
  // temp.style.height = event.offsetY - startDot.y + "px";
  // temp.style.width = event.offsetX - startDot.x + "px";
  // temp.style.top = startDot.y + "px";
  // temp.style.left = startDot.x + "px";
});

const isNotTrusted = (y1, y2, x1, x2) => {
  return Math.abs(y1 - y2) < 20 || Math.abs(x1 - x2) < 20;
};

playground.addEventListener("mouseup", (event) => {
  if (isNotTrusted(event.offsetY, startDot.y, event.offsetX, startDot.x))
    return;

  drawRectangle(startDot.x, startDot.y, event.offsetX, event.offsetY);
});

playBtn.click();
