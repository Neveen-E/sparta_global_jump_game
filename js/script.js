$(function() {

  //declaring variables for html elements
  var gameScreen = $('.container');
  var character = $('.character');
  var platform = $('.platform');

  console.log(platform);

  //variables for FPS and Game Speed
  var gameRunning = true;
  var fps = 25;
  var skip = 1000 / fps;
  var game_won = false;



  // for (var i = 0; i < platform.length; i++) {
  //   var pX = $(character).css('left');
  //   var cY = $(character).css('top');
  //   var cW = $(character).css('width');
  //   var cH = $(character).css('height');
  //   platform[i]
  // }


  function init() { // start the game
    setInterval(gameLoop, skip);
  }

  init();
  won();


  //variables for character movement

  var jumping = false;
  var moving = false;

  var originalValue = parseInt($(character).css('top'));



  function gameLoop() {

    var floorValue = originalValue;
    console.log(game_won);
    //screen properties
    var rectangle = $(gameScreen)[0].getBoundingClientRect();
    var rectangleD = rectangle.x;
    var rectangleU = rectangle.x + rectangle.height;
    var rectangleL = rectangle.l;
    var rectangleR = rectangle.l + rectangle.width;



    $(document).keypress(function(event) {
      if (event.which == 32 && jumping == false) {
        $(character).animate({
          top: '-=110'
        })

        jumping = true;

      }
    });

    $(document).keydown(function(event) {
      if (event.which == 37 && moving == false) {
        $(character).animate({
          left: '-=60'
        });
        // console.log(rectangleL);
        // if ($(character).left >= rectangleL){
        //   $(character).left = rectangleL;
        // }
        moving = true;
      }

      if (event.which == 39 && moving == false) {
        $(character).animate({
          left: '+=60'
        });

        moving = true;
      }
    });


    $(document).keyup(function(event) {
      $(character).animate({
        top: floorValue
      });
      jumping = false;
      moving = false;
      $(character).clearQueue();
    });

    function collide() {
      var myleft = parseInt($(character).css('left'));
      var myright = parseInt($(character).css('left')) + parseInt(($(character).css('width')));
      var mywidth = parseInt($(character).css('width'));
      var mytop = parseInt($(character).css('top'));
      var mybottom = parseInt($(character).css('top')) + parseInt(($(character).css('height')));
      var myheight = parseInt($(character).css('height'));


      //   var xPos = myleft - (mywidth / 2);
      //   var yPos = mytop - (myheight / 2);


      for (var i = 0; i < ($(platform).length); i++) {
        var otherleft = parseInt($(platform[i]).css('left'));
        var otherright = parseInt($(platform[i]).css('left')) + parseInt(($(platform[i]).css('width')));
        var otherwidth = parseInt($(platform[i]).css('width'));
        var othertop = parseInt($(platform[i]).css('top'));
        var otherbottom = parseInt($(platform[i]).css('top')) + parseInt(($(platform[i]).css('height')));
        var otherheight = parseInt($(platform[i]).css('height'));
        var otherOTHERright = otherleft + (otherwidth - mywidth);


        if ((mytop <= othertop) && ((myleft >= otherleft) && (myleft <= otherOTHERright))) {
          floorValue = othertop - myheight;
        }
        // else {
        //   floorValue = floorValue;
        // }
        if (floorValue == (parseInt($(platform[4]).css('top'))) - myheight) {
          game_won = true;
          return;
        }

      }
    }

    collide();


  };

  gameLoop();

//winning function
  function won() {
    if (game_won == true) {

      alert("YOU'VE WON!");
    }
  }

//counter function
  var counter = 0;
  var timeleft = Math.floor(15);
  var timer = $('#secondsleft').html();
  $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));

  function countdown() {
    counter++;
    $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));
    if (counter == (timeleft +1 )) {
      counter = 0;

      alert("Time's up!");
      clearInterval(counterinterval);
    }

  }
  var counterinterval = setInterval(countdown, 1000);


});
