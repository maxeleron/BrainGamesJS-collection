"use strict";

/*Class that describes game tile (with color) */
function tileStylesSetter(tileDom, size, color) {
  switch (size) {
    case "small":
      tileDom.classList.add("smallTile");
      break;
    case "medium":
      tileDom.classList.add("mediumTile");
      break;
    case "large":
      tileDom.classList.add("largeTile");
      break;
  }
  tileDom.style.background = color;
}

/*Colors array */
const COLORS_ARR = [
  "#FFFF33" /*Light yellow*/,
  "#CC9900",
  "#CC6600",
  "#CC6633",
  "#FF0000",
  "#FF6666",
  "#993333",
  "#CC3366",
  "#FF0099",
  "#CC6699",
  "#FF33FF",
  "#CC33CC",
  "#9900CC",
  "#9933FF",
  "#6633CC",
  "#6633FF",
  "#6666CC",
  "#3300CC",
  "#0000CC" /*Blue */,
  "#0033FF",
  "#0099FF",
  "#00CCFF",
  "#339999",
  "#66FFFF" /*Ocean blue */,
  "#00FFCC",
  "#00CC99",
  "#33CC66",
  "#00FF66",
  "#66CC66",
  "#00FF00",
  "#339900",
  "#66CC00",
  "#99CC00",
  "#CCFF33",
  "#999900",
  "#999999",
];

/*Function that gets random element from array */
function randomElement(params) {}

/*User preferences */
let userTileAmount = settingsObject.tilesAmount;
let userTileSize = settingsObject.tileSize;
// Setting ui elements up to date with settingsObject
tilesAmountInput.value = userTileAmount;
tilesSizeSelect.value = userTileSize;

/*Game elements */
let userColorsArr = [];
let gameTilesArr = [];
let shuffledTilesArr = [];

/*DOM elements */
const playground = document.getElementById("playground");

function generateTiles() {
  for (let i = 0; i < userTileAmount; i++) {
    gameTilesArr[i] = document.createElement("div");
    gameTilesArr[i].id = i;

    let randomColor = Math.floor(Math.random() * COLORS_ARR.length);
    //dublicate protection cycle
    while (userColorsArr.includes(COLORS_ARR[randomColor])) {
      console.log("hi, I changed");
      randomColor = Math.floor(Math.random() * COLORS_ARR.length);
    }
    userColorsArr.push(COLORS_ARR[randomColor]);

    console.log(randomColor);
    tileStylesSetter(gameTilesArr[i], userTileSize, COLORS_ARR[randomColor]);
  }
}

function shuffleTiles() {
  shuffledTilesArr = gameTilesArr;
  for (let i = shuffledTilesArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledTilesArr[i], shuffledTilesArr[j]] = [
      shuffledTilesArr[j],
      shuffledTilesArr[i],
    ];
  }
}

function showTiles(tilesArr) {
  for (let i = 0; i < tilesArr.length; i++) {
    playground.append(tilesArr[i]);
  }
}

function clickCreateInputHandler() {
  let answerInput = document.createElement("input");
  //document.getElementById(gameTilesArr[i].id).appendChild(answerInput);
  this.appendChild(answerInput);
  answerInput.setAttribute("id", "input" + this.id);
  answerInput.setAttribute("type", "text");

  this.removeEventListener("click", clickCreateInputHandler);
}

function answersAcceptInputs() {
  alert("I am called");
  for (let i = 0; i < gameTilesArr.length; i++) {
    document
      .getElementById(gameTilesArr[i].id) //style.height = "200px";
      .addEventListener("click", clickCreateInputHandler);
    //   console.log("I am trying to append Child " + i);

    // });

    //  console.log("I am trying to append Child " + i);
  }
}
