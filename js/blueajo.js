const links = [['email', 'email.png'],
               ['cv', 'cv.png'],
               ['sanpaolo', 'sanpaolo.png'],
               ['sagunto', 'sagunto.png'],
               ['forestclearingschool', 'forestclearingschool.png'],
               ['scientistsrefuge', 'scientistsrefuge.png'],
               ['atlasurbium', 'atlasurbium.png'],
               ['foodethnographer', 'foodethnographer.png'],
               ['earthseed', 'earthseed.png'],
               ['undergraduateportfolio', 'undergraduateportfolio.jpg']];

var images = new Array();
function preload() {
  for (i = 0; i < preload.arguments.length; i++) {
    images[i] = new Image();
    images[i].src = 'img/preview_imgs/' + preload.arguments[i];
  }
}
preload(
    'email.png',
    'cv.png',
    'sanpaolo.png',
    'sagunto.png',
    'forestclearingschool.png',
    'scientistsrefuge.png',
    'atlasurbium.png',
    'foodethnographer.png',
    'earthseed.png',
    'undergraduateportfolio.jpg'
);

function findImage(id) {
  for (link of links) {
    if (id == link[0]) {
      return link[1];
    }
  }
  console.error('Incorrect link id');
}

$('a').on('mouseover', function(event) {
  let imageLink = findImage($(this).attr('id'));
  $('#preview-img').attr('src', 'img/preview_imgs/' + imageLink);
  $('#preview-img').show();
});

$('a').on('mouseout', function(event) {
  $('#preview-img').hide();
});