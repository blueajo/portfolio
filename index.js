// maps each section to its color
var colorMap = new Map();
colorMap.set('Blue', 'rgba(255,255,255,0)');
colorMap.set('About', 'red');
colorMap.set('Coursework', 'purple');
colorMap.set('Skills', 'orange');
colorMap.set('Experience', 'green');

// delays the static positioning of the site upon load
$(document).ready(function() {
  setTimeout(function() {
    $('#site').css({position: 'static'})
  }, 1830);
});

// handles scroll-based animations
(function () {
  var body = window.document.body;
  var box = document.getElementById('fadeup');

  var handleScroll = function () {
    var t = body.scrollTop;

    var color1;
    var color2;

    var textVisibleDelay = -(t / 700);
    if(textVisibleDelay < -.99) {
      textVisibleDelay = -.99;
    }
    document.getElementById('text').style.animationDelay = textVisibleDelay + 's';

    if (t < $('#About').offset().top) {
      color1 = colorMap.get('Blue');
      color2 = colorMap.get('About');
      t = t / $('#About').offset().top;
    } else if (t < $('#Coursework').offset().top) {
      color1 = colorMap.get('About');
      color2 = colorMap.get('Coursework');
      t = (t - $('#About').offset().top) / ($('#Coursework').offset().top - $('#About').offset().top);
    } else if (t < $('#Skills').offset().top) {
      color1 = colorMap.get('Coursework');
      color2 = colorMap.get('Skills');
      t = (t - $('#Coursework').offset().top) / ($('#Skills').offset().top - $('#Coursework').offset().top);
    } else {
      color1 = colorMap.get('Skills');
      color2 = colorMap.get('Experience');
      t = (t - $('#Skills').offset().top) / ($('#Experience').offset().top - $('#Skills').offset().top);
    }

    t = 100 - 200 * t;

    var background;

    if (t > 0) {
      background = "linear-gradient(" + color1 + " " + t + "%, " + color2 + ")";
    } else {
      background = "linear-gradient(" + color1 + " 0%, " + color2 + " " + (100 + t) + "%)";
    }

    document.getElementById("blue").style.backgroundImage = background + ', url("./images/intro_water.gif")';
    document.getElementById("jo").style.backgroundImage = background;
  };

  $(document).ready(function() {
    setTimeout(function() {
      window.addEventListener('scroll', handleScroll, false);
    }, 2040);
  });
}());

// handles smooth scrolling when clicking on # links
$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 300);
    }

});

// handles smooth scrolling when in iphone view
function next() {
  var t = window.document.body.scrollTop;
  var target;

  if (t < $('#About').offset().top - 1) {
    target = "#About";
  } else if (t < $('#Coursework').offset().top - 1) {
    target = "#Coursework";
  } else if (t < $('#Skills').offset().top - 1) {
    target = "#Skills";
  } else {
    target = "#Experience";
  }

  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $(target).offset().top,
      }, 300);
  }
}

// tries to determine whether the user is using touch or mouse in order to deal width
// problems with hover support on touchscreen devices
(function(){
    var isTouch = false //var to indicate current input type (is touch versus no touch)
    var isTouchTimer
    var curRootClass = '' //var indicating current document root class ("can-touch" or "")

    function addtouchclass(e){
        clearTimeout(isTouchTimer)
        isTouch = true
        if (curRootClass != 'can-touch'){ //add "can-touch' class if it's not already present
            curRootClass = 'can-touch'
            document.documentElement.classList.add(curRootClass)
        }
        isTouchTimer = setTimeout(function(){isTouch = false}, 500) //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
    }

    function removetouchclass(e){
        if (!isTouch && curRootClass == 'can-touch'){ //remove 'can-touch' class if not triggered by a touch event and class is present
            isTouch = false
            curRootClass = ''
            document.documentElement.classList.remove('can-touch')
        }
    }

    document.addEventListener('touchstart', addtouchclass, false) //this event only gets called when input type is touch
    document.addEventListener('mouseover', removetouchclass, false) //this event gets called when input type is everything from touch to mouse/ trackpad
})();
