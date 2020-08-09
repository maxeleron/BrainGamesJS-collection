"use strict";

let playground = document.getElementById("playground");

let playBtn = document.getElementById("playBtn");
let commitBtn = document.getElementById("commitBtn");
let nextBtn = document.getElementById("nextBtn");

let userAnswer = document.getElementById("userAnswer");

let userAnswersArr = [];
let taskList = [];
let currentUserTaskId = 0;

function generateTaskList(taskAmount) {
  taskList = [];
  for (let i = 0; i < taskAmount; i++) {
    taskList.push(Math.floor(Math.random() * 100));
  }
}

function gameStarted() {
  generateTaskList(5);
  //playground.innerHTML = taskList[currentUserTaskId];
  userAnswer.style.visibility = "visible";
  playground.innerHTML = taskList[currentUserTaskId];

  //Display Next button
  playBtn.style.display = "none";
  nextBtn.style.display = "inline-block";

  userAnswer.focus();
}

function checkAnswer() {
  let correctAnswersAmount = 0;
  for (let i = 0; i < 5; i++) {
    if (userAnswersArr[i] - 3 == taskList[i]) {
      correctAnswersAmount++;
    }
  }
  playground.innerHTML = "You earned " + (correctAnswersAmount / 5) * 100 + "%";
  taskList = [];
}

function nextQuestion() {
  userAnswersArr.push(+userAnswer.value);
  //counting and displaying next question
  currentUserTaskId++;
  playground.innerHTML = taskList[currentUserTaskId];
  userAnswer.value = "";

  if (currentUserTaskId == 4) {
    playground.innerHTML = taskList[4];
    nextBtn.style.display = "none";
    commitBtn.style.display = "inline-block";
  }
}

function answerCommited() {
  //playground.innerHTML = taskList[0];
  userAnswer.style.visibility = "hidden";
  playBtn.style.display = "inline-block";
  commitBtn.style.display = "none";
  checkAnswer();

  userAnswer.value = "";
  resetGame();
  playBtn.focus();
}

function resetGame() {
  userAnswersArr = [];
  taskList = [];
  currentUserTaskId = 0;
}

/*function checkAnswer(answerStr) {
  alert(answerStr);
  //   if (+playground.innerHTML + 1 === +str) alert("You are good!");

  //   alert("Shit happens");
}*/
