"use strict";
/*Concentration features
====================*/

const concentrationBtn = document.getElementById("concentrationBtn");
const backToFullMode = document.getElementById("backToFullMode");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const main = document.querySelector("main");

/*Concentration mode functionality - starts*/
concentrationBtn.onclick = function () {
  header.style.display = "none";
  footer.style.display = "none";
  main.style.margin = "60px auto";
  backToFullMode.style.visibility = "visible";
};

backToFullMode.onclick = function () {
  header.style.display = "block";
  footer.style.display = "block";
  main.style.margin = "0px auto";
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

//Declaring functions to open and close these windows
function openUiWindow(windowName) {
  windowName.style.display = "block";
}
function closeUiWindow(windowName) {
  windowName.style.display = "none";
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

/*.onclick = openUiWindow(settingsWindow);*/

/*ends - hidden windows (rules and settings) functionality*/

// function concetrationSwitcher() {
//   if (concentrationMode == false) {
//   }
// }
/*===================*/

// playBtn.addEventListener("click", function () {}); //answerCommited(userAnswer.value)
// function answerCommited() {
//   /*if (answerStr == "100") alert("guci");
//   else alert("soso");*/
//   alert(userAnswer.value);
// }
