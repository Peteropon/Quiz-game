const url = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
var data;
var quiz = [];
var header = document.querySelector('header');
var counter = 0;
let h2 = document.createElement('h2');
let answerArea = document.getElementById('answers');
var iterator = 0;

var points = 0;

document.getElementById('startbutton').onclick = play;

function play(){
    document.getElementById('startbutton').innerText = 'Restart';
    getData();
    console.log(quiz.length);

}

function getData() {
    h2.innerText = "";

    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log("Status: 200");
                data = xhr.response;
                quiz = data.results;
                console.log(quiz.length);

                renderData(quiz[iterator]);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.send();
}



function assignButtons(answers) {
//    answers.forEach( (answer)=> {
//    });
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
}

function renderData(quizQuestion) {
    //let nextButton = document.createElement('button');
    h2.innerText = quizQuestion.question;
    header.appendChild(h2);
    var answers = [];
    answers.push(quizQuestion.correct_answer);
    console.log(quizQuestion.correct_answer);
    quizQuestion.incorrect_answers.forEach((answer) => {
          answers.push(answer);
      });

    answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    assignButtons(answers);

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

}



    answerArea.addEventListener('click', function (e) {
        if (e.target.nodeName == 'BUTTON') {
            alert("something");
            iterator++;
            renderData(quiz[iterator]);
        }
    });



