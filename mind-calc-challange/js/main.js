"use strict";
/*Concentration features
====================*/

let concentrationBtn = document.getElementById("concentrationBtn");
let backToFullMode = document.getElementById("backToFullMode");
let header = document.getElementById("header");
let footer = document.getElementById("footer");

let concentrationMode = function () {
  header.style.display = "none";
  footer.style.display = "none";
  document.getElementById("main").style.margin = "40px auto";
  backToFullMode.style.visibility = "visible";
};

backToFullMode.addEventListener("click", function () {
  concentrationMode = false;
  header.style.display = "block";
  footer.style.display = "block";
  document.getElementById("main").style.margin = "0px auto";
  backToFullMode.style.visibility = "hidden";
});
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
