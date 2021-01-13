import Registration from '../Components/Registration/index.Registration';
import Router from '../Router/index.Router';

export default (parent: HTMLElement, _: Object, router: Router): void => {
  const regist = new Registration(parent, router);
};
