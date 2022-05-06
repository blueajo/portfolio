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