const start_btn = document.querySelector(".start-quiz");
const quiz_box = document.querySelector(".quiz-box");
const que_text = quiz_box.querySelector(".que-text");
const options_box = quiz_box.querySelector(".options");
const next_btn = document.querySelector(".next-btn");
const mark_check = '<i class="fa-solid fa-check"></i>';
const mark_wrong = '<i class="fa-solid fa-times"></i>';
const count_que = document.querySelector(".quiz-footer .count-que");
const total_que = document.querySelector(".quiz-footer .total-que");
const result_box = document.querySelector(".result-box");
const total_qns_r = document.querySelector(".total-qns");
const right_ans = document.querySelector(".right-ans");
const wrong_ans = document.querySelector(".wrong-ans");
const percentage = document.querySelector(".percentage");
const try_again = document.querySelector(".try-again");
const exit = document.querySelector(".exit");
const remarks = document.querySelector(".remarks");

start_btn.onclick = () => {
  quiz_box.classList.remove("inactive");
  start_btn.classList.add("inactive");
  reset();
};

total_que.innerText = questions.length;
total_qns_r.innerText = questions.length;

var que_index = 0;
var right_answers = 0;
var wrong_answers = 0;
count_que.innerText = que_index + 1;
showQuestion(que_index);

function showQuestion(q_index) {
  que_text.innerText =
    questions[q_index].num + "." + questions[q_index].question;
  var option_statement = "";
  for (var i = 0; i < questions[q_index].options.length; i++) {
    option_statement += `<div class="option">${questions[q_index].options[i]}</div>`;
  }

  options_box.innerHTML = option_statement;

  var allOptions = options_box.querySelectorAll(".option");
  for (var j = 0; j < allOptions.length; j++) {
    allOptions[j].setAttribute("onclick", "userAnswer(this)");
  }
  next_btn.classList.add("inactive");
}

next_btn.onclick = () => {
  que_index++;

  if (questions.length > que_index) {
    count_que.innerText = que_index + 1;
    showQuestion(que_index);
  } else {
    console.log("over");
    quiz_box.classList.add("inactive");
    result_box.classList.remove("inactive");
    right_ans.innerText = right_answers;
    wrong_ans.innerText = wrong_answers;
    var perc_mark = (right_answers * 100) / questions.length;
    percentage.innerText = perc_mark + "%";
    if (perc_mark == 100) {
      remarks.innerText = "Excellent!";
    } else if (perc_mark >= 80) {
      remarks.innerText = " Very Good!";
    } else if (perc_mark >= 60) {
      remarks.innerText = "Good!";
    } else if (perc_mark >= 40) {
      remarks.innerText = "Fair!";
    } else {
      remarks.innerText = "Poor!";
    }
  }

  if (questions.length - 1 == que_index) {
    next_btn.innerHTML = "End Quiz";
  }
};

function userAnswer(answer) {
  let userAns = answer.innerText;
  let correctAns = questions[que_index].answer;
  var allOptions2 = options_box.querySelectorAll(".option");
  next_btn.classList.remove("inactive");

  //   console.log(userAns, correctAns);
  if (userAns == correctAns) {
    console.log("yes");
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", mark_check);
    right_answers++;
  } else {
    console.log("no");
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", mark_wrong);
    wrong_answers++;

    for (var i = 0; i < allOptions2.length; i++) {
      if (allOptions2[i].innerText == correctAns) {
        allOptions2[i].classList.add("correct");
        allOptions2[i].insertAdjacentHTML("beforeend", mark_check);
      }
    }
  }

  for (var j = 0; j < allOptions2.length; j++) {
    allOptions2[j].classList.add("disable");
  }
}

try_again.onclick = () => {
  quiz_box.classList.remove("inactive");
  result_box.classList.add("inactive");

  reset();
};

exit.onclick = () => {
  start_btn.classList.remove("inactive");
  result_box.classList.add("inactive");
};

function reset() {
  que_index = 0;
  right_answers = 0;
  wrong_answers = 0;
  count_que.innerText = que_index + 1;
  next_btn.innerHTML = "Next Question";
  perc_mark = 0;
  showQuestion(que_index);
}
