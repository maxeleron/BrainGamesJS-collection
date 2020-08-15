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
  "#FF0000" /*Red */,
  "#FF6666" /*Light red */,
  "#993333",
  "#CC3366",
  "#FF0099",
  "#CC6699",
  "#FF33FF" /*Pink */,
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

/*User preferences */
/*let userTileAmount = null;
let userTileSize = null;*/
let userTileAmount = 5; //just for tests
let userTileSize = "small"; //just for tests

/*Game elements */
let userColorsArr = [];
let gameTilesArr = [];

/*DOM elements */
const playground = document.getElementById("playground");

/*Function that generates array with chosen colors */
function generateGameCollorsArr() {
  playground.innerHTML = "";

  userColorsArr = COLORS_ARR;
  for (let i = COLORS_ARR.length; i > userTileAmount; i--) {
    delete userColorsArr[i];
  }
}

function generateTiles() {
  for (let i = 0; i < userTileAmount; i++) {
    gameTilesArr[i] = document.createElement("div");
    playground.append(gameTilesArr[i]);
    gameTilesArr[i].id = i;
    tileStylesSetter(gameTilesArr[i], userTileSize, userColorsArr[i]);
  }
}

generateGameCollorsArr();

generateTiles();
