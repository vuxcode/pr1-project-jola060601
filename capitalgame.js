// Create variables that will be needed in the game (have almost all of them empty at first because they will change during the game play)
var currentCapital = "";
var randomArray = [];
var fourSelections = [];
var questionNumber = 1;
var maxQuestions = 10;
var correctPoints = 0;
var maxPoints = 10;
var timer = 30;
var timerID; // This variable will be necessary when stopping the timer after a button has been pushed
// Get the correct <h2> where the question numbers are displayed (i.e. the <h2> designated with the id="questiontext")
var questionText = document.querySelector("#questiontext span");
// Get the correct <h2> where the point numbers are displayed (i.e. the <h2> designated with the id="pointstext")
var pointsText = document.querySelector("#pointstext span");
// Get the correct <h2> where the timer number is displayed (i.e. the <h2> designated with the id="timernumber")
var timerNumber = document.querySelector("#timernumber span");
// Get the correct <div> where the game modal is displayed
var capitalModal = document.querySelector(".game-modal");
// Get the correct <main> where the container box is displayed
var capitalContainer = document.querySelector(".containerbox");
// Get the correct <h1> where the question is displayed
var capitalQuestion = document.querySelector("#capital-question span");
// Create variables to find the button elements on the screen
var button0 = document.getElementById("choice0");
var button1 = document.getElementById("choice1");
var button2 = document.getElementById("choice2");
var button3 = document.getElementById("choice3");
var cancelButton = document.getElementById("cancelbutton");
// Create a function to generate forty random countries from the list from the "js"-file
function getFortyCapitals() {
  // Create a while-loop to generate forty random and unique countries
  while (randomArray.length < 40) {
    // Use Math.floor to round down so that the number in capitalList.length won't be called upon and crash the game (index starts at 0 and ends in capitalList.length - 1)
    var { country, capital } = capitalList[Math.floor(Math.random() * capitalList.length)];
    // Check to see if country already exists inside randomArray (use .some() instead of .includes() because the former can check inside an array inside of another array)
    var isDuplicate = randomArray.some(item => item[0] == country);
    // Create an if-statement to check whether isDuplicate is true or false
    if (!isDuplicate) {
      // Save the randomly generated country and capital into the empty array
      randomArray.push([country, capital]);
    }
    // Otherwise don't add it to the array
    else {
      // Output a message
      console.log(country + " already exists.");
    }
  }
  // Output the arrays on console log to confirm that the code works
  console.log(randomArray);
}
// Create a function to reset the game
function resetGame() {
  // Clear all variables every time the game restarts
  questionNumber = 1;
  correctPoints = 0;
  timer = 30;
  timerID;
  // Clear all UI elements (i.e. text, images, keyboard and modal) every time the game restarts
  questionText.innerText = `${questionNumber} / ${maxQuestions}`; // Print out the question numbers on screen
  pointsText.innerText = `${correctPoints} / ${maxPoints}`; // Print out the point numbers on screen
  capitalQuestion;
  capitalContainer.classList.remove("hide");
  capitalModal.classList.remove("show");
  // Run the function to generate forty random countries from the list from the "js"-file
  getFortyCapitals();
  // Run the startGame function
  startGame();
}
// Create a function to load the next question depending on number of questions
function loadNextQuestion() {
  // Increase the question number when a button is clicked when the question number is less than or equal to the maximum question
  if (questionNumber < maxQuestions) {
    questionNumber++;
    // Run the startGame function
    startGame();
  }
  // If all ten questions are answered, end the game
  else {
    // console.log("Game over!");
    endGame();
  }
}
// Create a function to have the timer count down
function countDown() {
  // Print out the correct number on screen
  timerNumber.innerText = `${timer}`;
  // Output the correct time
  // console.log(timer);
  // Create a for-loop to count down if the number is greater than zero
  if (timer > 0) {
    // Reduce the number by one
    timer--;
    // Create a loop and run the function again in one second, while saving the timer in the timerID variable so that it can be stopped later on
    timerID = setTimeout(countDown, 1000);
  }
  // When the timer reaches zero
  else {
    // Stop the function here
    // console.log("Time out!");
    // Move on to the next question automatically
    loadNextQuestion();
  }
}
// Create a function to increase the question number each time one button is clicked
function clickButtonQuestion(clickedButton) {
  // Stop the timer when a button has been pushed
  clearTimeout(timerID);
  // Run the point increase function
  clickButtonPoints(clickedButton);
  // Deactivate all buttons after clicking on one of them
  button0.disabled = true;
  button1.disabled = true;
  button2.disabled = true;
  button3.disabled = true;
  cancelButton.disabled = true;
  // Set a timeout that will wait one second before moving on to the next question
  setTimeout(function() {
    // Activate the buttons again for the next question
    button0.disabled = false;
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    cancelButton.disabled = false;
    // Run the function to load the next question depending on the number of questions remaining
    loadNextQuestion();
  }, 1000)
}
// Create a function to increase points when clicking the correct button
function clickButtonPoints(clickedButton) {
  // Create a local variable to put all buttons inside an array
  var allButtons = [button0, button1, button2, button3];
  // Create an if-statement to increase the points by one step if the correct button was pressed
  if (clickedButton.innerHTML == currentCapital[1]) {
    correctPoints++;
    // Print out the point numbers on screen
    pointsText.innerText = `${correctPoints} / ${maxPoints}`;
    // Color the correct button green
    clickedButton.style.backgroundColor = "green"
  }
  else {
    // Color the incorrect button red
    clickedButton.style.backgroundColor = "red"
    // Loop through all buttons to find the correct one
    for (var i = 0; i < allButtons.length; i++) {
      // Color the correct button green
      if (allButtons[i].innerHTML == currentCapital[1]) {
        allButtons[i].style.backgroundColor = "green";
      }
    }
  }
}
// Create a function to cancel the game
function cancelGame(clickedButton) {
  // Stop the timer when a button has been pushed
  clearTimeout(timerID);
  // Turn the game modal on
  capitalModal.classList.add("show");
  // Change the text displayed on the game modal
  capitalModal.querySelector("h2").innerText = `${"Game Over!"}`;
  capitalModal.querySelector("button").innerText = `${"Play again"}`
  capitalModal.querySelector("p").innerHTML = `${`You cancelled the game before finishing it! You answered ${questionNumber - 1} questions while earning ${correctPoints} points in total.`}`;
}
// Create a function to end the game
function endGame() {
  // Turn the game modal on
  capitalModal.classList.add("show");
  // Create an if-statement to process the result of the game
  if (correctPoints == 0) {
    // Change the text displayed on the game modal
    capitalModal.querySelector("h2").innerText = `${"Game Over!"}`;
    capitalModal.querySelector("button").innerText = `${"Play again"}`
    capitalModal.querySelector("p").innerHTML = `${`You answered all ${questionNumber} questions, but you earned ${correctPoints} points in total.`}`;
  }
  else if (correctPoints == maxPoints) {
    // Change the text displayed on the game modal
    capitalModal.querySelector("h2").innerText = `${"Congratulations!"}`;
    capitalModal.querySelector("button").innerText = `${"Play again"}`
    capitalModal.querySelector("p").innerHTML = `${`You answered all ${questionNumber} questions, and you earned all ${correctPoints} points in total.`}`;
  }
  else {
    // Change the text displayed on the game modal
    capitalModal.querySelector("h2").innerText = `${"Finish!"}`;
    capitalModal.querySelector("button").innerText = `${"Play again"}`
    capitalModal.querySelector("p").innerHTML = `${`You answered all ${questionNumber} questions, and you earned ${correctPoints} points in total.`}`;
  }
}
// Create a function to start the game
function startGame() {
  // Have the four selections be empty when starting a new question
  fourSelections = [];
  // Reset timer to be 30 seconds
  timer = 30;
  // Create a for-loop to extract four items from randomArray
  for (var n = 0; n < 4; n++) {
    // Remove from randomArray and save in fourSelections
    fourSelections.unshift(randomArray.pop());
  }
  // Output the array on the console
  console.log(fourSelections);
  // Check to see that the computer can find the button elements
  // console.log(button0);
  // console.log(button1);
  // console.log(button2);
  // console.log(button3);
  // Reset the colors of the buttons
  [button0, button1, button2, button3].forEach(btn => {
    btn.style.backgroundColor = "";
  });
  // Add capital names to the buttons
  button0.innerHTML = fourSelections[0][1];
  button1.innerHTML = fourSelections[1][1];
  button2.innerHTML = fourSelections[2][1];
  button3.innerHTML = fourSelections[3][1];
  // Let one of the four selections be the correct choice
  currentCapital = fourSelections[Math.floor(Math.random() * 4)];
  // Check to see that one selection was made
  console.log(currentCapital);
  // Print out the question numbers on screen
  questionText.innerText = `${questionNumber} / ${maxQuestions}`;
  // Print out the question depending on country
  if (currentCapital[0] == "Benin" || currentCapital[0] == "Bolivia" || currentCapital[0] == "Burundi" || currentCapital[0] == "Eswatini" || currentCapital[0] == "Côte d'Ivoire" || currentCapital[0] == "Malaysia" || currentCapital[0] == "Netherlands" || currentCapital[0] == "South Africa" || currentCapital[0] == "Sri Lanka") {
    // Display the following question
    capitalQuestion.querySelector("h1").innerText = `${`What is one of the capital cities of ${currentCapital[0]}?`}`;
  }
  else if (currentCapital[0] == "Nauru" || currentCapital[0] == "Switzerland") {
    // Display the following question
    capitalQuestion.querySelector("h1").innerText = `${`What is the <i>de facto</i> capital city of ${currentCapital[0]}?`}`;
  }
  else if (currentCapital[0] == "Honduras") {
    // Display the following question
    capitalQuestion.querySelector("h1").innerText = `${`What is the joint capital unit of ${currentCapital[0]}?`}`;
  }
  else {
    // Display the following question
    capitalQuestion.querySelector("h1").innerText = `${`What is the capital city of ${currentCapital[0]}?`}`;
  }
  // Run the countdown function
  countDown();
}