$(document).ready(function (){
let turns =
[
    {
        question:"how many ballon d'or does messi have?", 
        choices:["1 ballon d'ors", "5 ballon d'ors", "3 ballon d'ors", "4 ballon d'ors"],
        answer: 1,
        photo: "assets/images/messi-ball.jpg" 
    },

    {
        question:"how many world cups have Brazil won?",
        choices:["7 world cups", "4 world cups", "5 world cups", "3 world cups"],     
        answer: 2,
        photo: "assets/images/brazil.jpg"
    },

    {
        question:"The Juventus' player, Cristiano Ronaldo, played in Real Madrid and what other big team?",
        choices:["Porto", "Manchester United", "Milan", "Barcelona"],  
        answer: 1,
        photo: "assets/images/ronaldo.jpg" 
    }
];
let correctAnswers = 0;
let wrongAnswers = 0;
let timer = 60;
let intervalId;
let userGuess;
let timing = false;
let total = turns.length;
let turn;
let index;
let newArray = [];
let holder = [];

$("#reset").hide();
$("#start").on("click", function ()
{
    $("#start").hide();
    displayQuestion();
    runTime();
    for (let i=0; i<turns.length; i++)
    {
        holder.push(turns[i]);
    }
})

function runTime()
{
    if (!timing)
    {
        intervalId = setInterval(decrement, 1000);
        timing = true;
    }
}

function decrement()
{
    $("#timeLeft").html("<h3>Time remaining: " + timer + "</h3>");
    timer --;
    if (timer===0)
    {
        wrongAnswers ++;
        stop();
        $("#answersDiv").html("<p>Time is up! The correct answer is: " + turn.choices[turn.answer] + "</p>");
        hidePic();
    }

}

function stop()
{
    timing = false;
    clearInterval(intervalId);
}

function displayQuestion()
{
    index = Math.floor(Math.random()*turns.length);
    turn = turns[index];

    $("#questionsDiv").html("<h2> " + turn.question + "</h2>");
    for (let i=0; i<turn.choices.length; i++)
    {
        let userChoice = $("<div>");
        userChoice.addClass("answerChoice");
        userChoice.html(turn.choices[i]);
        userChoice.attr("data-guess-value", i)
        $("#answersDiv").append(userChoice);
    }




$(".answerChoice").on("click", function(){
    userGuess = parseInt($(this).attr("data-guess-value"));
    // let answer = turn.answer;
    // let choicesArray = turn
    if (userGuess === turn.answer)
    {
        stop();
        correctAnswers++;
        userGuess="";
        $("#answersDiv").html("<p>Correct!</p>");
        hidePic();
    }
    else
    {
        stop();
        wrongAnswers++;
        userGuess="";
        $("#answersDiv").html("<p>Wrong! The correct answer is:" + turn.choices[turn.answer] + "</p>");
        hidePic();
    }
})
}

function hidePic (){
    $("#answersDiv").append("<img src= " + turn.photo + ">");
   newArray.push(turn)
   turns.splice(index, 1);

      setTimeout(function()
   {
        $("#answersDiv").empty();
        timer = 60;

        if ((wrongAnswers + correctAnswers) === total)
        {
            $("#questionsDiv").empty();
            $("#questionsDiv").html("<h3>Game Over!</h3>");
            $("#answersDiv").append("<h4> Correct: " + correctAnswers + "</h4>");
            $("#answersDiv").append("<h4> Incorrect: " + wrongAnswers + "</h4>");
            $("#reset").show();
            correctAnswers = 0;
            wrongAnswers = 0;
        }
        else
        {
            runTime();
            displayQuestion();
        }
   }, 3000);
}
$("#reset").on("click", function()
{
    $("#reset").hide();
    $("#answersDiv").empty();
    $("#questionsDiv").empty();
	for(var i = 0; i < holder.length; i++) {
		turns.push(holder[i]);
	}
	runTime();
	displayQuestion();
})


});
