const app = {};

app.frillyStuff = function() {

  //button actions
  var $bodyButton = $('.bodyButton');

  $bodyButton.on('mouseover', function() {
    $(this).addClass('tossing');
  });

  $bodyButton.on('mouseout', function() {
    $(this).removeClass('tossing');
  });

  //instructions modal
  $('#new2dis').on('click', function() {
    $('#instructions').fadeIn().removeClass('hidden');
  });

  // add back the class of "hidden" once element with a class of "close" is clicked
  $('#close').on('click', function() {
    $('#instructions').fadeOut('200').addClass('hidden');
  });

  $('#play').on('click', function() {
  $('#g').removeClass('hidden').fadeIn();
  });

  $('#start').on('click', function() {
  $('#g').removeClass('hidden');
  window.location.replace('index.html');
  });
}

app.randomizeColor = function() {
  var textColors = ["#D81B60", "#8E24AA", "#512DA8", "#0097A7", "#689F38",  "#FBC02D", "#F4511E"], random;

  const heading = $('h1');
  const words = heading.text().split('');
  heading.html('');
  for(var i=0; i<words.length; i++) {
      random = Math.floor(Math.random() * textColors.length);
      var span = $('<span>' + words[i] + '</span>').css("color", textColors[random]);
      heading.append(span);
  }
}

// Declaring global variables
// app.timer = 40000;
app.pair = [];
app.count = 0;
app.pairVal = 0;
$score = $('h4');

app.gameCards = [
  {
    img: "images/monster1.svg",
    number: "1"
  },
  {
    img: "images/monster1.svg",
    number: "1"
  },
  {
    img: "images/monster2.svg",
    number: "2"
  },
  {
    img: "images/monster2.svg",
    number: "2"
  },
  {
    img: "images/monster3.svg",
    number: "3"
  },
  {
    img: "images/monster3.svg",
    number: "3"
  },
  {
    img: "images/monster4.svg",
    number: "4"
  },
  {
    img: "images/monster4.svg",
    number: "4"
  },
  {
    img: "images/monster5.svg",
    number: "5"
  },
  {
    img: "images/monster5.svg",
    number: "5"
  },
  {
    img: "images/monster6.svg",
    number: "6"
  },
  {
    img: "images/monster6.svg",
    number: "6"
  }
];

app.handleCardShuffle = function() {
  // use _.shuffle to shuffle the array (.underscore.js)
  app.shuffleGameCards = _.shuffle(app.gameCards);
  // in the ul, create a new li for each card
  app.shuffleGameCards.forEach(function(card) {
    $("ul").append(`<li class="card" data-cardnum="${card.number}"><div class="flip-container"><div class="flip back"><img src="${card.img}"></div><div class="flip front"></div></div></li>`);
  });
}

app.handleGameConfig = function() {
// when the user clicks on an li/card, flip that card over, then flip the second card over
  $("ul").on("click", "li", function(){
    var $flipContainer = $(this).children('.flip-container');
    // Find child of .card with class .flip-container
    // Add class of flipped
    if ($flipContainer.hasClass('flipped') === false) {
      // add 1 to the count of matched cards
      app.count++;
      app.cardNumber = $(this).data('cardnum');
      app.pair.push(app.cardNumber);

      $flipContainer.addClass("flipped");
      // if 2 cards have been flipped
      if (app.count === 2){
        // if 1st card equals 2nd card
        if (app.pair[0] === app.pair[1]){
          // If they match, increase pairVal by 1, add class of matched
          app.pairVal++;
          $(`li[data-cardnum=${app.cardNumber}]`).addClass('matched');
          app.pair = [];
          app.count = 0;
          // if all cards are matched
          if (app.pairVal === 6){
            $('body').fadeOut(1000);
            window.location.replace('win.html');
          }
        } else {
          // if the cards don't match, have them flip back over
          setTimeout(function() {
            $(".flip-container").removeClass('flipped');
          }, 500);
          app.pair = [];
          app.count = 0;
        }
      }
    }
  });
}

app.init = function() {
  app.frillyStuff();
  app.randomizeColor();
  app.handleCardShuffle();
  app.handleGameConfig();
}

$(function() {
  app.init();
});
