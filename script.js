var url;
var data;
var quiz = [];
var header = document.querySelector('header');
var points = 0;
let h2 = document.createElement('h2');
let answerArea = document.getElementById('answers');
var iterator = 0;
var answers = [];
var correctAnswer = "";
var progressBar = document.querySelector('progress');
progressBar.value = 1;




document.getElementById('startbutton').onclick = play;
var text = document.createElement('h3');
text.innerText = 'Welcome! \n Please select the amount of questions you want to answer and the level of difficulty. ' +
    '\n Then press the button to start. You can at any time press the restart button to restart the quiz.';
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



function play(){

    url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${level}&type=multiple`;
    getData(url);
    progressBar.max = amount;
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



function assignButtons(answers) {
    answers.forEach( (answer)=> {
        var answerButton = document.createElement('div');
        answerButton.innerHTML = `<div class="column">
      <button class="answer">${answer}</button>
  </div>`;
        answerArea.appendChild(answerButton);
    });
}

function renderData(quizQuestion) {
    h2.innerHTML = quizQuestion.question;
    header.appendChild(h2);
    correctAnswer = quizQuestion.correct_answer;
    answers.push(correctAnswer);
    console.log(quizQuestion.correct_answer);
    quizQuestion.incorrect_answers.forEach((answer) => {
          answers.push(answer);
      });

    answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    assignButtons(answers);

}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function giveReply(x) {
    var reply = document.createElement('h4');
    if (x == 'y') {
        reply.innerHTML = 'Correct! Good job!';
    } else {
        reply.innerHTML = 'Wrong answer. The correct answer was ' + quiz[iterator].correct_answer;
    }
    answerArea.appendChild(reply);
}

answerArea.addEventListener('click', function (e) {
        if (e.target.nodeName == 'BUTTON') {
            answers = [];

            if (e.target.innerText == decodeHtml(quiz[iterator].correct_answer)){
                console.log("correct");
                e.target.parentNode.classList.toggle('correct');
                e.target.classList.add('correct');
                e.target.parentNode.classList.toggle('anwser');
                points++;
                giveReply('y');
                console.log(points);
                setTimeout(()=> {
                    e.target.classList.toggle('correct');
                    e.target.classList.toggle('anwser');

                }, 1000)

            } else {
                e.target.classList.add('wrong');
                e.target.parentNode.classList.toggle('wrong');
                console.log("wrong");
                giveReply('n');
                setTimeout(()=> {
                    e.target.classList.toggle('wrong');

                }, 1000)
            }

            if (iterator == quiz.length - 1) {
                setTimeout(()=> {
                    answerArea.innerText = "";
                    h2.innerText = "You have made it to the end. Well done! You got " + points +
                        " correct answers out of " + quiz.length + "\n To play again, make your selections and press restart.";
                }, 2700)

            }else  {
                iterator++;
                setTimeout(()=> {
                    answerArea.innerText = "";
                    progressBar.value++;
                    renderData(quiz[iterator]);
                }, 2700)

            }

        }

    });

function resetData() {
    iterator = 0;
    answers = [];
    quiz = [];
    points = 0;
    h2.innerText = "";
    answerArea.innerText = "";
    progressBar.value = 1;
}

//iterator.addEventListener()
//progressBar.addEventListener('change', )


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



