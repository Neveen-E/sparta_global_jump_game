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


  //variables for character movement

  var jumping = false;
  var moving = false;

  var originalValue = parseInt($(character).css('top'));


  function gameLoop() {

    var floorValue = originalValue;

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
      //

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

        //     // var otherleft = parseInt($(platform[i]).css('left'));
        //     // var otherright = parseInt($(platform[i]).css('left')) + parseInt(($(platform[i]).css('width')));
        //     // var otherwidth = parseInt($(platform[i]).css('width'));
        //     // var othertop = parseInt($(platform[i]).css('top'));
        //     // var otherbottom = parseInt($(platform[i]).css('top')) + parseInt(($(platform[i]).css('height')));
        //     // var otherheight = parseInt($(platform[i]).css('height'));
        //     //
        //     // var otherX = otherleft - (otherwidth/2);
        //     // var otherY = othertop - (otherheight/2);
        //     //
        //     // if((mytop <= othertop) && ((myright < otherright)  && (myleft > otherleft))){
        //     //   floorValue = othertop;
        //     //   othertop = parseInt($(platform[i]).css('top'));
        //     // }
        //     // else{
        //     //   floorValue = originalValue;
        //     // }
      }



      //
      //
      //
      //
    }

    collide();



  };

  gameLoop();


});




//COLLIDE FUNCTION

/*character[0].collides = function() {
        var myleft = $(this).css('left');
        var myright = $(this).css('left') + ($(this).css('width'));
        var mytop = $(this).css('top');
        var mybottom = $(this).css('top') + ($(this).css('height'));
        var otherleft = $(platform).css('left');
        var otherright = $(platform).css('left') + ($(platform).css('width'));
        var othertop = $(platform).css('top');
        var otherbottom = $(platform).css('top') + ($(platform).css('height'));
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }

        return crash;
        console.log("hi");
        // if(jumping == false){
        //
        // }
    }

    function hitt(){
    if (character[0].collides($('#platform1'))){
      console.log("platform[0].othertop");
    }
    else{
      console.log("NO");

    }
  }*/
