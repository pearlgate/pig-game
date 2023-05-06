import DICE1 from 'url:../dice-1.png';
import DICE2 from 'url:../dice-2.png';
import DICE3 from 'url:../dice-3.png';
import DICE4 from 'url:../dice-4.png';
import DICE5 from 'url:../dice-5.png';
import DICE6 from 'url:../dice-6.png';

class View {
  _data;
  _parentElement = document.querySelector('main');

  addHandlerClickReset(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--new');
      if (!btn) return;
      handler();
    });
  }

  addHandlerClickDice(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--roll');
      if (!btn) return;
      handler();
    });
  }

  addHandlerClickHold(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--hold');
      if (!btn) return;
      handler();
    });
  }

  render(data) {
    this._data = data;
    this._clear();
    this._parentElement.innerHTML = this._innerMarkup();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _innerMarkup() {
    const markup = `<section class="player player--0 ${
      this._data.play1.winner
        ? 'player--winner'
        : this._data.play1.active
        ? 'player--active'
        : ''
    }">
    <h2 class="name" id="name--0">Player 1</h2>
    <p class="score" id="score--0">${this._data.play1.totalDices.reduce(
      (acc, cur) => cur + acc,
      0
    )}</p>
    <div class="current">
      <p class="current-label">Current</p>
      <p class="current-score" id="current--0">${
        this._data.play1.curDices.length == 0
          ? 0
          : this._data.play1.curDices.reduce((acc, cur) => cur + acc, 0)
      }</p>
    </div>
  </section>
  <section class="player player--1 ${
    this._data.play2.winner
      ? 'player--winner'
      : this._data.play2.active
      ? 'player--active'
      : ''
  }">
    <h2 class="name" id="name--1">Player 2</h2>
    <p class="score" id="score--1">${this._data.play2.totalDices.reduce(
      (acc, cur) => cur + acc,
      0
    )}</p>
    <div class="current">
      <p class="current-label">Current</p>
      <p class="current-score" id="current--1">${
        this._data.play2.curDices.length == 0
          ? 0
          : this._data.play2.curDices.reduce((acc, cur) => cur + acc, 0)
      }</p>
    </div>
  </section>

  ${
    this._data.start
      ? ''
      : `<img src="${
          this._data.curDice == 1
            ? DICE1
            : this._data.curDice == 2
            ? DICE2
            : this._data.curDice == 3
            ? DICE3
            : this._data.curDice == 4
            ? DICE4
            : this._data.curDice == 5
            ? DICE5
            : DICE6
        }" alt="Playing dice" class="dice" />`
  }
  <button class="btn btn--new">🔄 New game</button>
  <button class="btn btn--roll">🎲 Roll dice</button>
  <button class="btn btn--hold">📥 Hold</button>`;

    return markup;
  }

  update(data) {
    this._data = data;
    const newMarkup = this._innerMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      console.log(newEl, curEl, newEl.isEqualNode(curEl));

      if (!newEl.isEqualNode(curEl) && !newEl.firstChild?.nodeValue)
        curEl.textContent = newEl.textContent;
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
export default new View();
