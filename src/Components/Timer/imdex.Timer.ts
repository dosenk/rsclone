import { createElement } from '../../Utils/index.Utils';
import {
  TIMER_CLASS,
  TIMER_MIN_CLASS,
  TIMER_SEC_CLASS,
} from '../../Constants/classNames';

export default class Timer {
  parentElement: HTMLElement;

  min: number;

  constructor(parentElement: HTMLElement, min: number) {
    this.parentElement = parentElement;
    this.min = min;
  }

  render() {
    const mainBlock = createElement('div', TIMER_CLASS);
    this.minBlock = createElement('p', TIMER_MIN_CLASS);
    this.secBlock = createElement('p', TIMER_SEC_CLASS);
  }
}
