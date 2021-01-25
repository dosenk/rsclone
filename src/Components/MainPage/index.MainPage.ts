import Observer from '../../Observer/index.Observer';
import { createElement } from '../../Utils/index.Utils';
import { PRIMARY_BTN_CLASS } from '../../Constants/classNames';
import Router from '../../Router/index.Router';
import { GAME } from '../../Constants/routes';

export default class MainPage {
  private statisticsBlock!: HTMLElement;

  private observer!: Observer;

  private startGameBtn!: HTMLElement;

  private router: Router;

  private name!: string;

  constructor(parentElement: HTMLElement, observer: Observer, router: Router) {
    this.router = router;
    this.observer = observer;
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
    this.renderStatisticsProfileBlock();
    this.renderStatisticsGamesBlock();
  }

  public listener() {
    this.startGameBtn.addEventListener('click', () => {
      this.router.goToPage(GAME);
    });
  }

  private renderStatisticsGamesBlock() {
    const statisticsGame = createElement(
      'div',
      'statistics--game',
      this.statisticsBlock,
      null,
      null
    );

    const statisticsGameItem = createElement(
      'div',
      'statistics--game-item',
      statisticsGame,
      null,
      null
    );

    createElement(
      'h1',
      'statistics--game-item-title',
      statisticsGameItem,
      null,
      this.observer.getState().langData.ONLINE_GAME
    );

    const gameItemContent = createElement(
      'div',
      'statistics--game-item-content',
      statisticsGameItem,
      null,
      null
    );

    const gameItemImg = createElement('img', null, gameItemContent, null, null);
    gameItemImg.setAttribute('src', './src/assets/images/people.png');
    gameItemImg.setAttribute('alt', 'people');

    createElement(
      'div',
      'statistics--game-item-content-text',
      gameItemContent,
      null,
      this.observer.getState().langData.ONLINE_GAME_TEXT
    );

    this.startGameBtn = createElement(
      'button',
      PRIMARY_BTN_CLASS,
      gameItemContent,
      null,
      this.observer.getState().langData.START_GAME
    );
  }

  private renderStatisticsProfileBlock() {
    const statisticsProfile = createElement(
      'div',
      'statistics--profile',
      this.statisticsBlock,
      null,
      null
    );

    const statisticsAvatar = createElement(
      'img',
      'statistics--profile-avatar',
      statisticsProfile,
      null,
      null
    );
    statisticsAvatar.setAttribute('src', './src/assets/images/avatar.jpg');
    statisticsAvatar.setAttribute('alt', 'avatar');

    const statisticsProfileStat = createElement(
      'div',
      'statistics--profile-stat',
      statisticsProfile,
      null,
      null
    );

    this.renderStatisticsProfileStatItem(statisticsProfileStat);
  }

  private async renderStatisticsProfileStatItem(parentElement: HTMLElement) {
    const { name } = this.observer.getState();
    const response = await this.getResponse(name);
    const statisticsObjectKeys = Object.keys(response);
    const lang = this.observer.getState().langData.STATISTIC.split('/');
    lang.forEach((word: string, index: number) => {
      const statItem = createElement(
        'div',
        'statistics--profile-stat-item',
        parentElement,
        null,
        null
      );
      createElement('span', null, statItem, null, `${word}:`);
      createElement(
        'span',
        null,
        statItem,
        null,
        `${response[statisticsObjectKeys[index]]}`
      );
    });
  }

  private async getResponse(name: string) {
    this.name = name;
    const response = await fetch(
      `https://rsclone-node-js.herokuapp.com/stats/stat?name=${this.name}`
    )
      .then((res) => res.json())
      .then((js) => js);
    return response;
  }
}
