// Declare variables for the button colors, game pattern, user's clicked pattern, whether the game has started, and the level
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// When the user presses a key, check if the game has started. change H1 text and call the nextSequence function
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

// Function to generate the next sequence in the game
function nextSequence() {
    // Clear the user's clicked pattern
    userClickedPattern = [];
  
    // Increase the level
    level++;
  
    // Update the level title to show the current level
    $("#level-title").text("Level " + level);
  
    // Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
  
    /// Use the random number to choose a color from the buttonColors array
    var randomChosenColor = buttonColors[randomNumber];
  
    // Add the chosen color to the game pattern
    gamePattern.push(randomChosenColor);
  
    // Used jQuery to animate the button corresponding to the chosen color
    $("#" + randomChosenColor)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
  
      // Play the sound for the chosen color
    playSound(randomChosenColor);
  }

   // When the user clicks a button, add the id of the button to the userClickedPattern array
  $(".btn").click(function () {

    // Get the id of the button that was clicked
    var userChosenColor = $(this).attr("id");
  
    // Add the id of the button to the userClickedPattern array
    userClickedPattern.push(userChosenColor);
  
    // Play the sound for the button the user clicked
    playSound(userChosenColor);
    
    // Animate the button the user clicked
    animatePress(userChosenColor);
  
    // Check if the user's clicked pattern is the same as the game pattern
    checkAnswer(userClickedPattern.length - 1);
  });

  // Function to play sound
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
  
  // Function to animate the button press
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
  
    // remove the "pressed" class from the button after 100 milliseconds
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  // Function to check if the user's clicked pattern is the same as the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user has completed the pattern, call the nextSequence function after a 1 second delay
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");

    // Play the wrong sound, animate the body to indicate a game over, and call the startOver function
    playSound("wrong");

    // Add "game-over" class to the body element
    $("body").addClass("game-over");
    // wait for 200 milliseconds
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

     // Update the level title to show "Game Over, Press Any Key to Restart"
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Call the startOver function
    startOver();
  }
}

 // Function to reset the level, game pattern, and started variable
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
