import { WIN, RESET } from './config';
import { rollDice } from './helper';
export const state = {
  play1: {
    active: true,
    curDices: [],
    totalDices: [],
    total: 0,
    winner: false,
  },
  play2: {
    active: false,
    curDices: [],
    totalDices: [],
    total: 0,
    winner: false,
  },

  curDice: '',
  start: true,
};

export function setDiceNum() {
  if (state.start) state.start = !state.start;
  const diceNum = rollDice();

  state.curDice = diceNum;
  //console.log(diceNum);
  if (diceNum == RESET) {
    console.log(1);
    nextPlay();
  } else {
    updatePlayerState(diceNum);
  }
}

function nextPlay() {
  if (state.play1.active) setDataForReset(state.play1);
  else setDataForReset(state.play2);
  changeActiveState();
}

function changeActiveState() {
  state.play1.active = !state.play1.active;
  state.play2.active = !state.play2.active;
}

function setDataForReset(player) {
  player.curDices = [];
  player.totalDices.push(0);
}

function updatePlayerState(num) {
  if (state.play1.active) updateData(state.play1, num);
  else updateData(state.play2, num);
}
function updateData(player, num) {
  player.curDices.push(num);
}

export const updateDataForHold = function () {
  if (state.play1.active) updatePlayerStateForHold(state.play1);
  else updatePlayerStateForHold(state.play2);
  changeActiveState();
};

function updatePlayerStateForHold(player) {
  player.total = player.curDices.reduce((acc, cur) => acc + cur, 0);

  player.totalDices.push(player.total);
  const sum = player.totalDices.reduce((acc, cur) => acc + cur, 0);
  if (sum >= WIN) {
    player.winner = true;
  }
  player.curDices = [];
}

export const resetState = function () {
  state.play1.active = true;
  state.play1.curDices = [];
  state.play1.totalDices = [];
  state.play1.winner = false;

  state.play2.active = false;
  state.play2.curDices = [];
  state.play2.totalDices = [];
  state.play2.winner = false;

  state.curDice = '';
  state.start = true;
};
