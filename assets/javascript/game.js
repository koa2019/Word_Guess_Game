$(document).ready(function () {

    // declare & initialize variables 
    var remainingGuess = 5
    var wins = 0
    var guessThisWord
    var wordArray = ["apple", "grape", "kiwi", "mango"]
    var guessThisWordArray = []
    var dashTemp = []
    var userInput = ""
    var wrongLetterString = ""

    // variables to hold references to the places in the HTML where we want to display things & then HTML will append to these parent selctors
    // var startGameText = document.getElementById("startGame");
    var guessWordText = document.getElementById("word")
    var numWinsText = document.getElementById("winTotal")
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
        // console.log("guessThisWordArray = " + guessThisWordArray)
        return guessThisWordArray;
    }

    // function finds length of guessThisWordArray & displays on browser underscores to represent how many letters in guess word
    function renderDashes() {

        //loop for each character in guessThisWordArray
        for (var i = 0; i < guessThisWordArray.length; i++) {
            dashTemp.push('_ ')
            var dashTempString = dashTemp.join('')
            guessWordText.textContent = dashTempString
        }
    }

    // function changes userInput to lowerCase
    function lowerCase() {
        var userInputLowerCase = userInput.toLowerCase()
        return userInputLowerCase
    }

    // function increases number wins
    function winner() {
        wins++
    }

    // function changes number of remaining guess & add's wrong letter guessed to cancated string
    function wrongGuess() {
        remainingGuess--
    }

    function renderNumGuesses(){
        remainingGuessText.textContent = remainingGuess
    }
    function renderWrongLetters(){
        wrongLetterText.textContent = wrongLetterString
    }


    function startGame() {
        pickRandomWord()
        changeGuessWordToArray()
        renderDashes()
        renderNumGuesses()
    }

    // function to reset ids #word #guessLeft #wrongLetter restarts game
    function restartGame() {
        console.log('New Game Started ')
        remainingGuess = 5
        dashTemp = []
        wrongLetterString = ""
        numWinsText.textContent = wins
        renderNumGuesses()
        renderWrongLetters()
        startGame()
    }

    //  ++++++++++++++++++++++++++++++++
    //  +++++++ Starting game ++++++++++
    startGame()

    // function runs whenever user presses a key
    document.onkeyup = function startGame(event) {

        userInput = event.key  // Determines which key was pressed.
        userInput = lowerCase()
        wrongGuess()
       
        if (remainingGuess !== 0 && remainingGuess <= 10) {
            if (guessThisWordArray.indexOf(userInput) === -1) {
                // wrongGuess()
                renderNumGuesses()
                wrongLetterString = userInput + ", " + wrongLetterString
                renderWrongLetters()
            }

            // condition if userInput is in guessThisWordArray
            else {

                for (var i = 0; i < guessThisWordArray.length; i++) {
                    
                    // finding the index num of the correct userInput
                    var found = guessThisWordArray.indexOf(userInput)
                    
                    // checks if there two of the same letter in the guess word
                    var found2 = guessThisWordArray.lastIndexOf(userInput)
                    
                }
                
                dashTemp.splice(found, 1, userInput) //replace correct userInput into _ _ _ array
                dashTemp.splice(found2, 1, userInput) //replace correct userInput into _ _ _ array
                guessWordText.textContent = dashTemp.join('')

            }

            // condition checks to user's guess to guessWord
            // changes each array back into a string to compare their values
            if (guessThisWordArray.toString() === dashTemp.toString()) {
                winner()
                restartGame()
            }
        }
        else {
            restartGame()
        }

    } // closes .onkeyup
}) //closes .ready