// maps each section to its color
var colorMap = ['rgba(255,255,255,0)', 'red', 'purple', 'orange', 'green'];
// tells if body is visible
var visible = false;
// vars for css elements used in scroll to avoid too many calls to them
var site_body = $('#site_body');
var about = $('#About');
var education = $('#Education');
var skills = $('#Skills');
var projects = $('#Projects');

// delays the static positioning of the site upon load
$(window).on('load', function() {
  $('#spinner').animate({opacity: 0}, 500, "swing");
  $('#headerContent').animate({opacity: 1}, 1000, "swing");
  setTimeout(function() {
    $('#AboutLink').animate({opacity: 1}, 500, "swing");
  }, 1600);
  setTimeout(function() {
    $('#EducationLink').animate({opacity: 1}, 500, "swing");
  }, 1700);
  setTimeout(function() {
    $('#SkillsLink').animate({opacity: 1}, 500, "swing");
  }, 1800);
  setTimeout(function() {
    $('#ProjectsLink').animate({opacity: 1}, 500, "swing");
  }, 1830);
  setTimeout(function() {
    $('#nextButton').css({animationPlayState: "running"});
    site_body.css({position: 'static'});
  }, 1600);
});

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return true;
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    return true;
  }

  // other browser
  return false;
}

if(detectIE()) {
  var supportsTextClip = false;
  var doesntSupportSticky = true;
} else {
  var supportsTextClip = CSS.supports("(background-clip: text) or (-webkit-background-clip: text)");
  var doesntSupportSticky = !CSS.supports("(position: sticky) or (position: -webkit-sticky)");
}

// handles scroll-based animations
setInterval(handleScroll, 50);
function handleScroll() {
  var t = document.documentElement.scrollTop || document.body.scrollTop;

  if(doesntSupportSticky) {
    stickyTop(t);
  }

  bodyAppear(t);

  if(supportsTextClip) {
    colorChange(t);
  }
}

// handles sticky top for stupid browsers that don't support sticky (i.e. MICROSOFT)
function stickyTop(t) {
  if (t >= $('#headerPosition').offset().top) {
    // stick the div
    document.getElementById('header').classList.add("stick");
  } else {
    // release the div
    document.getElementById('header').classList.remove("stick");
  }
}

//handles appearance of body
function bodyAppear(t) {
  if (t < 250 && visible) {
    visible = false;
    site_body.toggleClass("visible");
  } else if(t > 250 && !visible) {
    visible = true;
    site_body.toggleClass("visible");
  }
}

// handles color change animation for browers that support it (i.e. NOT MICROSOFT)
function colorChange(t) {
  var color1;
  var color2;

  if (t < about.offset().top) {
    color1 = colorMap[0];
    color2 = colorMap[1];
    t = t / about.offset().top;
  } else if (t < education.offset().top) {
    color1 = colorMap[1];
    color2 = colorMap[2];
    t = (t - about.offset().top) / (education.offset().top - about.offset().top);
  } else if (t < skills.offset().top) {
    color1 = colorMap[2];
    color2 = colorMap[3];
    t = (t - education.offset().top) / (skills.offset().top - education.offset().top);
  } else {
    color1 = colorMap[3];
    color2 = colorMap[4];
    t = (t - skills.offset().top) / (projects.offset().top - skills.offset().top);
  }

  t = 100 - 200 * t;

  var background;

  if (t > 0) {
    background = "linear-gradient(" + color1 + " " + t + "%, " + color2 + ")";
  } else {
    background = "linear-gradient(" + color1 + " 0%, " + color2 + " " + (100 + t) + "%)";
  }

  document.getElementById('blue').style.backgroundImage = background + ', url("./images/intro_water.gif")';
}

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

  if (t < about.offset().top - 1) {
    target = "#About";
  } else if (t < education.offset().top - 1) {
    target = "#Education";
  } else if (t < skills.offset().top - 1) {
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
