"use strict";

//Getting Game Buttons
const playBtn = document.getElementById("playBtn");
const rememberedBtn = document.getElementById("rememberedBtn");
const commitBtn = document.getElementById("commitBtn");

playBtn.addEventListener("click", () => {
  generateTiles();
  showTiles(gameTilesArr);
  //hiding playBtn and displaying remembered Btn
  playBtn.style.display = "none";
  rememberedBtn.style.display = "block";

  //hiding game rules
  document.getElementById("gameRules").style.display = "none";
});

rememberedBtn.addEventListener("click", () => {
  answersAcceptInputs();
  /*shuffleTiles();
  showTiles(gameTilesArr);*/

  //hiding rememberedBtn and displaying commit answerBtn
  rememberedBtn.style.display = "none";
  commitBtn.style.display = "block";
});
