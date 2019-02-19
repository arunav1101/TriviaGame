const questions = [{
        q: 'With which sport is Michael Jordan associated?',
        ans1: 'Hockey',
        ans2: 'Soccer',
        ans3: 'Basketball',
        ans4: 'Baseball',
        correctanswer: 'Basketball',
    },

    {
        q: 'Which record label did Michael Jackson first record on?',
        ans1: 'Wotown',
        ans2: 'Motown',
        ans3: 'Gotown',
        ans4: 'Botown',
        correctanswer: 'Motown',
    },
    {
        q: 'What does the N stand for in NATO?',
        ans1: 'Native',
        ans2: 'North',
        ans3: 'National',
        ans4: 'Neigbor',
        correctanswer: 'North',
    },
    {
        q: 'Who played Rachel Green in Friends?',
        ans1: 'Jennifer Aniston',
        ans2: 'Jennifer Piston',
        ans3: 'Rachal Aniston',
        ans4: 'Jennifer lopez',
        correctanswer: 'Jennifer Aniston',
    },
    {
        q: 'In LCD, what does the C stand for?',
        ans1: 'Clear',
        ans2: 'Color',
        ans3: 'Camera',
        ans4: 'Crystal',
        correctanswer: 'Crystal',
    },
    {
        q: 'In which country did Marilyn Monroe die?',
        ans1: 'United States',
        ans2: 'United Kingdom',
        ans3: 'Canada',
        ans4: 'Mexico',
        correctanswer: 'United States',
    },
    {
        q: 'What is the only rock regularly eaten by humans?',
        ans1: 'Salt',
        ans2: 'Sugar',
        ans3: 'Pepper',
        ans4: 'Gravel',
        correctanswer: 'Salt',
    },
    {
        q: 'What do you get if you cross a goat with a sheep?',
        ans1: 'Geep',
        ans2: 'Sugar',
        ans3: 'Pepper',
        ans4: 'Gravel',
        correctanswer: 'Geep',
    },
    {
        q: 'What is America’s WalMart trading name in the UK?',
        ans1: 'Asda',
        ans2: 'Walmart',
        ans3: 'Best Price',
        ans4: 'Gravel',
        correctanswer: 'Asda',
    },
    {
        q: 'Emerald is the birthstone for which month?',
        ans1: 'May',
        ans2: 'June',
        ans3: 'April',
        ans4: 'July',
        correctanswer: 'May',
    },
    {
        q: 'What is the largest fresh water lake in North America?',
        ans1: 'Lake Superior',
        ans2: 'Lake Crescent',
        ans3: 'Lake Trillion',
        ans4: 'Lake ellior',
        correctanswer: 'Lake Superior',
    },
    validateAnswer
]

var total = 5,
    wins = 0;
    let randomNum;

function resetQScreen() {
    $('.myquestion').remove();
    $('.options').remove();
}

function questionScreenSetUp(i) {
    console.log(i);
    $("#screenquestion")
        .append(`<div class = myquestion><h1>${questions[i].q}</h1></div>`);
    $(".mybuttons").append(`<div button class = options id ="ans1"><h4>` + questions[i].ans1 + `</h4></button></div>`)
    $(".mybuttons").append(`<div button class = options id ="ans2"><h4>` + questions[i].ans2 + `</h4></button></div>`)
    $(".mybuttons").append(`<div button class = options id ="ans3"><h4>` + questions[i].ans3 + `</h4></button></div>`)
    $(".mybuttons").append(`<div button class = options id ="ans4"><h4>` + questions[i].ans4 + `</h4></button></div>`)
    console.log('correct answer', questions[i].correctanswer);
}

//   self_player_value = $(this).attr("total-value");

function randomnumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min))
}
function winner(answerId){
wins++;
$`.${answerId}`.append(`<div><img src="assets/images/qcorrectbig.png"></img></div>`)

}
function validateAnswer(userAnswer, i, answerId) {
    console.log('userAnswer', userAnswer, 'Actual', questions[i].correctanswer,'qselected',i);
   console.log('wins',wins);
     userAnswer === questions[i].correctanswer ? winner(answerId) : void 0;
     
}

$(document).ready(function () {
    randomNum= randomnumber(1, 5);
    questionScreenSetUp(randomNum);
    $(document.body).on("click", ".mybuttons .options", function () {
        if(total<1){
            alert(`Your Score ${wins} out of 5`);
            return;
        }
        var userGuess = $(this).text();
        var answerId= $(this).attr("id");
        console.log("answerId",answerId);
        validateAnswer(userGuess, randomNum,answerId);
        console.log('total', total, 'wins', wins);
    })


    $('#next').on("click", function () {
        total--;
        randomNum=randomnumber(1, 5);
        resetQScreen();
        questionScreenSetUp(randomNum);
    });

});