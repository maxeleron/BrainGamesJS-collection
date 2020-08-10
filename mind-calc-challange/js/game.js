"use strict";

//Getting game buttons
const playBtn = document.getElementById("playBtn");
const commitBtn = document.getElementById("commitBtn");
const nextBtn = document.getElementById("nextBtn");

//Attaching click events on game buttons
playBtn.onclick = startGame;
nextBtn.onclick = nextQuestion;
commitBtn.onclick = commitAnswer;
