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



// Initialisation by setting up listeners for the selectors and the introductory text.
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


// Puts together the url and calls the next function which sets the game in motion.
// Then it restarts the game whenever the button is pressed.
function play(){
    url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${level}&type=multiple`;
    getData(url);
    progressBar.max = amount;
    document.getElementById('startbutton').innerText = 'Restart';
    resetData();
}


// Sends Http request to the url, creates and array with the question objects
// and calls the renderData func to take care of the data
function getData(url) {
    text.innerText = "";
    const xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                console.log("Status: " + xhr.status);
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


// Receives the array with the answers, loops through them and sets them in buttons
function assignButtons(answers) {
    answers.forEach( (answer)=> {
        var answerButton = document.createElement('div');
        answerButton.innerHTML = `<div class="column">
      <button class="answer">${answer}</button>
  </div>`;
        answerArea.appendChild(answerButton);
    });
}


// Renders the question text and creates an array with all the answers which then forwards to
// the assignButtons func
function renderData(quizQuestion) {
    h2.innerHTML = quizQuestion.question;
    header.appendChild(h2);
    correctAnswer = quizQuestion.correct_answer;
    answers.push(correctAnswer);
    quizQuestion.incorrect_answers.forEach((answer) => {
          answers.push(answer);
      });

    answers.sort(function (a, b) {
          return 0.5 - Math.random();
      });
    assignButtons(answers);

}


// Helper function which decodes the string e.g replace the &quot;
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


// Helper function that composes a response for the user
function giveReply(x) {
    var reply = document.createElement('h4');
    if (x == 'y') {
        reply.innerHTML = 'Correct! Good job!';
    } else {
        reply.innerHTML = 'Wrong answer. The correct answer is ' + quiz[iterator].correct_answer;
    }
    answerArea.appendChild(reply);
}

// Listens for clicks on the buttons
answerArea.addEventListener('click', function (e) {
        if (e.target.nodeName == 'BUTTON') {
            answers = [];

            // Compares the pressed button's text and returns the appropriate answer
            if (e.target.innerText == decodeHtml(quiz[iterator].correct_answer)){
                e.target.parentNode.classList.toggle('correct');
                e.target.classList.add('correct');
                e.target.parentNode.classList.toggle('anwser');
                points++;
                giveReply('y');
                setTimeout(()=> {
                    e.target.classList.toggle('correct');
                    e.target.classList.toggle('anwser');

                }, 1000)

            } else {
                e.target.classList.add('wrong');
                e.target.parentNode.classList.toggle('wrong');
                giveReply('n');
                setTimeout(()=> {
                    e.target.classList.toggle('wrong');

                }, 1000)
            }


            // After a reply is given, it goes to the next question by increasing the iterator and
            // starts the new round. If it is the end of the quiz it presents the result to the player
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

// Deletes the data from the previous round before the new round begins.
function resetData() {
    iterator = 0;
    answers = [];
    quiz = [];
    points = 0;
    h2.innerText = "";
    answerArea.innerText = "";
    progressBar.value = 1;
}







