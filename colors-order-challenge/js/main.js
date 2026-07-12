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
      const { tilesAmount, tileSize, tileFormat, showGameRules } = JSON.parse(
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

// Theme (shared across collection)
if (window.BGJSTheme) {
  window.BGJSTheme.initTheme();
}

//Getting settings ui elements
const settingsBtn = document.getElementById("settingsGear");
const settingsWindow = document.getElementById("settingsWindow");
const closeSettingsWindow = document.getElementById("closeSettingsWindow");
const gameRulesEl = document.getElementById("gameRules");

function isSettingsOpen() {
  var d = settingsWindow.style.display;
  return d === "block" || d === "flex";
}

function openSettings() {
  syncSettingsForm();
  settingsWindow.style.display = "flex";
  document.body.classList.add("modal-open");
  if (window.BGJSTheme) {
    window.BGJSTheme.syncThemeControls();
  }
}

function closeSettings() {
  settingsWindow.style.display = "none";
  document.body.classList.remove("modal-open");
}

settingsBtn.addEventListener("click", () => {
  if (isSettingsOpen()) closeSettings();
  else openSettings();
});

closeSettingsWindow.addEventListener("click", () => {
  closeSettings();
});

//Settings ui elements
const tilesAmountInput = document.getElementById("tilesAmount");
const tilesSizeSelect = document.getElementById("tileSize");
const tilesFormatSelect = document.getElementById("tileFormat");
const gameRulesToggle = document.getElementById("gameRulesToggle");
const saveSettingsBtn = document.getElementById("saveLocalSettings");
const restoreSettingsBtn = document.getElementById("restoreSettings");

function syncSettingsForm() {
  tilesAmountInput.value = settingsObject.tilesAmount;
  tilesSizeSelect.value = settingsObject.tileSize;
  tilesFormatSelect.value = settingsObject.tileFormat;
  gameRulesToggle.checked = settingsObject.showGameRules;
}

function applyRulesVisibility() {
  if (!gameRulesEl) return;
  gameRulesEl.style.display = settingsObject.showGameRules ? "" : "none";
}

// Setting ui elements up to date with settingsObject
syncSettingsForm();
applyRulesVisibility();

settingsWindow.addEventListener("change", (event) => {
  // Theme changes are applied instantly via BGJSTheme; still show Save for game settings
  if (event.target && event.target.name === "bgjs_theme") return;
  saveSettingsBtn.style.display = "block";
});

saveSettingsBtn.addEventListener("click", () => {
  settingsObject.tilesAmount = tilesAmountInput.value;
  settingsObject.tileSize = tilesSizeSelect.value;
  settingsObject.tileFormat = tilesFormatSelect.value;
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
  if (event.key === "Enter" || event.keyCode == 13) {
    const playBtn = document.getElementById("playBtn");
    if (playBtn && !isSettingsOpen()) playBtn.click();
  }
});
