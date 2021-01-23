import { createElement } from '../../Utils/index.Utils';

export default class Statistics {
  private statisticsBlock!: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.render(parentElement);
  }

  private render(parentElement: HTMLElement) {
    this.statisticsBlock = createElement(
      'div',
      'statistics',
      parentElement,
      null,
      null
    );
    const statisticsProfile = createElement(
      'div',
      'statistics--profile',
      this.statisticsBlock,
      null,
      null
    );

    const statisticsGame = createElement(
      'div',
      'statistics--game',
      this.statisticsBlock,
      null,
      null
    );
  }
}
