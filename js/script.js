$(function() {

  //declaring variables for html elements
  var gameScreen = $('.container');
  var character = $('.character');
  var platform = $('.platform');

  //variables for FPS and Game Speed
  var gameRunning = true;
  var fps = 25;
  var skip = 1000 / fps;

  function init() {
    setInterval(gameLoop, skip);

  }

  init();


  //variables for character movement

  var jumping = false;


  function gameLoop() {
    var topPos = $(character).css('top');
    var floorValue = '510';
    topPos = floorValue;
    $(document).keypress(function(event) {
      if (event.which == 32) {
        $(character).animate({
          top: '-=70.5'
        })
        jumping = true;

      }
    });

    $(document).keydown(function(event) {
      if (event.which == 37) {
        $(character).animate({
          left: '-=100.5'
        });
      }

      if (event.which == 39) {
        $(character).animate({
          left: '+=100.5'
        });
      }
    });


    $(document).keyup(function(event) {
      $(character).animate({
        top: floorValue
      });
      jumping = false;
      $(character).clearQueue();
    });

  };

  gameLoop();


});
