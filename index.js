var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {

    
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
})


   


function nextSequence() {
  userClickedPattern = [];
    level = level + 1;
     $("h1").text("level " + level);
     
    var randomNumber = Math.floor(Math.random() * 4);
     var randomChosenColor = buttonColors[randomNumber]
     gamePattern.push(randomChosenColor)
     $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor);
    

  }



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){

     
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
    $("body").addClass("game-over");
       setTimeout(function(){
           $("body").removeClass("game-over");
       } , 200)
    playSound("wrong")
    
  
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver ()
  }


}

function startOver () {
  level = 0
  gamePattern = [];
  started = false;

}





function playSound(name) {
  
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");
  
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}