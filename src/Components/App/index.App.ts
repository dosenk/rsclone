import LangDictionaries from '../../LangDictionaries/index.langDictionaries';
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
    const langData = LangDictionaries[DEFAULT_LANGUAGE];
    this.observer = new Observer({ langData });
    this.router = new Router(this.mainElement, this.observer);
  }

  private createNav() {
    const nav = <HTMLElement>createElement('nav', ['nav'], this.parentElem);
    const rendersList = Object.values(pagesRenders);
    const titlesList = Object.values(pagesTitles);
    const routesList = Object.values(routes);

    rendersList.forEach((render, index) => {
      this.router.createLink(titlesList[index], routesList[index], nav, render);
    });

    this.router.renderCurrentRoute();
  }

  public start() {
    this.createNav();
    this.parentElem.append(this.mainElement);
  }
}
