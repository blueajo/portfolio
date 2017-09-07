var colorMap = new Map();
colorMap.set('Blue', 'rgba(255,255,255,0)');
colorMap.set('About', 'red');
colorMap.set('Coursework', 'purple');
colorMap.set('Skills', 'orange');
colorMap.set('Experience', 'green');

$(document).ready(function() {
  setTimeout(function() {
    $('#site').css({position: 'static'})
  }, 2040);
});

(function () {
  var body = window.document.body;
  var box = document.getElementById('fadeup');

  var handleScroll = function () {
    var t = 100 * body.scrollTop / (body.scrollHeight - window.innerHeight);
    if(t >= 100) t = 99.99;
    if(t <= 0) t = 0;

    var color1;
    var color2;
    var top = false;

    var textVisibleDelay = -(body.scrollTop / 700);
    console.log(textVisibleDelay);
    if(textVisibleDelay < -.99) {
      textVisibleDelay = -.99;
    }
    document.getElementById('text').style.animationDelay = textVisibleDelay + 's';

    if (t < 25) {
      color1 = colorMap.get('Blue');
      color2 = colorMap.get('About');
      top = true;
    } else if (t < 50) {
      color1 = colorMap.get('About');
      color2 = colorMap.get('Coursework');
    } else if (t < 75) {
      color1 = colorMap.get('Coursework');
      color2 = colorMap.get('Skills');
    } else {
      color1 = colorMap.get('Skills');
      color2 = colorMap.get('Experience');
    }

    t = 100 - (t % 25) * 8;

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

$('a[href^="#"]').on('click', function(event) {

    var target = $(this.getAttribute('href'));

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top,
        }, 300);
    }

});
