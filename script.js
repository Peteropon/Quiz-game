var url;
var data;
var quiz = [];
var header = document.querySelector('header');
var points = 0;
let h2 = document.createElement('h2');
let answerArea = document.getElementById('answers');
var iterator = 0;
var wrongAnswers = [];
var answers = [];
var correctAnswer = "";
var answerButton1 = document.getElementById('answer1');
var answerButton2 = document.getElementById('answer2');
var answerButton3 = document.getElementById('answer3');
var answerButton4 = document.getElementById('answer4');


document.getElementById('startbutton').onclick = play;
var text = document.createElement('h3');
text.innerText = 'Please select how many questions you want to answer and the level of difficulty.';
header.appendChild(text);
var questionSelector = document.getElementById('numberOfQuestions');
var amount;
questionSelector.addEventListener('change', function (e) {
    amount = questionSelector[questionSelector.selectedIndex].value;
});

var levelSelector = document.getElementById('level');
var level;
levelSelector.addEventListener('change', function (e) {
    level = levelSelector[levelSelector.selectedIndex].value;
});

//function chooseAmountQuestions() {

//}

function play(){
    //chooseAmountQuestions();

    url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${level}&type=multiple`;
    getData(url);
    document.getElementById('startbutton').innerText = 'Restart';
    resetData();
    console.log(quiz.length);

}

function getData() {

    text.innerText = "";
    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log("Status: 200");
                data = xhr.response;
                quiz = data.results;

                renderData(quiz[iterator]);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.send();
}



function assignButtons(answers, correct) {
//    answers.forEach( (answer)=> {
//    });
    answerButton1.innerText = answers[3];
    answerArea.appendChild(answerButton1);
    answerButton2.innerText = answers[0];
    answerArea.appendChild(answerButton2);
    answerButton3.innerText = answers[1];
    answerArea.appendChild(answerButton3);
    answerButton4.innerText = answers[2];
    answerArea.appendChild(answerButton4);
}

function renderData(quizQuestion) {
    h2.innerText = quizQuestion.question;
    header.appendChild(h2);
    correctAnswer = quizQuestion.correct_answer;
    answers.push(correctAnswer);
    //wrongAnswers.push(quizQuestion.correct_answer);
    console.log(quizQuestion.correct_answer);
    quizQuestion.incorrect_answers.forEach((answer) => {
          wrongAnswers.push(answer);
          answers.push(answer);
      });

    answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    assignButtons(answers, correctAnswer);

}



    answerArea.addEventListener('click', function (e) {
        if (e.target.nodeName == 'BUTTON') {
            //alert("something");
            //console.log(wrongAnswers);
            console.log(answers);
            wrongAnswers = [];
            answers = [];

            if (e.target.innerText == quiz[iterator].correct_answer){
                console.log("correct");
                e.target.classList.toggle('correct');
                points++;
                console.log(points);
                setTimeout(()=> {
                    e.target.classList.toggle('correct');
                }, 1000)

            } else {
                e.target.classList.toggle('wrong');
                //document.querySelector('correct').classList.toggle('correct');
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

function resetData() {
    iterator = 0;
    answers = [];
    quiz = [];
    points = 0;
    h2.innerText = "";

}


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



