$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var firstCardClickedImage = null;
var secondCardClickedImage = null;
var max_matches = 9;
var attempts = 0;
var games_played = 0;
var accuracy = 0;
var veryFirstClick = false;

function initializeApp(){
  $('.back').on('click', handleCardClick);
}

function handleCardClick( event ) {
  console.log(event);
  $(event.currentTarget).toggleClass('hidden', true);
  if (!firstCardClicked) {
    firstCardClicked = $(event.currentTarget);
    gameCount();
  } else {
    secondCardClicked = $(event.currentTarget);
    firstCardClickedImage = $(firstCardClicked).siblings()[0];
    secondCardClickedImage = $(secondCardClicked).siblings()[0];
    if ($(firstCardClickedImage).attr('class') === $(secondCardClickedImage).attr('class')) {
      matches+=1;
      calculateAccuracy();
      console.log('cards match, match number is now: ', matches);
      attempts += 1;
      calculateAccuracy();
      $('.stats-bar-section:nth-child(5)').text(attempts);
      if (matches == max_matches) {
        var modal = document.getElementById('modal');
        $(modal).show();
        var span = document.getElementsByClassName('close')[0];
        $(span).on('click', function(){
          $(modal).hide();
          alert('before calling reset');
          resetStats();
          alert('after calling reset');
        });
      }
      firstCardClicked = null;
      secondCardClicked = null;
    } else {
      setTimeout(function () {
        attempts+=1;
        calculateAccuracy();
        $('.stats-bar-section:nth-child(5)').text(attempts);
        console.log('the number of attempts is now: ', attempts);
        $(firstCardClicked).toggleClass('hidden', false);
        $(secondCardClicked).toggleClass('hidden', false);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1000);
    }
  }
}

function calculateAccuracy(){
  accuracy = matches/attempts * 100;
  accuracy = Math.floor(accuracy) + '%';
  $('.stats-bar-section:nth-child(7)').text(accuracy);
}

function gameCount(){
  if (veryFirstClick == false) {
    veryFirstClick = true;
    games_played += 1;
    $('.stats-bar-section:nth-child(3)').text(games_played);
  }
}

function resetStats(){
  matches = 0;
  attempts = 0;
  accuracy = 0;
  //veryFirstClick = false;
  alert('before' + games_played);
  gameCount();
  alert('after' + games_played);
  $('.stats-bar-section:nth-child(5)').text(attempts);
  $('.stats-bar-section:nth-child(7)').text(accuracy);
  flipAllCardsBack();
}

function flipAllCardsBack(){
  $('.back').toggleClass('hidden', false);
}
