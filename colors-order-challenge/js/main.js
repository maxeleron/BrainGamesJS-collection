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
      const { tilesAmount, tileSize = "medium", tileDisplay, showGameRules } = JSON.parse(
        localStorage.getItem("settingsObject")
      );
      this.tilesAmount = tilesAmount;
      this.tileSize = tileSize;
      this.tileDisplay = tileDisplay || "horizontal";
      this.showGameRules = showGameRules;
    }
  }
  save() {
    localStorage.setItem("settingsObject", JSON.stringify(this));
  }
  restoreDefaults() {
    this.tilesAmount = 8;
    this.tileSize = "medium";
    this.tileDisplay = "horizontal";
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
const tilesSizeInputs = document.querySelectorAll('input[name="tileSize"]');
const tilesDisplayInputs = document.querySelectorAll('input[name="tileDisplay"]');
const gameRulesToggle = document.getElementById("gameRulesToggle");
const saveSettingsBtn = document.getElementById("saveLocalSettings");
const restoreSettingsBtn = document.getElementById("restoreSettings");

function syncSettingsForm() {
  tilesAmountInput.value = settingsObject.tilesAmount;
  tilesSizeInputs.forEach((input) => {
    input.checked = input.value === settingsObject.tileSize;
  });
  tilesDisplayInputs.forEach((input) => {
    input.checked = input.value === settingsObject.tileDisplay;
  });
  gameRulesToggle.checked = settingsObject.showGameRules;
}

function applyRulesVisibility() {
  if (!gameRulesEl) return;
  gameRulesEl.style.display = settingsObject.showGameRules ? "" : "none";
}

// Setting ui elements up to date with settingsObject
syncSettingsForm();
applyRulesVisibility();

tilesAmountInput.addEventListener("input", () => {
  const tilesAmount = Number(tilesAmountInput.value);
  if (!tilesAmountInput.checkValidity() || !Number.isInteger(tilesAmount) || tilesAmount < 2) return;

  settingsObject.tilesAmount = tilesAmount;
  settingsObject.save();
});

tilesSizeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    settingsObject.tileSize = input.value;
    settingsObject.save();
  });
});

tilesDisplayInputs.forEach((input) => {
  input.addEventListener("change", () => {
    settingsObject.tileDisplay = input.value;
    settingsObject.save();
  });
});

gameRulesToggle.addEventListener("change", () => {
  saveSettingsBtn.style.display = "block";
});

saveSettingsBtn.addEventListener("click", () => {
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

// Footer visibility
const toggleFooterBtn = document.getElementById("toggleFooterBtn");

toggleFooterBtn.addEventListener("click", () => {
  const collapsed = document.body.classList.toggle("footer-collapsed");
  toggleFooterBtn.setAttribute("aria-expanded", String(!collapsed));
  toggleFooterBtn.title = collapsed ? "Expand footer" : "Collapse footer";
});

//Global key events
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.keyCode == 27) closeSettings(); //Esc
  if (event.key === "Enter" || event.keyCode == 13) {
    if (event.target && event.target.closest("#themeToggleBtn, #changeSettingsBtn, #toggleFooterBtn, .segmented-control")) return;
    const playBtn = document.getElementById("playBtn");
    if (playBtn && !isSettingsOpen()) playBtn.click();
  }
});
