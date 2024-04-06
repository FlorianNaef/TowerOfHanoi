//pickup, putdown, look

class Disk {
  constructor(size, color) {
    this.size = size;
    this.color = color;
  }
}

class Game {
  towers = new Array(3);

  constructor() {
    this.inHand = null;
    this.towers[0] = [
      new Disk(3, colorPalette[0]),
      new Disk(2, colorPalette[1]),
      new Disk(1, colorPalette[2]),
    ];
    this.towers[1] = [];
    this.towers[2] = [];
  }

  pickup(towerNumber) {
    let tower = this.towers[towerNumber];
    if (towerNumber < 0 || towerNumber > 3) {
      showError('towerNumber does not exist');
      return;
    }
    if (this.inHand) {
      showError('alrady a disk in hand');
      return;
    }
    if (tower.length === 0) {
      showError('tower empty');
      return;
    }
    this.inHand = tower.pop();
    return;
  }

  putdown(towerNumber) {
    let tower = this.towers[towerNumber];
    if (towerNumber < 0 || towerNumber > 3) {
      showError('towerNumber does not exist');
      return;
    }
    if (!this.inHand) {
      showError('no disk in hand');
      return;
    }
    if (tower.length === 3) {
      showError('tower already full');
      return;
    }
    if (tower.at(-1) && tower.at(-1).size < this.inHand.size) {
      showError('cannot stack disk with bigger size on smaller disk');
      return;
    }
    tower.push(this.inHand);
    this.inHand = null;
    showState(this.towers);
    checkState(this.towers);
    return;
  }
}

function showError(message) {
  error = true;
  element = document.createElement('article');
  element.setAttribute('class', 'error');
  element.innerText = 'Error: ' + message;
  document.querySelector('.error-container').append(element);
}

function showState(state) {
  historyContainer = document.querySelector('.history-container');
  historyContainer.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    let tower = document.createElement('div');
    tower.setAttribute('class', 'tower');
    for (let j = 0; j < state[i].length; j++) {
      let disk = document.createElement('div');
      disk.setAttribute('class', 'disk');
      disk.setAttribute('style', 'background-color: ' + state[i][j].color);
      tower.append(disk);
    }
    historyContainer.append(tower);
  }
  console.log(state);
}

function checkState(state) {
  let correct = true;
  for (let i = 0; i < state[2].length; i++) {
    if (state[2][i] < state[2][i + 1]) {
      correct = false;
    }
  }
  if (!error && state[2].length === 3 && correct) toggleModal();
}

function toggleModal() {
  successModal = document.querySelector('.success-modal');
  if (successModal.hasAttribute('open')) {
    successModal.removeAttribute('open');
    return;
  }
  successModal.setAttribute('open', '');
}

function runCode() {
  game = new Game();
  error = false;
  document.querySelector('.history-container').innerHTML = '';
  document.querySelector('.error-container').innerHTML = '';
  code = document.querySelector('.codearea').value;
  return eval(code);
}

function reset() {
  game = new Game();
  error = false;
  document.querySelector('.history-container').innerHTML = '';
  document.querySelector('.error-container').innerHTML = '';
  document.querySelector('.codearea').value = '';
}

let game;
let error;
let colorPalette = ['#55C21E', '#F2DF0D', '#FF9500'];

function setup() {
  game = new Game();
}
setup();
