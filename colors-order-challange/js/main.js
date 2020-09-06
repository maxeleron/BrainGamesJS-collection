"use strict";
/* Settings
==================*/
class Settings {
  constructor() {
    //if settings don`t ever saved, give settings to a user
    if (!localStorage["settingsObject"]) {
      this.restoreDefaults();
    }
    //if there are local settings implement them to current game
    else {
      let parsedObj = JSON.parse(localStorage.getItem("settingsObject"));
      this.tilesAmount = parsedObj.tilesAmount;
      this.tileSize = parsedObj.tileSize;
    }
  }
  save() {
    localStorage.setItem("settingsObject", JSON.stringify(this));
  }
  restoreDefaults() {
    this.tilesAmount = 8;
    this.tileSize = "medium";
    this.tileFormat = "normal";
    this.showGameRules = true;
    this.save();
  }
}

//Local Settings Object
let settingsObject = new Settings();

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

saveSettingsBtn.addEventListener("click", () => {
  settingsObject.tilesAmount = tilesAmountInput.value;
  settingsObject.tileSize = tilesSizeSelect.value;

  settingsObject.save();
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
