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
    }
]

var total,
    totalQuestions,
    imgCheck,
    loss,
    notAnswer,
    wins,
    randomNum,
    number,
    myrandomNumberArray,
    answerId,
    intervalId;

function resetQScreen() {
    $('.myquestion').remove();
    $('.options').remove();
    $('#result-section').remove();
}

function questionScreenSetUp(i) {
    $("#screenquestion")
        .append(`<div class = myquestion><h1>${questions[i].q}</h1></div>`);
    $(".mybuttons")
        .append(`<div button class = options id = "${questions[i].ans1.replace(/\s/g, '')}"><h4>` + questions[i].ans1 + `</h4></button></div>`)
    $(".mybuttons")
        .append(`<div button class = options id = "${questions[i].ans2.replace(/\s/g, '')}"><h4>` + questions[i].ans2 + `</h4></button></div>`)
    $(".mybuttons")
        .append(`<div button class = options id = "${questions[i].ans3.replace(/\s/g, '')}"><h4>` + questions[i].ans3 + `</h4></button></div>`)
    $(".mybuttons")
        .append(`<div button class = options id = "${questions[i].ans4.replace(/\s/g, '')}"><h4>` + questions[i].ans4 + `</h4></button></div>`)
    $("#show-number")
        .html("<h2>" + number + "</h2>");
    run();
}

function randomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min))
}

function winner(answerId) {
    if (number !== 0) {
        wins++;
    }
    if (imgCheck === 0) {
        $(`#${answerId}`).css("background-color", "Green");
        $(`#show-results`).append(`<img id ="result-section" src= assets/images/qcorrectbig.png></img>`)
        imgCheck++;
    }
    displayResults();

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function ignoreDuplicates() {
    do {
        randomNum = randomNumber(1, 5);
    }
    while (myrandomNumberArray.includes(randomNum));
    myrandomNumberArray.push(randomNum);
    return randomNum;
}


function nextQuestion() {
    $('#result-section').attr("src", "");
    if (total < 1) {
        $('#score').empty(); 
        resetQScreen();
        console.log(total);
        $('#final-results').empty();
        $('#final-results').append(`<div>
        <p>
        <h1>Your Correct Answers :${wins}</h1>
        <h1>Your Incorrect Answers : ${loss}</h1>
        <h1>You Missed  : ${notAnswer}</h1>
        </p>
        <h1>Your Score ${wins} out of ${totalQuestions}</h1>
        <button id=restart>Reset</button>
        </div>`)
        return 0;
    }
    imgCheck = 0;
    resetQScreen();
    questionScreenSetUp(ignoreDuplicates());
    run();
}

function looser(answerId) {
    loss++;
    if (imgCheck === 0) {
        $(`#${answerId}`).css("background-color", "Red");
        $(`#show-results`).append(`<img id ="result-section" src= assets/images/qincorrectbig.png></img>`);
        findCorrectAnswerDiv();
        imgCheck++;
    }
    // Displaying the incorrect image for 1 sec
    setTimeout(() => {
        nextQuestion();
    }, 1000);
    displayResults();

}

function displayResults() {
    $('#score').text(`Your Score ${wins} out of ${totalQuestions}`);
}
async function validateAnswer(userAnswer, i, answerId) {
    console.log('total', total);
    total--;
    await userAnswer === questions[i].correctanswer ? winner(answerId) : looser(answerId);
}

function run() {
    clearInterval(intervalId);
    number = 20;
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $("#show-number").html("<h2>" + number + "</h2>");
    if (number === 0) {
        notAnswer++;
        stop();
        findCorrectAnswerDiv();
        total--;
    }
}

function stop() {
    clearTimeout(intervalId);
}

function findCorrectAnswerDiv() {
    let correctAnswerId = questions[myrandomNumberArray.pop()].correctanswer.replace(/\s/g, '');
    document.getElementById(`${correctAnswerId}`).setAttribute("style", "background-color:green")
    setTimeout(function () {
        nextQuestion();
    }, 1000);
}

function preset() {
    total = 5;
    totalQuestions = total;
    imgCheck = 0;
    loss = 0;
    notAnswer = 0;
    wins = 0;
    number = 20;
    myrandomNumberArray = [];
    $('#final-results').empty();
    $('#score').empty();
    randomNum = randomNumber(1, 5);
    console.log('start', randomNum);
    myrandomNumberArray.push(randomNum);
    console.log('first time', myrandomNumberArray[0])
    questionScreenSetUp(randomNum);
}
$(document).ready(function () {
    preset();
    $(document.body).on("click", ".mybuttons .options", function () {
        stop();
        var userGuess = $(this).text();
        answerId = $(this).attr("id");
        validateAnswer(userGuess, randomNum, answerId);
    });

    $(document.body).on("click", "#restart", function () {
        preset();
    });
});