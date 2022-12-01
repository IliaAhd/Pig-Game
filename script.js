'use strict';

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let dice = Math.trunc(Math.random() * 6) + 1;
let scores, currentScore, activePlayer, playing;

function reset() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  document.querySelector(`.current-label--${activePlayer}`).textContent = 'Current';
  
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  diceEl.classList.add('hidden'); 
  player0El.classList.remove('player--winner'); 
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
reset();

function resetScore() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function score() {
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  } else {
    resetScore();
    switchPlayer();
  }
}

function diceRoll() {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    score();
  }
}

function holdScore() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
  }

  if (scores[activePlayer] >= 100) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

    document.querySelector(`.current-label--${activePlayer}`).textContent = 'You';

    document.querySelector(`#current--${activePlayer}`).textContent = 'Win';

    playing = false;
  } else {
    resetScore();
    switchPlayer();
  }
}

function fPress(f) {
  if (f.key === 'f' | f.key === 'F' && activePlayer === 0){
    diceRoll();
  }
}
function kPress(k) {
  if (k.key === 'k' | k.key === 'K' && activePlayer === 1){
    diceRoll();
  }
}
function holdPress(h) {
  console.log(h.key);
  if (h.key === ' ' || h.key === 'h' || h.key === 'H'){
    holdScore();
  }
}

btnRoll.addEventListener('click', diceRoll);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', reset);
document.addEventListener('keydown', fPress);
document.addEventListener('keydown', kPress);
document.addEventListener('keydown', holdPress);