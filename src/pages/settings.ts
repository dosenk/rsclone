import type Observer from '../Observer/index.Observer';
import type Router from '../Router/index.Router';
import createLayoutElements from '../Components/PageLayout/index.PageLayout';

export default (
  parent: HTMLElement,
  observer: Observer,
  router: Router
): void => {
  const { main, wholeLayout } = createLayoutElements(observer, router);

  main.append('settings');
  parent.append(wholeLayout);
};
