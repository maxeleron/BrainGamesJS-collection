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
      const {
        elementsAmount,
        borderSize,
        showTimer,
        timerSec,
        showGameRules,
      } = JSON.parse(localStorage.getItem("settingsObject"));
      this.elementsAmount = elementsAmount;
      this.borderSize = borderSize;
      this.showTimer = showTimer;
      this.timerSec = timerSec;
      this.showGameRules = showGameRules;
    }
  }
  save() {
    localStorage.setItem("settingsObject", JSON.stringify(this));
  }
  restoreDefaults() {
    this.elementsAmount = 5;
    this.borderSize = "medium";
    this.showTimer = true;
    this.timerSec = 5;

    this.showGameRules = true;
    this.save();
  }
}

//Local Settings Object
let settingsObject = new Settings();

//Getting settings ui elements
const settingsBtn = document.getElementById("settingsGear");
const settingsWindowContainer = document.getElementById(
  "settingsWindowContainer"
);
const closeSettingsWindow = document.getElementById("closeSettingsWindow");

settingsBtn.addEventListener("click", () => {
  if (settingsWindowContainer.style.display == "block")
    settingsWindowContainer.style.display = "none";
  else {
    settingsWindowContainer.style.display = "block";
  }
});

closeSettingsWindow.addEventListener("click", () => {
  settingsWindowContainer.style.display = "none";
});

//Settings ui elements
const amountSettings = document.getElementById("amountSettings");
const borderSettingsSelect = document.getElementById("borderSettings");
const delayToggle = document.getElementById("delayToggle");
const timerSettings = document.getElementById("timerSettings");
const gameRulesToggle = document.getElementById("gameRulesToggle");

const saveSettingsBtn = document.getElementById("saveLocalSettings");

// Setting ui elements up to date with settingsObject
amountSettings.value = settingsObject.elementsAmount;
borderSettingsSelect.value = settingsObject.borderSize;
delayToggle.checked = settingsObject.showTimer;
timerSettings.value = settingsObject.timerSec;

gameRulesToggle.checked = settingsObject.showGameRules;

settingsWindowContainer.addEventListener("change", () => {
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
  if (event.code == 27) closeSettingsWindow.click(); //Esc
});
