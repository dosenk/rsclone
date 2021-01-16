import langDictionaries from '../../langDictionaries/index.langDictionaries';
import Observer from '../../Observer/index.Observer';
import { DEFAULT_LANGUAGE } from '../../Constants/index.Constants';
import pagesRenders from '../../pages/index.pages';
import Router from '../../Router/index.Router';
import { createElement } from '../../Utils/index.Utils';
import * as routes from '../../Constants/routes';
import * as pagesTitles from '../../Constants/pages';

export default class App {
  private readonly observer: Observer;

  private readonly parentElem: HTMLElement = document.body;

  private readonly mainElement: HTMLElement = createElement('main', ['main']);

  private readonly router: Router;

  constructor() {
    const langData = langDictionaries[DEFAULT_LANGUAGE];
    this.observer = new Observer({ langData });
    this.router = new Router(this.mainElement, this.observer);
    this.router.addRoutes(routes, pagesTitles, pagesRenders);
  }

  private createNav() {
    const nav = <HTMLElement>createElement('nav', ['nav'], this.parentElem);

    this.router.createLinks(nav);
    this.router.renderCurrentRoute();
  }

  public start() {
    this.createNav();
    this.parentElem.append(this.mainElement);
  }
}
