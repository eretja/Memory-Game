// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// array where we will hold all cards and after opening the window will hold them
let card = document.getElementsByClassName("card");
let cards = [...card];
let counter = document.querySelector(".moves");
let stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");
let deck = document.getElementById("holder");
let begin = document.querySelector('.time');
let shuffledCards = cards;
begin.addEventListener('click', beginTime); //after opening browser beginGame function is activated
window.document.onload = beginGame(); /* https://stackoverflow.com/questions/588040/window-onload-vs-document-onload */
//start game
var openedCards = []; //https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
function beginGame() {
shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++) {
        deck.appendChild(shuffledCards[i]);
        shuffledCards[i].classList.remove('open', 'show', 'match', 'disabled');
    }
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.visibility = "initial";
    }
    var second = 0;
    var minute = 0;
    let time = document.querySelector(".time");
    time.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    beginTime();
}
//counts the number of moves a player takes
function numOfMoves() {
    moves++;
    counter.innerHTML = moves;
    // star rating changes depending on the number of moves it took to complete the game
    if (moves > 7 && moves < 10) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "hidden";
            }
        }
    } else if (moves > 15) {
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "hidden";
            }
        }
    }
}

//set time parameters
var second = 0;
var minute = 0;
var time = document.querySelector(".time");
var interval;

function beginTime() {
    interval = setInterval(function() {
        time.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000);
}
// toggle between open and show class to display open Cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");

}
// cardsFlipped function adds the selected cards to openCards array and checks if the cards are matched or not
let matchedCard = document.getElementsByClassName("match");

function cardFlipped() {
    openedCards.push(this);
    var flips = openedCards.length;
    if (flips === 2) {
        numOfMoves();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
        } else {
            unmatched();
        }
    }
}
//matched function created when 2 cards matched https://pastebin.com/aYw6uJUb
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
//unmatched function created when 2 cards unmatched
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disabled();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    }, 500);
}

function disabled() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add("disabled");
    })
}

function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove("disabled");
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    })
}
let popup = document.getElementById("popup");
let endicon = document.querySelector(".close");

function closePopup() {
    endicon.addEventListener("click", function() {
        popup.classList.remove("show");
        beginGame();
    })
}
// greatJob function when all cards are opened correctly
function greatJob() {
    if (matchedCard.length == 16) {
        clearInterval(interval);
        finalTime = time.innerHTML;
        popup.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("totalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;
        closePopup();
    }
}
// event listener for each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardFlipped);
    card.addEventListener("click", greatJob);
};
// play again
function playAgain() {
    popup.classList.removeClass("show", "deck");
    beginGame();
}

function restart() {
  const body = document.querySelector('body');
    body.classList.remove('popup');
    body.classList.remove('deck');
    for(i = 0; i < openedCards.length; ++i){
    openedCards[i].classList.remove("show", "open", "unmatched");
  }
  openedCards = [];
  beginGame();
};
