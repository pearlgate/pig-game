//'use strict';
import * as model from './model';
import view from './views/View';

const controlReset = function () {
  model.resetState();
  view.render(model.state);
};

const controlDiceResult = function () {
  model.setDiceNum();
  view.render(model.state);
};

const controlHold = function () {
  model.updateDataForHold();
  view.render(model.state);
};

const init = function () {
  view.addHandlerClickReset(controlReset);
  view.addHandlerClickDice(controlDiceResult);
  view.addHandlerClickHold(controlHold);
};

const renders = function () {
  view.render(model.state);
};

renders();
init();
