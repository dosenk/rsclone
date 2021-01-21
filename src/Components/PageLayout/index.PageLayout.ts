import type Observer from '../../Observer/index.Observer';
import type Router from '../../Router/index.Router';
import { APP_NAME } from '../../Constants/index.Constants';
import { createElement, createLink } from '../../Utils/index.Utils';
import {
  HEADER_CN,
  HEADER_TITLE_CN,
  FOOTER_CN,
  MAIN_CN,
} from './constants.PageLayout';
import './styles.PageLayout.scss';
import { STATISTICS } from '../../Constants/routes';

const createHeader = (observer: Observer, router: Router) => {
  const { langData, name } = observer.getState();
  const header = createElement('header', HEADER_CN);

  const title = createElement(
    'h1',
    HEADER_TITLE_CN,
    null,
    null,
    APP_NAME.toUpperCase()
  );
  header.append(title);

  const statLink = createLink(router, STATISTICS);
  header.append(statLink);

  const userMenu = createElement('div', null, null, null, name);
  header.append(userMenu);

  return header;
};

const createFooter = () => {
  const footer = createElement('footer', FOOTER_CN);

  return footer;
};

export default (observer: Observer, router: Router) => {
  const header = createHeader(observer, router);
  const main = createElement('main', MAIN_CN);
  const footer = createFooter();
  const wholeLayout = new DocumentFragment();

  wholeLayout.append(header, main, footer);

  return {
    wholeLayout,
    main,
  };
};
