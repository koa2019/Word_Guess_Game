$(document).ready(function () {

   //declare & initialize variables 
   const startNumGuess = 3
   var remainingGuess = 3
   var wins = 0
   var guessThisWord
   var wordArray = ["apple", "grape", "kiwi", "mango", "orange", "pear", "guava", "watermelon"]
   var guessThisWordArray = []
   var dashTemp = []
   var userInput = ""
   var wrongLettersArr = []
   var correctGuessArr = []
   

   // variables to hold references to the places in the HTML where we want to display things & then HTML will append to these parent selctors
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
      return guessThisWordArray
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

   // function adds correct userInput letter to correctGuessArray
   function storeCorrectLetters() {
      correctGuessArr += userInput
      // console.log("correctLettersArray " + correctGuessArr)
   }
   function storeWrongLetters() {
      wrongLettersArr.push(userInput)
      // console.log("wrongLettersArray " + wrongLettersArr)
   }

   // function increases number wins
   function winner() {
      wins++
   }

   // function changes number of remaining guess & add's wrong letter guessed to cancated string
   function wrongGuess() {
      remainingGuess--
   }

   function renderScoresTally(){
      remainingGuessText.textContent = remainingGuess
      wrongLetterText.textContent = wrongLettersArr
      numWinsText.textContent = wins
   }
   // validate user's input is a char
   function guessIsValid(guess) {

      // https://www.w3resource.com/javascript/form/all-letters-field.php
      var letters = /^[A-Za-z]+$/;
      if (guess.match(letters)) {
          return true;
      }
      else {
          alert("Please guess any letter in the alphabet")
          return false
      }
  }
   function startGame() {
      pickRandomWord()
      changeGuessWordToArray()
      renderDashes()
      renderScoresTally()
   }

   // function to reset ids #word #guessLeft #wrongLetter restarts game
   function restartGame() {
      console.log('New Game Restarted ')
      remainingGuess = startNumGuess
      dashTemp = []
      correctGuessArr = []
      wrongLettersArr = []
      renderScoresTally()
      startGame()
   }

   //  ++++++++++++++++++++++++++++++++
   //  +++++++ Starting game ++++++++++
   startGame()

   // function runs whenever user presses a key
   document.onkeyup = function(event) {

      userInput = event.key
      var isValid = guessIsValid(userInput)
      if(isValid){
         userInput = lowerCase()
      }
      else {return}

      if (remainingGuess !== 0 && remainingGuess <= startNumGuess) {

         if (guessThisWordArray.indexOf(userInput) === -1) {
            wrongGuess()
            storeWrongLetters()
            renderScoresTally()
         }

         // condition checks if userInput is in guessThisWordArray
         else if (guessThisWordArray.includes(userInput)) {

            // add correct letter to correctGuessArray
            storeCorrectLetters()

            // finding the index num of the correct userInput
            for (var i = 0; i < guessThisWordArray.length; i++) {
               var found = guessThisWordArray.indexOf(userInput)
               var found2 = guessThisWordArray.lastIndexOf(userInput)
            }

            dashTemp.splice(found, 1, userInput); //replace correct userInput into _ _ _ array
            dashTemp.splice(found2, 1, userInput); //replace correct userInput into _ _ _ array
            guessWordText.textContent = dashTemp.join('');

         }

         // condition checks to user's guess to guessWord
         if (guessThisWordArray.toString() === dashTemp.toString()) {
            alert("Winner")
            winner()
            restartGame()
         }
      }
      else {
         alert("Out of Guesses")
         restartGame()
      }

   } // closes .onkeyup
}) //closes .ready