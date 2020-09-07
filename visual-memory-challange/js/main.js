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
      const { elementsAmount } = JSON.parse(
        localStorage.getItem("settingsObject")
      );
      this.tilesAmount = tilesAmount;
      this.tileSize = tileSize;
      this.tileFormat = tileFormat;
      this.showGameRules = showGameRules;
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
  if (settingsWindow.style.display == "block")
    settingsWindow.style.display = "none";
  else {
    settingsWindow.style.display = "block";
  }
});

closeSettingsWindow.addEventListener("click", () => {
  settingsWindow.style.display = "none";
});

//Settings ui elements

const amountSettings = document.getElementById("amountSettings");
const borderSettingsSelect = document.getElementById("borderSettings");
const delayToggle = document.getElementById("delayToggle");
const timerSettings = document.getElementById("timerSettings");
const gameRulesToggle = document.getElementById("gameRulesToggle");

const saveSettingsBtn = document.getElementById("saveLocalSettings");

// Setting ui elements up to date with settingsObject
tilesAmountInput.value = settingsObject.tilesAmount;
tilesSizeSelect.value = settingsObject.tileSize;
tilesFormatSelect.value = settingsObject.tileFormat;

gameRulesToggle.checked = settingsObject.showGameRules;

settingsWindow.addEventListener("change", () => {
  saveSettingsBtn.style.display = "block";
});

saveSettingsBtn.addEventListener("click", () => {
  settingsObject.elementsAmount = amountSettings.value;
  settingsObject.borderSize = borderSettingsSelect.value;
  settingsObject.showTimer = delayToggle.checked;
  settingsObject.timerSec = timerSettings.value;

  settingsObject.showGameRules = gameRulesToggle.checked;

  settingsObject.save();
  saveSettingsBtn.style.display = "none";
});
/*==============
end:Settings*/

//Global key events
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 27) closeSettingsWindow.click(); //Esc
});
