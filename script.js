const url = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";
var data;
var quiz = [];
var header = document.querySelector('header');
var points = 0;
let h2 = document.createElement('h2');
let answerArea = document.getElementById('answers');
var iterator = 0;
var wrongAnswers = [];
var correctAnswer = "";
var answerButton1 = document.getElementById('answer1');
var answerButton2 = document.getElementById('answer2');
var answerButton3 = document.getElementById('answer3');
var answerButton4 = document.getElementById('answer4');


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



function assignButtons(wrongAnswers, correct) {
//    answers.forEach( (answer)=> {
//    });
    answerButton1.innerText = correct;
    answerArea.appendChild(answerButton1);
    answerButton2.innerText = wrongAnswers[0];
    answerArea.appendChild(answerButton2);
    answerButton3.innerText = wrongAnswers[1];
    answerArea.appendChild(answerButton3);
    answerButton4.innerText = wrongAnswers[2];

    answerArea.appendChild(answerButton4);
}

function renderData(quizQuestion) {
    h2.innerText = quizQuestion.question;
    header.appendChild(h2);
    correctAnswer = quizQuestion.correct_answer;
    //wrongAnswers.push(quizQuestion.correct_answer);
    console.log(quizQuestion.correct_answer);
    quizQuestion.incorrect_answers.forEach((answer) => {
          wrongAnswers.push(answer);
      });

    wrongAnswers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    assignButtons(wrongAnswers, correctAnswer);

}



    answerArea.addEventListener('click', function (e) {
        if (e.target.nodeName == 'BUTTON') {
            //alert("something");
            console.log(wrongAnswers);
            wrongAnswers = [];

            if (e.target.innerText == correctAnswer){
                console.log("correct");
                e.target.classList.toggle('correct');
                setTimeout(()=> {
                    e.target.classList.toggle('correct');
                }, 1000)

            } else {
                e.target.classList.toggle('wrong');
                console.log("wrong");
                setTimeout(()=> {
                    e.target.classList.toggle('wrong');
                }, 1000)
            }
            iterator++;

            setTimeout(()=> {
                renderData(quiz[iterator]);
            }, 1000)

        }
    });


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



