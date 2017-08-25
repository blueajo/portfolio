(function () {
  var body = window.document.body;
  var box = document.getElementById('sun');

  var handleScroll = function () {
    var t = body.scrollTop / (body.scrollHeight - window.innerHeight);
    box.style.animationDelay = -t + 's';
    console.log(t);
  };
  window.addEventListener('scroll', handleScroll, false);

}());
