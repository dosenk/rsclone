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

  min!: number;

  sec: number;

  observer: Observer;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.sec = 0;
    this.observer = observer;
  }

  start(min: number) {
    this.min = min;
    this.render();
    this.updateTimer();
    this.timerId = setInterval(this.updateTimer.bind(this), 1000);
  }

  stop() {
    this.sec = 0;
    clearInterval(this.timerId);
  }

  render() {
    const mainBlock = createElement('div', TIMER_CLASS);
    this.minBlock = createElement(
      'p',
      TIMER_MIN_CLASS,
      mainBlock,
      null,
      `0${this.min}`
    );
    this.secBlock = createElement('p', TIMER_SEC_CLASS, mainBlock, null, '00');
    this.parentElement.append(mainBlock);
  }

  updateTimer() {
    if (this.sec === 0 && this.min === 0) {
      this.stop();
      this.setTimeIsOver();
    } else {
      this.calculateTime();
    }
    this.minBlock.innerText = `0${this.min}`;
    this.secBlock.innerText = `${this.sec < 10 ? `0${this.sec}` : this.sec}`;
  }

  setTimeIsOver() {
    const { role, wordToGuess, game } = this.observer.getState();
    if (role === ROLE_PAINTER) game.stopGame(wordToGuess);
  }

  calculateTime() {
    if (this.sec === 0) {
      this.min -= 1;
      this.sec = 60;
    }
    this.sec -= 1;
  }
}
