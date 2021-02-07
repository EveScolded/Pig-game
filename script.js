'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnOpenRules = document.querySelector('.btn--rules');
const btnCloseRules = document.querySelector('.close-rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

const scores = [0, 0];

let activePlayer = 0;
let currentScore = 0;
let playing = true;

// ---------- funkcja zmiany gracza

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //sprawdzenie czy aktywny jest teraz player 0, jeżeli tak zmieniamy na 1
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// ------ rolling the dice

btnRoll.addEventListener('click', () => {
  if (playing) {
    // generate a random roll dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1:if isn't add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if dice = 1 switch player
      switchPlayer();
    }
  }
});

// --------- funkcja otwierania okienka z zasadami gry
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// ---------- funkcja zamykania okienka z zasadami gry
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// ------ zapisywanie the score

btnHold.addEventListener('click', () => {
  if (playing) {
    // add currentScoreto active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is >=100
    if (scores[activePlayer] >= 100) {
      //finishing the game
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEl.classList.add('hidden');
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// new game

btnNew.addEventListener('click', () => {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  switchPlayer();
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
});

// modal open
btnOpenRules.addEventListener('click', openModal);

// close modal
btnCloseRules.addEventListener('click', closeModal);

// zamykanie game rules klawiszem Esc

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
