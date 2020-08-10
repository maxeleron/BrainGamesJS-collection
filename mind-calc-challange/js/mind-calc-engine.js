"use strict";

const playground = document.getElementById("playground");

const userAnswer = document.getElementById("userAnswer");

const progressBar = document.getElementById("progressBar");

let userAnswersArr = [];
let taskList = [];
let currentUserTaskId = 0;
let taskAmount = 10;

function generateTaskList() {
  taskList = [];
  for (let i = 0; i < taskAmount; i++) {
    taskList.push(Math.floor(Math.random() * 100));
  }
}

function startGame() {
  generateTaskList(taskAmount);
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
  for (let i = 0; i < taskAmount; i++) {
    if (userAnswersArr[i] - 3 == taskList[i]) {
      correctAnswersAmount++;
    }
  }
  playground.innerHTML =
    "You earned " + (correctAnswersAmount / taskAmount) * 100 + "%";
  taskList = [];
}

function nextQuestion() {
  if (userAnswer.value == "") {
    return;
  }

  userAnswersArr.push(+userAnswer.value);
  //counting and displaying next question
  currentUserTaskId++;
  playground.innerHTML = taskList[currentUserTaskId];
  userAnswer.value = "";
  userAnswer.focus();

  if (currentUserTaskId == taskAmount - 1) {
    playground.innerHTML = taskList[taskAmount - 1];
    nextBtn.style.display = "none";
    commitBtn.style.display = "inline-block";
  }
}

function commitAnswer() {
  //playground.innerHTML = taskList[0];
  userAnswersArr.push(+userAnswer.value);
  userAnswer.style.visibility = "hidden";
  playBtn.style.display = "inline-block";
  commitBtn.style.display = "none";
  checkAnswer();

  userAnswer.value = "";
  //resetGame();
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
