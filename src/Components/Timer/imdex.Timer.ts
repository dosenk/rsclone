import { createElement } from '../../Utils/index.Utils';
import {
  TIMER_CLASS,
  TIMER_MIN_CLASS,
  TIMER_SEC_CLASS,
} from '../../Constants/classNames';
import Observer from '../../Observer/index.Observer';

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
    if (this.sec !== 0 && this.min !== 0) {

    } else {
        this.observer.actions.setGameEndInfo({guessWord: })
    }
    this.minBlock.textContent = `${min}`;
    this.secBlock.textContent = `${sec}`;
  }

  start() {
    this.render();
    this.timerId = setInterval(() => {}, 1000);
  }
}
