$(function() {

  //declaring variables for html elements
  var gameScreen = $('.container');
  var character = $('.character');
  var platform = $('.platform');
  var audio = $('#backgroundmusic');
  var jumpsfx = $('#jumpsfx');
  $(audio).prop('volume', '0.03');
  $(jumpsfx).prop('volume', '0.6');
  $(audio).trigger('play');


  //variables for FPS and Game Speed
  var gameRunning = true;
  var fps = 25;
  var skip = 1000 / fps;
  var game_won = false;
  var rightpos = false;
  var rightpos2 = false;
  var rightpos4 = false;
  var gamestart;
  var pause = false;


  var reload = false;

// start the game
  function init() {
    if(pause == false){
      gamestart = setInterval(gameLoop, skip);
    }

    else if(pause == true){
      clearInterval(gamestart);

    }
    return;
  }

  function stopgame(){
    clearInterval(gamestart);
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

    if(jumping == true){
      $(jumpsfx).trigger('play');
    }


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


        if (otherleft0 >= 4 && rightpos == false) {
          $(platform[0]).css('left', '-=0.1')
          if (otherleft0 == 4) {
            rightpos = true;
          }
        }

        if (rightpos == true) {
          $(platform[0]).css('left', '+=0.1')
          if (otherleft0 >= 596) {
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

    var platformsmove = setInterval(move, 1000);


  };

  // gameLoop();


  //winning function
  function won() {
    // if (game_won == true) {

    // alert("YOU'VE WON!");
    game_won = true
    $('.winningAlert').css('display', 'block');
    $('.orangebg').css('display', 'block');
      $('.wintext').html('You finished the game in ' + counter + ' seconds.');
    clearInterval(counterinterval);

    return;
    // }

  }


  //counter function
  var counter = 0;
  var counterinterval;


  var timeleft = Math.floor(20);
  var timer = $('#secondsleft').html();
  $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));

  function countdown() {

    counter++;
    $('#secondsleft').html('TIME LEFT : ' + (timeleft - counter));
    if (counter == (timeleft)) {
      counter = 0;

      $('.orangebg').css('display', 'block');
      $('.timesup').css('display', 'block');
      clearInterval(counterinterval);
      pause = true;
    }
    return;

  }


  //btns functions


  function startgame() {
    $('.btns').css('display', 'none');
    $('.timer').css('display', 'block');
    $('.orangebg').css('display', 'none');
    $('.instructions').css('display', 'none');
    $('.timesup').css('display', 'none');
    $('.winningAlert').css('display', 'none');
    $('#bgmusic').trigger('play');
    init();
    $(character).css('left', '500px').css('top','485px');
    counterinterval = setInterval(countdown, 1000);
  }

  function instructions() {
    $('.btns').css('display', 'none');
    $('.instructions').css('display', 'block');

  }

  //calling bbtn functions
  $('#startbtn').on('click', startgame);
  $('#playbtn').on('click', startgame);
  $('.againbtn').on('click', startgame);
  $('#instructionsbtn').on('click', instructions);

});
