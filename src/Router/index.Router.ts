import Observer from '../Observer/index.Observer';
import { createElement } from '../Utils/index.Utils';
import { APP_NAME } from '../Constants/index.Constants';

type RenderPageCallback = (
  parentElem: HTMLElement,
  observer: Observer,
  router: Router
) => void;

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

  private renderRoute = (route: string) => {
    const routeObj = this.routes.find((routeData) => routeData.route === route);

    if (!routeObj) return;

    document.title = `${APP_NAME.toUpperCase()} | ${routeObj.title}`;
    this.pagesContainer.textContent = '';
    routeObj.renderCb(this.pagesContainer, this.observer, this);
  };

  public goToPage(route: string) {
    const { pathname } = window.location;

    if (pathname === route) return;

    this.renderRoute(route);
    window.history.pushState(null, '', route);
  }

  public renderCurrentRoute = () => {
    const { pathname } = window.location;

    this.renderRoute(pathname);
  };

  public createLink(
    title: string,
    route: string,
    parent: Element,
    renderPage: RenderPageCallback
  ): HTMLAnchorElement {
    const a = <HTMLAnchorElement>(
      createElement('a', undefined, parent, null, title)
    );

    this.routes.push({ route, renderCb: renderPage, title });

    a.href = route;
    a.addEventListener('click', (e) => {
      e.preventDefault();

      this.goToPage(route);
    });

    return a;
  }
}
