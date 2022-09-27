var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$('.btn').click(function(event) {
  var userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

$(document).keypress(function() {
  if (started != true) {
    $("h1").text('Level 0');
    nextSequence();
    started = true;
  }
})
function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  level += 1;
  $("h1").text('Level '+ level);
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3")
  audio.play()
}

function animatePress(currentColor) {
  $("."+currentColor).addClass("pressed");
  setTimeout(function() {
    $("."+currentColor).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (currentLevel == gamePattern.length-1) {
      setTimeout(nextSequence(),1000);
      userClickedPattern = [];
    }
    console.log("success");
  }
  else {
    console.log("Answer:" + gamePattern[currentLevel]);
    console.log("Responsed:" + userClickedPattern[currentLevel]);
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over");
      },200);
    $("h1").text('Game Over, Press Any Key to Restart');
    startOver();
    console.log("wrong");
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}
