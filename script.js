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
    answerButton.addEventListener('click', function (e) {
      if(answerButton.innerText == answer){
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

    let answerGiven;
    do {
        let counter = 0;

        answerGiven = false;
        let quizQuestion = document.getElementById('h2');
        let question = document.createElement('h2');
        quizQuestion.innerText = "";
      question.innerText = array[counter].question;
        console.log(array[counter].question);
      section.appendChild(question);
      var answers = [];
      answers.push(array[counter].correct_answer);
      console.log(array[counter].correct_answer);
      array[0].incorrect_answers.forEach((answer) => {
          answers.push(answer);
      });

      answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
      let answerArea = document.getElementById('answers');
      answers.forEach((answer) => {
          var answerButton = document.createElement('button');
          answerButton.innerHTML = `<button class="answerButton">'${answer}'</button>`;
          answerArea.appendChild(answerButton);

      });
      answerArea.addEventListener('click', function (e) {
          if (e.target.nodeName == 'BUTTON') {
              if (e.target.innerText == ("'" + array[counter].correct_answer + "'")) {
                  alert("correct!");
                  console.log(array[counter].correct_answer);
              } else {
                  alert("wrong answer");
                  console.log(e.target.innerText);
                  console.log(array[counter].correct_answer);
              }
              answerGiven == true;
              counter++;
              console.log(counter);
          }
      })

        if (counter == array.length) break;
  }while (answerGiven)

    //createAnswerButtons(array[0]);
  //});

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
