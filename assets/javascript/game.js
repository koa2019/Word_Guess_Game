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
    var letter = "";

    //variables to hold references to the places in the HTML where we want to display things.
    //HTML will append to these parent selctors

    var startGameText = document.getElementById("startGame");

    var guessWordText = document.getElementById("word");

    var numWinsText = document.getElementById("winTotal");

    var remainingGuessText = document.getElementById("guessLeft");

    var wrongLetterText = document.getElementById("wrongLetter");

    guessThisWord = pickRandomWord();
    var dashTemp = [];
    var dashTempString;

    function displayUnderscores() {
        //loop for each character in guessThisWord
        for (var i = 0; i < guessThisWord.length; i++) {
            dashTemp.push('-');
            dashTempString = dashTemp.join('')
            guessWordText.textContent = dashTempString;
        }
    }
    // function runs whenever user presses a key
    document.onkeyup = function startGame(event) {

        userInput = event.key;    // Determines which key was pressed.
        userInput = upperCase();

        console.log("guessWord in keyup function: " + guessThisWord);
        console.log("UserInput.toUpperCase: " + userInput);

        storeCorrectLetters();

        if (remainingGuess !== 0 && remainingGuess <= 10) {

            if (guessThisWord.indexOf(userInput) === -1) {

                wrongGuess();
            }
            else if (guessThisWord.includes(userInput)) {  //checks userInput is in guessThisWord

                for (var i = 0; i < guessThisWord.length; i++) {  //finding the index num of the correct userInput
                    var found = guessThisWord.indexOf(userInput);
                    var found2 = guessThisWord.lastIndexOf(userInput);
                }
                dashTemp.splice(found, 1, userInput); //replace correct userInput into _ _ _ array
                dashTemp.splice(found2, 1, userInput); //replace correct userInput into _ _ _ array
                guessWordText.textContent = dashTemp.join('');

            }

            if (guessThisWord.toString() === dashTemp.toString()) {   //if displayWord equals guessThisWord

                winner();
                // winnerReset();
            }
        }
        else {
            pickRandomWord();
            restartGame();  //call function to reset ids #word #guessLeft #wrongLetter 
        }

    }


    //pick random word from array
    function pickRandomWord() {

        guessThisWord = wordArray[Math.floor(Math.random() * wordArray.length)];    // Randomly picks a random word from wordArray

        console.log("computer picked: " + guessThisWord);

        guessThisWord = Array.from(guessThisWord);  //changed string to array
        console.log(guessThisWord);

        return guessThisWord;
    }

    function storeCorrectLetters() {

        correctGuessArr += userInput;    //then add userInput to correctGuessArray

        console.log("inside guessThisWord.indexOf(userInput) " + correctGuessArr);
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
        remainingGuess = 10;
        remainingGuessText.textContent = remainingGuess;
        displayWord = "";
        guessWordText.textContent = displayWord;
        correctGuessArr = [];
        wrongLetterString = "";
        wrongLetterText.textContent = wrongLetterString;
        displayUnderscores();
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