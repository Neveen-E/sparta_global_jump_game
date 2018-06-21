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
  var rightpos = false;
  var rightpos2 = false;
  var rightpos4 = false;



  // for (var i = 0; i < platform.length; i++) {
  //   var pX = $(character).css('left');
  //   var cY = $(character).css('top');
  //   var cW = $(character).css('width');
  //   var cH = $(character).css('height');
  //   platform[i]
  // }

  var reload = false;

  function init() { // start the game
    setInterval(gameLoop, skip);
  }





  //variables for character movement

  var jumping = false;
  var moving = false;
  var walkright = true;

  var originalValue = parseInt($(character).css('top'));



  function gameLoop() {
    var game_won = false;

    var floorValue = originalValue;

    //screen properties
    var rectangle = $(gameScreen)[0].getBoundingClientRect();
    var rectangleD = rectangle.x;
    var rectangleU = rectangle.x + rectangle.height;
    var rectangleL = rectangle.l;
    var rectangleR = rectangle.l + rectangle.width;

    //character movement

    $(document).keypress(function(event) {
      if (event.which == 32 && jumping == false) {
        $(character).animate({
          top: '-=110'
        });
        $(character).removeClass('characteridle characteridleflip').addClass('characterjump');

        jumping = true;

      }
    });

    $(document).keydown(function(event) {
      if ((event.which == 38 || event.which == 87) && jumping == false) {
        $(character).animate({
          top: '-=110'
        });
        $(character).removeClass('characteridle characteridleflip').addClass('characterjump');

        jumping = true;

      }
    });

    $(document).keydown(function(event) {
      if ((event.which == 37 || event.which == 65) && moving == false) {
        $(character).animate({
          left: '-=60'
        });
        $(character).removeClass('characteridle').addClass('characterwalkflip');

        walkright = false;
        moving = true;
      }

      if ((event.which == 39 || event.which == 68) && moving == false) {
        $(character).animate({
          left: '+=60'
        });
        $(character).removeClass('characteridle').addClass('characterwalk');
        //.css('background-image', 'url("../images/traveler/walk.gif")')
        walkright = true;
        moving = true;
      }
    });


    $(document).keyup(function(event) {
      $(character).animate({
        top: floorValue
      });

      jumping = false;
      moving = false;
      if (moving == false && walkright == true) {
        $(character).removeClass('characterwalk characterwalkflip characteridleflip characterjump').addClass('characteridle');
      } else if (moving == false && walkright == false) {
        $(character).removeClass('characterwalk characterwalkflip characteridle characterjump').addClass('characteridleflip');
      }
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
        if ((floorValue == (parseInt($(platform[4]).css('top'))) - myheight) && (jumping == false) && (moving == false)) {
          game_won = true;
          won();

        }
      }
    }

    function move() {

      for (var i = 0; i < ($(platform).length); i++) {
        var otherleft0 = parseInt($(platform[0]).css('left'));
        var otherleft2 = parseInt($(platform[2]).css('left'));
        var otherleft4 = parseInt($(platform[4]).css('left'));

        if (otherleft0 < 597 && rightpos == false) {
          $(platform[0]).css('left', '+=0.1')
          if (otherleft0 == 596) {
            rightpos = true;
          }
        }

        if (rightpos == true) {
          $(platform[0]).css('left', '-=0.1')
          if (otherleft0 <= 4) {
            rightpos = false;
          }
        }

        if (otherleft2 >= 4 && rightpos2 == false) {
          $(platform[2]).css('left', '-=0.1')
          if (otherleft2 == 4) {
            rightpos2 = true;
          }
        }

        if (rightpos2 == true) {
          $(platform[2]).css('left', '+=0.1')
          if (otherleft2 >= 596) {
            rightpos2 = false;
          }
        }

        if (otherleft4 < 597 && rightpos4 == false) {
          $(platform[4]).css('left', '+=0.05')
          if (otherleft4 == 596) {
            rightpos4 = true;
          }
        }

        if (rightpos4 == true) {
          $(platform[4]).css('left', '-=0.05')
          if (otherleft4 <= 4) {
            rightpos4 = false;
          }
        }
        // else if(otherleft < 4){
        //     rightpos = true;
        //     $(platform[0]).css('left', '+=0.5');
        //
        // }


        // else if(otherright == 0){
        //   console.log("STOP");
        // }
      }
    }




    collide();

    setInterval(move, 1000);


  };

  // gameLoop();


  //winning function
  function won() {
    // if (game_won == true) {

    // alert("YOU'VE WON!");
    game_won = false;
    $('.winningAlert').css('display', 'block');
    clearInterval(init);
    return;
    // }

  }


  //counter function
  var counter = 0;
  var timeleft = Math.floor(15);
  var timer = $('#secondsleft').html();
  $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));

  function countdown() {

    counter++;
    $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));
    if (counter == (timeleft + 1)) {
      counter = 0;

      alert("Time's up!");
      clearInterval(counterinterval);
    }
    return;

  }


  //btns functions

  function startgame() {
    $('.btns').css('display', 'none');
    $('.timer').css('display', 'block');
    init();
    var counterinterval = setInterval(countdown, 1000);
  }

  $('#startbtn').on('click', startgame);

});
