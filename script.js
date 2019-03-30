const url = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
var data;
var section = document.querySelector('section');

document.getElementById('startbutton').addEventListener('click', getData);


function createAnswerButtons(result) {
  var answers = [];
  answers.push(result.correct_answer);
  result.incorrect_answers.forEach((answer)=>{
    answers.push(answer);
  });
  console.log(answers);

  answers.sort(function (a, b) {
    return 0.5 - Math.random();
  })
  console.log(answers);
}

function renderData(data) {
  let quizQuestion = document.getElementById('h2');
  data.forEach((result)=> {
    quizQuestion.innerText = result.question;
    section.appendChild(quizQuestion);
    createAnswerButtons(result);
  })
}

function getData() {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        console.log("Status: 200");
        data = xhr.response;
        renderData(data.results);
      }
    }
  }
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.send();
}
