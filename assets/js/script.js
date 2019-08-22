$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var firstCardClickedImage = null;
var secondCardClickedImage = null;

function initializeApp(){
  $('.lfz-card').on('click', handleCardClick);
}

function handleCardClick( event ) {
  console.log(event);
  $(event.currentTarget).toggleClass('hidden', true);
  if (!firstCardClicked) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    firstCardClickedImage = $(firstCardClicked).siblings()[0];
    secondCardClickedImage = $(secondCardClicked).siblings()[0];
    console.log(firstCardClickedImage);
    console.log(secondCardClickedImage);
    if ($(firstCardClickedImage).attr('class') === $(secondCardClickedImage).attr('class')) {
      console.log('cards match');
      matches +=1;
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
        $(firstCardClicked).toggleClass('hidden', false);
        $(secondCardClicked).toggleClass('hidden', false);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
}
