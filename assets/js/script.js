$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var firstCardClickedImage = null;
var secondCardClickedImage = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;

function initializeApp(){
  $('.back').on('click', handleCardClick);
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
    if ($(firstCardClickedImage).attr('class') === $(secondCardClickedImage).attr('class')) {
      matches+=1;
      console.log('cards match, match number is now: ', matches);
      if (matches == max_matches) {
        games_played+=1;
        var modal = document.getElementById('modal');
        $(modal).show();
        var span = document.getElementsByClassName('close')[0];
        $(span).on('click', function(){
          $(modal).hide();
        });
      }
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
        attempts+=1;
        $(firstCardClicked).toggleClass('hidden', false);
        $(secondCardClicked).toggleClass('hidden', false);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
}

function calculateAccuracy(){

}

function displayStats(){

}
