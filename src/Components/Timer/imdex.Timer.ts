import { createElement } from '../../Utils/index.Utils';
import {
  TIMER_CLASS,
  TIMER_MIN_CLASS,
  TIMER_SEC_CLASS,
} from '../../Constants/classNames';
import Observer from '../../Observer/index.Observer';
import { ROLE_PAINTER } from '../../Constants/index.Constants';

export default class Timer {
  parentElement: HTMLElement;

  minBlock!: HTMLElement;

  secBlock!: HTMLElement;

  timerId!: NodeJS.Timeout;

  min: number;

  sec: number;

  observer: Observer;

  constructor(parentElement: HTMLElement, min: number, observer: Observer) {
    this.parentElement = parentElement;
    this.min = min;
    this.sec = 0;
    this.observer = observer;
  }

  render() {
    const mainBlock = createElement('div', TIMER_CLASS);
    this.minBlock = createElement(
      'p',
      TIMER_MIN_CLASS,
      mainBlock,
      null,
      `${this.min}`
    );
    this.secBlock = createElement('p', TIMER_SEC_CLASS, mainBlock, null, '00');
  }

  updateTimer() {
    const { min } = this;
    const { sec } = this;
    if (this.sec === 0 && this.min === 0) {
      const state = this.observer.getState();
      if (state.role === ROLE_PAINTER) state.game.stopGame(state.wordToGuess);
    } else {
      if (this.sec === 0) {
        this.min -= 1;
        this.sec = 60;
      }
      this.sec -= 1;
    }
    this.minBlock.textContent = `0${min}`;
    this.secBlock.textContent = `${sec < 10 ? 0 + sec : sec}`;
  }

  start() {
    this.render();
    this.timerId = setInterval(this.updateTimer, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }
}
