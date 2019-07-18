const tallGrass = document.querySelectorAll('.grass');
const scoreBoard = document.querySelector('.score');
const munchlax = document.querySelectorAll('.munch');
const btnStart = document.querySelector('button');
const bonkSound = document.querySelector('audio');
const finish = document.querySelector('Found item.mp3')
const startScreen = document.querySelector('.start-screen');
const showScore = document.querySelector('.show-score');

let score = 0;
let lastPatch;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomPatch(tallGrass) {
  const idx = Math.floor(Math.random() * tallGrass.length);
  const grass = tallGrass[idx];

  if (grass === lastPatch) {
    return randomPatch(tallGrass);
  }
  lastPatch = grass;
  return grass;
}

function peep() {
  const time = randomTime(600, 3000);
  const grass = randomPatch(tallGrass);

  grass.classList.add('up');

  setTimeout(() => {
    grass.classList.remove('up');
    scoreBoard.classList.remove('add');
    if (!timeUp) peep();
  }, time);
}


function start() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  scoreBoard.classList.remove('add');
  startScreen.classList.add('hide');
  

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
    startScreen.classList.remove('hide');

    if (score > 0) {
      showScore.classList.add('show');
      const message = 'You collected ' + score + ' berries' + (score >= 20 ? ", nice!" : '');
      showScore.textContent = message; 
    }

  }, 10000);
}

function bonk(e) {
  bonkSound.currentTime = 0;
  if (!timeUp) {
    bonkSound.play();
    scoreBoard.classList.add('add');
    score++;
    scoreBoard.textContent = score;
  }
}

munchlax.forEach(munch => {
  munch.addEventListener('click', bonk);
});

btnStart.addEventListener('click', start);