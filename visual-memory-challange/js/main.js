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

// Theme (shared across collection)
if (window.BGJSTheme) {
  window.BGJSTheme.initTheme();
}

//Getting settings ui elements
const settingsBtn = document.getElementById("settingsGear");
const settingsWindowContainer = document.getElementById(
  "settingsWindowContainer"
);
const closeSettingsWindow = document.getElementById("closeSettingsWindow");

function isSettingsOpen() {
  var d = settingsWindowContainer.style.display;
  return d === "block" || d === "flex";
}

function openSettings() {
  syncSettingsForm();
  settingsWindowContainer.style.display = "flex";
  document.body.classList.add("modal-open");
  if (window.BGJSTheme) {
    window.BGJSTheme.syncThemeControls();
  }
}

function closeSettings() {
  settingsWindowContainer.style.display = "none";
  document.body.classList.remove("modal-open");
}

settingsBtn.addEventListener("click", () => {
  if (isSettingsOpen()) closeSettings();
  else openSettings();
});

closeSettingsWindow.addEventListener("click", () => {
  closeSettings();
});

// Click backdrop to close
settingsWindowContainer.addEventListener("click", (event) => {
  if (event.target === settingsWindowContainer) closeSettings();
});

//Settings ui elements
const amountSettings = document.getElementById("amountSettings");
const borderSettingsSelect = document.getElementById("borderSettings");
const delayToggle = document.getElementById("delayToggle");
const timerSettings = document.getElementById("timerSettings");
const gameRulesToggle = document.getElementById("gameRulesToggle");
const gameRulesEl = document.getElementById("gameRules");

const saveSettingsBtn = document.getElementById("saveLocalSettings");
const restoreSettingsBtn = document.getElementById("restoreSettings");

function syncSettingsForm() {
  amountSettings.value = settingsObject.elementsAmount;
  borderSettingsSelect.value = settingsObject.borderSize;
  delayToggle.checked = settingsObject.showTimer;
  timerSettings.value = settingsObject.timerSec;
  gameRulesToggle.checked = settingsObject.showGameRules;
}

function applyRulesVisibility() {
  if (!gameRulesEl) return;
  gameRulesEl.style.display = settingsObject.showGameRules ? "" : "none";
}

// Setting ui elements up to date with settingsObject
syncSettingsForm();
applyRulesVisibility();

settingsWindowContainer.addEventListener("change", (event) => {
  if (event.target && event.target.name === "bgjs_theme") return;
  saveSettingsBtn.style.display = "block";
});

saveSettingsBtn.addEventListener("click", () => {
  settingsObject.elementsAmount = amountSettings.value;
  settingsObject.borderSize = borderSettingsSelect.value;
  settingsObject.showTimer = delayToggle.checked;
  settingsObject.timerSec = timerSettings.value;

  settingsObject.showGameRules = gameRulesToggle.checked;

  settingsObject.save();
  applyRulesVisibility();
  saveSettingsBtn.style.display = "none";
});

if (restoreSettingsBtn) {
  restoreSettingsBtn.addEventListener("click", () => {
    settingsObject.restoreDefaults();
    syncSettingsForm();
    applyRulesVisibility();
    saveSettingsBtn.style.display = "none";
  });
}
/*==============
end:Settings*/

//Global key events
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.keyCode == 27) closeSettings(); //Esc
});
