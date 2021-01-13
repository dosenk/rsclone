import Login from '../Components/Login/index.Login';
import Observer from '../Observer/index.Observer';
import Router from '../Router/index.Router';

export default (
  parent: HTMLElement,
  observer: Observer,
  router: Router
): void => {
  const login = new Login(parent, observer, router);
};
