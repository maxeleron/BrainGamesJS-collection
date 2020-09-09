"use strict";

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
  //temp.style.height = "100px";
  // temp.style.width = "100px";

  // temp.style.top = event.clientY;
  // temp.style.left = event.clientX;
  // playground.appendChild(temp);
  startDot = { x: event.offsetX, y: event.offsetY };
});

playground.addEventListener("mousemove", (event) => {
  let temp = document.createElement("div");

  temp.style.position = "absolute";
  temp.style.border = "2px solid black";

  temp.style.height = event.offsetY - startDot.y + "px";
  temp.style.width = event.offsetX - startDot.x + "px";

  temp.style.top = startDot.y + "px";
  temp.style.left = startDot.x + "px";
});

playground.addEventListener("mouseup", (event) => {
  if (event.offsetY - startDot.y < 20 || event.offsetX - startDot.x < 20)
    return;

  let temp = document.createElement("div");

  temp.style.position = "absolute";
  temp.style.border = "2px solid black";

  temp.style.height = event.offsetY - startDot.y + "px";
  temp.style.width = event.offsetX - startDot.x + "px";

  temp.style.top = startDot.y + "px";
  temp.style.left = startDot.x + "px";
  playground.appendChild(temp);
  console.log(`Sy: ${event.offsetY}  and  Sx: ${event.offsetY}`);
});

// playground.addEventListener("mouseup", (event) => {
//   console.log(event);
// });

playBtn.click();
