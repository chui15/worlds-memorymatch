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
var images_array = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9'];
//1) shuffle, 2) concat/double, 3)re-shuffle, 4) jQuery new box 5) for loop to assign to new boxes

function firstChoice(){
  var modal1 = document.getElementById('modal1');
  $(modal1).show();
  $('.choice1').on('click', function () {
    $(modal1).hide();
    var audio = document.getElementsByTagName('audio')[0];
    audio.play();
  });
  $('.choice2').on('click', function(){
    $('body').addClass('theme2');
    $('.back').toggleClass('back-2');
    $(modal1).hide();
    var audio2 = document.getElementsByTagName('audio')[1];
    audio2.play();
  });
}

function initializeApp(){
  clickHandlers();
}

function clickHandlers(){
  $('.close2').on('click', function () {
    var modal2 = document.getElementById('modal2');
    $(modal2).hide();
    resetStats();
  });
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
      calculateAccuracy();
      console.log('cards match, match number is now: ', matches);
      attempts += 1;
      calculateAccuracy();
      $('.stats-bar-section:nth-child(5)').text(attempts);
      if (matches === max_matches) {
        var modal2 = document.getElementById('modal2');
        $(modal2).show();
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
      }, 700);
    }
  }
}

function calculateAccuracy(){
  accuracy = matches/attempts * 100;
  accuracy = Math.floor(accuracy) + '%';
  $('.stats-bar-section:nth-child(7)').text(accuracy);
}

function resetStats(){
  matches = 0;
  attempts = 0;
  accuracy = 0;
  games_played+=1;
  $('.stats-bar-section:nth-child(3)').text(games_played);
  $('.stats-bar-section:nth-child(5)').text(attempts);
  $('.stats-bar-section:nth-child(7)').text(accuracy);
  flipAllCardsBack();
  // shuffleDeck(images_array);
}

function flipAllCardsBack(){
  $('.back').toggleClass('hidden', false);
}

// function shuffleDeck(array){
//   var randomNumber;
//   var arrayLength = images_array.length-1;
//   var spotHolder;
//   for (var i = 0; i < arrayLength; i++){
//     randomNumber = Math.floor(Math.random() * arrayLength);
//     spotHolder = array[i];
//     array[i] = array[randomNumber];
//     array[randomNumber] = spotHolder;
//   }
//   return array;
// }
