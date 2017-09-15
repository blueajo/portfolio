// maps each section to its color
var colorMap = new Map();
colorMap.set('Blue', 'rgba(255,255,255,0)');
colorMap.set('About', 'red');
colorMap.set('Education', 'purple');
colorMap.set('Skills', 'orange');
colorMap.set('Projects', 'green');

// delays the static positioning of the site upon load
$(document).ready(function() {
  setTimeout(function() {
    $('#body').css({position: 'static'})
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

    var bodyVisibleDelay = -(t / 700);
    if(bodyVisibleDelay < -.99) {
      bodyVisibleDelay = -.99;
    }
    document.getElementById('body').style.animationDelay = bodyVisibleDelay + 's';

    if (t < $('#About').offset().top) {
      color1 = colorMap.get('Blue');
      color2 = colorMap.get('About');
      t = t / $('#About').offset().top;
    } else if (t < $('#Education').offset().top) {
      color1 = colorMap.get('About');
      color2 = colorMap.get('Education');
      t = (t - $('#About').offset().top) / ($('#Education').offset().top - $('#About').offset().top);
    } else if (t < $('#Skills').offset().top) {
      color1 = colorMap.get('Education');
      color2 = colorMap.get('Skills');
      t = (t - $('#Education').offset().top) / ($('#Skills').offset().top - $('#Education').offset().top);
    } else {
      color1 = colorMap.get('Skills');
      color2 = colorMap.get('Projects');
      t = (t - $('#Skills').offset().top) / ($('#Projects').offset().top - $('#Skills').offset().top);
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
  } else if (t < $('#Education').offset().top - 1) {
    target = "#Education";
  } else if (t < $('#Skills').offset().top - 1) {
    target = "#Skills";
  } else {
    target = "#Projects";
  }

  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $(target).offset().top,
      }, 300);
  }
}
