$(document).ready(function () {

    //declare & initialize variables 

    var remainingGuess = 10;
    var wins = 0;
    var currentWord = "";
    var wordArray = ["APPLE", "GRAPE", "KIWI"];
    var guessThisWord = "";
    var userInput = "";
    var displayWordArr = [];
    var correctGuessArr = [];
    var wrongLetterString = "";
    var displayWord;

    //variables to hold references to the places in the HTML where we want to display things.
    //HTML will append to these parent selctors

    var userGuessText = document.getElementById("characterGuess");

    var currentWordText = document.getElementById("word");

    var numWinsText = document.getElementById("winTotal");

    var remainingGuessText = document.getElementById("guessLeft");

    var wrongLetterText = document.getElementById("wrongLetter");


    guessThisWord = pickRandomWord();

    //pick random word from array
    function pickRandomWord() {

        var randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];    // Randomly picks a random word from wordArray

        console.log("computer picked: " + randomWord);

        //loop for each character in string
        for (var i = 0; i < randomWord.length; i++) {

            var letter = randomWord[i];

        }
        return randomWord;
    }

    function storeCorrectLetters() {

        // if (guessThisWord.indexOf(userInput) !== -1) { //if userInput is in guessThisWord, 

        correctGuessArr += userInput;    //then add userInput to correctGuessArray

        console.log("inside guessThisWord.indexOf(userInput) " + correctGuessArr);
        // currentWordText.textContent = correctGuess;
        //}

    }

    function displayCorrectLetters() {

        storeCorrectLetters();

        //loop for each character in guessThisWord
        for (var i = 0; i < guessThisWord.length; i++) {

            var letter = guessThisWord[i];  //assign that character to letter
            // console.log("randowmWord[i] = " + letter);

            if (correctGuessArr.includes(letter)) {   //if array contains letter, then
                displayWordArr += letter;   //add letter to displayWordArr
                console.log("inside if .include " + displayWordArr)
            }
            else {
                displayWordArr += " _ ";
                console.log("inside else .include " + displayWordArr)
            }
        }

        return displayWordArr;
    }


    // function runs whenever user presses a key
    document.onkeyup = function startGame(event) {

        userInput = event.key;    // Determines which key was pressed.
        userInput = upperCase();

        console.log("guessWord in keyup function: " + guessThisWord);
        console.log("userInput: " + userInput);
        console.log("UserInput After: " + userInput);

        if (remainingGuess !== 0 && remainingGuess <= 10) {

            if (guessThisWord.indexOf(userInput) === -1) {

                wrongGuess();
            }
        }
        if (guessThisWord.includes(userInput)) {  //checks userInput is in guessThisWord

            displayWord = displayCorrectLetters();

            currentWordText.textContent = displayWord;

            if (displayWord === guessThisWord) {   //if displayWord equals guessThisWord

                winner();
                winnerReset();
            }
        }
        restartGame(); //call function to reset ids #word #guessLeft #wrongLetter 
    }



    //function increases number wins, resets currentWord & calls function for new random word
    function winner() {

        wins++;    //increase wins
        numWinsText.textContent = wins;  //update wins on html

    }

    function winnerReset() {
        displayWord = "";
        correctGuessArr = [];
        wrongLetterString = "";
        guessThisWord = pickRandomWord();
    }
    //function changes number of remaining guess & add's wrong letter guessed to cancated string
    function wrongGuess() {

        remainingGuess--;
        remainingGuessText.textContent = remainingGuess;
        wrongLetterString = userInput + ", " + wrongLetterString;
        wrongLetterText.textContent = wrongLetterString;
    }

    //function changes userInput to upperCase
    function upperCase() {

        var userInputUpperCase = userInput.toUpperCase();
        return userInputUpperCase;
    }

    //restarts game
    function restartGame() {
        //remainingGuess = 10;
        // displayWord = "";
        // correctGuessArr = [];
        //wrongLetterString = "";
    }

}) //closes .ready


// if (remainingGuess !== 0 && remainingGuess <= 10) {

//     var wrong = testUserInput();
//     var testDisplay = testDisplayWord();
//     var winner = testIfWinner();

//     if (guessThisWord.indexOf(userInput) === -1) {
//         remainingGuess--;
//         remainingGuessText.textContent = remainingGuess;
//         wrongLetterString = userInput + ", " + wrongLetterString;
//         wrongLetterText.textContent = wrongLetterString;
//     }
//     else if (display === guessThisWord) {   //if display equals guess this word
//         wins++;    //increase wins
//         numWinsText.textContent = wins;  //update wins on html
//         currentWord = "";   //reset id=word
//         pickRandomWord();

//     }
//         if(guessThisWord.includes(userInput)) {
//         display = displayCorrectGuesses();
//         currentWordText.textContent = display;


//     }
// }