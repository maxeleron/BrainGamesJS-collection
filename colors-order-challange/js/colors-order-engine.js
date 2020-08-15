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
  "#FFFF66" /*Light yellow*/,
  "#FFFF00",
  "#CCCC00",
  "red",
  "blue",
  "green",
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
