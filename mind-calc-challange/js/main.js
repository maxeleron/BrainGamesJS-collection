"use strict";
let concentrationMode = false;

function checkAnswer(str) {
  alert(str);
  //   if (+playground.innerHTML + 1 === +str) alert("You are good!");

  //   alert("Shit happens");
}

let playground = document.getElementById("playground");

let playBtn = document.getElementById("playBtn");
let commitBtn = document.getElementById("commitBtn");
let nextBtn = document.getElementById("nextBtn");

let concentrationBtn = document.getElementById("concentrationBtn");

let header = document.getElementById("header");
let footer = document.getElementById("footer");

let userAnswer = document.getElementById("userAnswer");

playBtn.addEventListener("click", function () {
  //   alert("it works");
  playground.innerHTML = Math.floor(Math.random() * 100);
  userAnswer.style.visibility = "visible";
  playBtn.style.display = "none";
  commitBtn.style.display = "inline-block";
});

userAnswer.addEventListener("change", function () {
  playBtn.innerHTML = "Commit Answer";
});

concentrationBtn.addEventListener("click", function () {
  concentrationMode = true;
  header.style.visibility = "hidden";
  footer.style.visibility = "hidden";
});

// function start
