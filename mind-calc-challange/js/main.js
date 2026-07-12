"use strict";
/*Concentration features
====================*/

const concentrationBtn = document.getElementById("concentrationBtn");
const backToFullMode = document.getElementById("backToFullMode");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");

// Theme (shared across collection)
if (window.BGJSTheme) {
  window.BGJSTheme.initTheme();
}

/*Concentration mode functionality - starts*/
concentrationBtn.onclick = function () {
  header.style.display = "none";
  footer.style.display = "none";
  main.style.margin = "60px auto";
  backToFullMode.style.visibility = "visible";
};

backToFullMode.onclick = function (event) {
  if (event) event.preventDefault();
  header.style.display = "";
  footer.style.display = "";
  main.style.margin = "";
  backToFullMode.style.visibility = "hidden";
};
/*ends - concentration mode functionality */

/*Hidden windows (rules and settings) functionality - starts*/
//Getting hidden windows
const rulesWindow = document.getElementById("rulesWindow");
const settingsWindow = document.getElementById("settingsWindow");

//Getting entries to windows
const rulesEntry = document.querySelector("h1");
const settingsEntry = document.getElementById("settingsGear");

//Getting close buttons (for windows)
const closeRulesWindow = document.getElementById("closeRulesWindow");
const closeSettingsWindow = document.getElementById("closeSettingsWindow");

function isUiOpen(windowName) {
  var d = windowName.style.display;
  return d === "block" || d === "flex";
}

function ensureMindCalcSettingsDefaults() {
  var questions = document.getElementById("questionsAmount");
  var colorRule = document.getElementById("colorRuleValue");
  if (questions && (questions.value === "" || questions.value == null)) {
    questions.value = "10";
  }
  if (colorRule && (colorRule.value === "" || colorRule.value == null)) {
    colorRule.value = "2";
  }
}

//Declaring functions to open and close these windows
function openUiWindow(windowName) {
  if (windowName === settingsWindow) {
    ensureMindCalcSettingsDefaults();
  }
  windowName.style.display = "flex";
  document.body.classList.add("modal-open");
  if (windowName === settingsWindow && window.BGJSTheme) {
    window.BGJSTheme.syncThemeControls();
  }
}
function closeUiWindow(windowName) {
  windowName.style.display = "none";
  if (!isUiOpen(rulesWindow) && !isUiOpen(settingsWindow)) {
    document.body.classList.remove("modal-open");
  }
}

//Adding open events on clicks
rulesEntry.onclick = function () {
  openUiWindow(rulesWindow);
};

settingsEntry.onclick = function () {
  openUiWindow(settingsWindow);
};

//Adding open events on clicks
closeRulesWindow.onclick = function () {
  closeUiWindow(rulesWindow);
};

closeSettingsWindow.onclick = function () {
  closeUiWindow(settingsWindow);
};

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    closeUiWindow(rulesWindow);
    closeUiWindow(settingsWindow);
  }
});

/*ends - hidden windows (rules and settings) functionality*/
