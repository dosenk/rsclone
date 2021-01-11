import Observer from '../Observer/index.Observer';
import { createElement } from '../Utils/index.Utils';
import { APP_NAME } from '../Constants/index.Constants';

type RenderPageCallback = (parentElem: HTMLElement, observer: Observer) => void;

export default class Router {
  private readonly routes: Array<{
    route: string;
    title: string;
    renderCb: RenderPageCallback;
  }> = [];

  private readonly pagesContainer: HTMLElement;

  private readonly observer: Observer;

  constructor(pagesContainer: HTMLElement, observer: Observer) {
    this.pagesContainer = pagesContainer;
    this.observer = observer;

    this.setListeners();
  }

  private setListeners() {
    window.addEventListener('popstate', (e) => {
      e.preventDefault();
      this.renderCurrentRoute();
    });
  }

  private renderPage(title: string, renderer: RenderPageCallback) {
    document.title = `${APP_NAME.toUpperCase()} | ${title}`;
    this.pagesContainer.textContent = '';
    renderer(this.pagesContainer, this.observer);
  }

  public renderCurrentRoute = () => {
    const { pathname } = window.location;
    const routeObj = this.routes.find(({ route }) => route === pathname);

    if (routeObj) this.renderPage(routeObj.title, routeObj.renderCb);
  };

  public createLink(
    title: string,
    route: string,
    parent: Element,
    renderRoute: RenderPageCallback,
  ): HTMLAnchorElement {
    const a = <HTMLAnchorElement>(
      createElement('a', undefined, parent, null, title)
    );

    this.routes.push({ route, renderCb: renderRoute, title });

    a.href = route;
    a.addEventListener('click', (e) => {
      const { pathname } = window.location;

      e.preventDefault();

      if (pathname === route) return;

      this.renderPage(title, renderRoute);
      window.history.pushState(null, '', route);
    });

    return a;
  }
}
