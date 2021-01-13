import Login from '../Components/Login/index.Login';
import Router from '../Router/index.Router';

export default (parent: HTMLElement, _: Object, router: Router): void => {
  const login = new Login(parent, router);
};
