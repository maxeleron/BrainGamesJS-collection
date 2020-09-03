"use strict";

//Getting Game Buttons
const playBtn = document.getElementById("playBtn");
const rememberedBtn = document.getElementById("rememberedBtn");
const commitBtn = document.getElementById("commitBtn");

let gameTilesArr;

/*DOM elements */
const playground = document.getElementById("playground");

playBtn.addEventListener("click", () => {
  /*Game elements */
  gameTilesArr = new GameTilesArr(
    settingsObject.tilesAmount,
    settingsObject.tileSize
  );
  //generateTiles();
  gameTilesArr.display(playground);
  //hiding playBtn and displaying remembered Btn
  playBtn.style.display = "none";
  rememberedBtn.style.display = "block";

  //hiding game rules
  document.getElementById("gameRules").style.display = "none";
});

rememberedBtn.addEventListener("click", () => {
  gameTilesArr.enableSortable(playground);
  gameTilesArr.shuffle();
  gameTilesArr.display(playground);
  //hiding rememberedBtn and displaying commit answerBtn
  rememberedBtn.style.display = "none";
  commitBtn.style.display = "block";
});

// playBtn.click();
// rememberedBtn.click();
