"use strict";
/* Settings
==================*/
/*class Settings(){
  constructor(){

  }
  save(){

  }
  restoreDefaults(){

  }
}*/

//Local Settings Object
let settingsObject = JSON.parse(localStorage.getItem("settingsObject")) || {
  tilesAmount: 8,
  tileSize: "medium",
};

function restoreDefaultSettings(settingsObj) {
  settingsObj.tilesAmount = 8;
  settingsObj.tileSize = "medium";
  saveUserSettings();
}

const saveUserSettings = function () {
  localStorage.setItem("settingsObject", JSON.stringify(settingsObject));
};

//Getting settings ui elements
const settingsBtn = document.getElementById("settingsGear");
const settingsWindow = document.getElementById("settingsWindow");
const closeSettingsWindow = document.getElementById("closeSettingsWindow");

settingsBtn.addEventListener("click", () => {
  settingsWindow.style.display = "block";
});

closeSettingsWindow.addEventListener("click", () => {
  settingsWindow.style.display = "none";
});

//Settings ui elements
const tilesAmountInput = document.getElementById("tilesAmount");
const tilesSizeSelect = document.getElementById("tileSize");
const saveSettingsBtn = document.getElementById("saveLocalSettings");

tilesAmountInput.addEventListener("change", () => {
  saveSettingsBtn.style.display = "block";
});
tilesSizeSelect.addEventListener("change", (event) => {
  saveSettingsBtn.style.display = "block";
});
// Setting ui elements up to date with settingsObject
tilesAmountInput.value = settingsObject.tilesAmount;
tilesSizeSelect.value = settingsObject.tileSize;

/*==============
end:Settings*/

//Global key events
window.addEventListener("keydown", (event) => {
  //switch('')

  if (event.keyCode == 27) closeSettingsWindow.click(); //Esc
});
