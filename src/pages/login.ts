import type Observer from '../Observer/index.Observer';
import type Router from '../Router/index.Router';
import Login from '../Components/Login/index.Login';
import createLayoutElements from '../Components/PageLayout/index.PageLayout';

export default (
  parent: HTMLElement,
  observer: Observer,
  router: Router
): void => {
  const { main, wholeLayout } = createLayoutElements(observer, router);
  const login = new Login(main, observer, router);

  login.start();
  parent.append(wholeLayout);
};
