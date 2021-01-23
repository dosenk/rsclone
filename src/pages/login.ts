import type Observer from '../Observer/index.Observer';
import type Router from '../Router/index.Router';
import Login from '../Components/Login/index.Login';

export default (
  parent: HTMLElement,
  observer: Observer,
  router: Router
): void => {
  const login = new Login(parent, observer, router);

  login.start();
};
