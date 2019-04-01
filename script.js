const url = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
var data;
var section = document.querySelector('section');

document.getElementById('startbutton').addEventListener('click', getData);



function assignAnswersToButtons(answers) {
  let answerArea = document.getElementById('answers');
  answers.forEach( (answer) => {
    let answerButton = document.createElement('button');
    answerButton.innerHTML = `<button class="answerButton">'${answer}'</button>`;
    answerArea.appendChild(answerButton);
    answerArea.addEventListener('click', function (e) {
      if(e.target.nodeName == 'button'){
        alert("we have response")
      }
    })
  })
}

function createAnswerButtons(result) {
  var answers = [];
  answers.push(result.correct_answer);
  result.incorrect_answers.forEach((answer)=>{
    answers.push(answer);
  });

  answers.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  console.log(answers);
  return answers;
}
function renderData(array) {

  array.forEach((obj)=> {
    let quizQuestion = document.getElementById('h2');
    quizQuestion.innerText = obj.question;
    section.appendChild(quizQuestion);
    createAnswerButtons(obj);
    assignAnswersToButtons(createAnswerButtons(obj));
  });

  // data.forEach((result)=> {
  //   quizQuestion.innerText = result.question;
  //   section.appendChild(quizQuestion);
  //   createAnswerButtons(result);
  // })
}

function getData() {
  const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        console.log("Status: 200");
        data = xhr.response;
        renderData(data.results);
        //createAnswerButtons(data.results);
      }
    }
  }
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.send();
}
