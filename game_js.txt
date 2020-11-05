$(document).ready(function () {

    //declare & initialize variables 

    var remainingGuess = 10
    var wins = 0
    var guessThisWord
    var wordArray = ["apple", "grape", "kiwi", "mango"]
    var guessThisWordArray = []
    var dashTemp
    var dashTemp = []
    var userInput = ""
    var correctGuessArr = []
    var wrongLetterString = ""
    var displayWord

    // variables to hold references to the places in the HTML where we want to display things & then HTML will append to these parent selctors
    // var startGameText = document.getElementById("startGame");
    var guessWordText = document.getElementById("word");
    var numWinsText = document.getElementById("winTotal");
    var remainingGuessText = document.getElementById("guessLeft")
    var wrongLetterText = document.getElementById("wrongLetter")


    //  +++++++ function defintions ++++++++++

    // function pick's random word from wordArray
    function pickRandomWord() {
        guessThisWord = wordArray[Math.floor(Math.random() * wordArray.length)]
        console.log("guessThisWord = " + guessThisWord)
        return guessThisWord
    }

    // function breaks down guessWord from a string to an array
    function changeGuessWordToArray() {
        guessThisWordArray = Array.from(guessThisWord)
        console.log("guessThisWordArray = " + guessThisWordArray)
        return guessThisWordArray;
    }

    // function finds length of guessThisWordArray & displays on browser underscores to represent how many letters in guess word
    function displayUnderscores() {

        var dashTemp = []

        //loop for each character in guessThisWordArray
        for (var i = 0; i < guessThisWordArray.length; i++) {
            dashTemp.push('_ ');
            var dashTempString = dashTemp.join('')
            guessWordText.textContent = dashTempString;
        }
    }

    // function changes userInput to lowerCase
    function lowerCase() {
        var userInputLowerCase = userInput.toLowerCase();
        return userInputLowerCase;
    }

    // function adds correct userInput letter to correctGuessArray
    function storeCorrectLetters() {
        correctGuessArr += userInput;
        console.log("correctLettersArray " + correctGuessArr);
    }

    // function increases number wins
    function winner() {
        wins++;
    }

    // function changes number of remaining guess & add's wrong letter guessed to cancated string
    function wrongGuess() {

        remainingGuess--;
        // console.log('hit wrong guess ' + remainingGuess)
        remainingGuessText.textContent = remainingGuess;
        wrongLetterString = userInput + ", " + wrongLetterString;
        wrongLetterText.textContent = wrongLetterString;
    }

    function startGame() {
        pickRandomWord()
        changeGuessWordToArray()
        displayUnderscores()
    }

    // function to reset ids #word #guessLeft #wrongLetter restarts game
    function restartGame() {
        remainingGuess = 10
        displayWord = ""
        correctGuessArr = []
        wrongLetterString = ""
        numWinsText.textContent = wins
        remainingGuessText.textContent = remainingGuess
        guessWordText.textContent = displayWord
        wrongLetterText.textContent = wrongLetterString
        console.log('New Game Started ')
        startGame()

    }

    //  +++++++ Starting game ++++++++++
    startGame()

    // function runs whenever user presses a key
    document.onkeyup = function startGame(event) {

        userInput = event.key;    // Determines which key was pressed.
        userInput = lowerCase();

        if (remainingGuess !== 0 && remainingGuess <= 10) {

            if (guessThisWordArray.indexOf(userInput) === -1) {
                wrongGuess()
            }

            // condition checks if userInput is in guessThisWordArray
            else if (guessThisWordArray.includes(userInput)) {

                // add correct letter to correctGuessArray
                storeCorrectLetters();

                // finding the index num of the correct userInput
                for (var i = 0; i < guessThisWordArray.length; i++) {
                    var found = guessThisWordArray.indexOf(userInput);
                    var found2 = guessThisWordArray.lastIndexOf(userInput);
                }

                dashTemp.splice(found, 1, userInput); //replace correct userInput into _ _ _ array
                dashTemp.splice(found2, 1, userInput); //replace correct userInput into _ _ _ array
                guessWordText.textContent = dashTemp.join('');

            }

            // condition checks to user's guess to guessWord
            if (guessThisWordArray.toString() === dashTemp.toString()) {
                winner()
                restartGame()
            }
        }
        else {
            pickRandomWord()
            restartGame()
        }

    } // closes .onkeyup
}) //closes .ready