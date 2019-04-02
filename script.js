const url = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";
var data;
var header = document.querySelector('header');
var counter = 0;
let h2 = document.createElement('h2');

var points = 0;

document.getElementById('startbutton').onclick = getData;

function play(){

    document.getElementById('startbutton').innerText = 'Restart';
    getData();

}

function renderData(quizQuestion) {
    let nextButton = document.createElement('button');
    h2.innerText = quizQuestion[0].question;
    header.appendChild(h2);
    var answers = [];
    answers.push(quizQuestion[0].correct_answer);
    console.log(quizQuestion[0].correct_answer);
    quizQuestion[0].incorrect_answers.forEach((answer) => {
          answers.push(answer);
      });

    answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    let answerArea = document.getElementById('answers');
    var answerButton1 = document.getElementById('answer1');
    answerButton1.innerText = answers[0];
    answerArea.appendChild(answerButton1);
    var answerButton2 = document.getElementById('answer2');
    answerButton2.innerText = answers[1];
    answerArea.appendChild(answerButton2);
    var answerButton3 = document.getElementById('answer3');
    answerButton3.innerText = answers[2];
    answerArea.appendChild(answerButton3);
    var answerButton4 = document.getElementById('answer4');
    answerButton4.innerText = answers[3];
    answerArea.appendChild(answerButton4);

    answerArea.addEventListener('click', function (e) {
          if (e.target.nodeName == 'BUTTON') {
              //alert("something");
              //console.log(e.target.innerText);
              //console.log(quizQuestion[0].correct_answer);

              if (e.target.innerText == (quizQuestion[0].correct_answer)) {
                  alert("correct!");
                  console.log(quizQuestion[0].correct_answer);
                  points++;
                  //h2.innerText = "";
                  getData();
              } else {
                  alert("wrong answer");
                  //h2.innerText = "";
                  getData();
              }
          }
      })
      //             answerArea.innerText = "";
      //             h2.innerText = "";
      //             nextButton.innerHTML = `<button class="nextButton">Next question</button>`;
      //             nextButton.addEventListener('click', getData);
      //             section.appendChild(nextButton);
      //             //if (counter < 5) getData();
      //         } else {
      //             alert("wrong answer");
      //             console.log(e.target.innerText);
      //             console.log(quizQuestion[0].correct_answer);
      //             counter++;
      //             answerArea.innerText = "";
      //             h2.innerText = "";
      //             nextButton.innerHTML = `<button class="nextButton">Next question</button>`;
      //             nextButton.addEventListener('click', getData);
      //             section.appendChild(nextButton);
      //             //if (counter < 5) getData();
      //         }
      //
      //     }
      //
      // });

    //header.removeChild(h2);

}


function getData() {
    h2.innerText = "";

    const xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        console.log("Status: 200");
        data = xhr.response;
        renderData(data.results);
      }
    }
  };
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.send();
}
