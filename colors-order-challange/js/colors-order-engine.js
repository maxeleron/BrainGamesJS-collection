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
/*let userTileAmount = null;
let userTileSize = null;*/
let userTileAmount = 5; //just for tests
let userTileSize = "small"; //just for tests

/*Game elements */
let userColorsArr = [];
let gameTilesArr = [];
let shuffledTilesArr = [];

/*DOM elements */
const playground = document.getElementById("playground");

/*Function that generates array with chosen colors */
function generateGameCollorsArr() {
  playground.innerHTML = "";

  /*for (let i = 0; i < userTileAmount; i++) {
    const element = array[i];
  }*/
  userColorsArr = COLORS_ARR;
  /*for (let i = COLORS_ARR.length; i > userTileAmount; i--) {
    delete userColorsArr[i];
  }*/
}

function generateTiles() {
  for (let i = 0; i < userTileAmount; i++) {
    gameTilesArr[i] = document.createElement("div");
    gameTilesArr[i].id = i;

    let randomColor = Math.floor(Math.random() * userColorsArr.length);
    console.log(randomColor);
    tileStylesSetter(gameTilesArr[i], userTileSize, userColorsArr[randomColor]);

    /*userColorsArr = userColorsArr
      .slice(0, randomColor + 1)
      .concat(userColorsArr.slice(randomColor + 1, userColorsArr.length));*/
  }
}

function draggingInOrder() {}

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

function showTiles1(tilesArr) {
  playground.innerHTML = "";
  for (let i = 0; i < tilesArr.length; i++) {
    playground.append(tilesArr[i]);
  }
}
