import type Observer from '../../Observer/index.Observer';
import type Router from '../../Router/index.Router';
import { APP_NAME } from '../../Constants/index.Constants';
import {
  createDropdown,
  createDropup,
  createLangDropdown,
  createElement,
  createLink,
} from '../../Utils/index.Utils';
import {
  HEADER_CN,
  HEADER_TITLE_CN,
  FOOTER_CN,
  MAIN_CN,
  HEADER_NAV_CN,
  HEADER_LANG_BTN_CN,
  HEADER_USER_BTN_CN,
  HEADER_USER_SPAN_CN,
  FOOTER_RS_LOGO_CN,
  FOOTER_YEAR_CN,
  FOOTER_AUTHORS_CN,
} from './constants.PageLayout';
import { LOGIN, SETTINGS, STATISTICS } from '../../Constants/routes';
import { PRIMARY_TEXT_CLASS, WRAPPER_CLASS } from '../../Constants/classNames';
import '../../assets/images/rs_logo.svg';

const createUserDropdown = (observer: Observer, router: Router) => {
  const { langData, name } = observer.getState();
  const { LOGOUT, STATISTICS: STAT, SETTINGS: SETS } = langData;

  const userNameSpan = createElement(
    'span',
    HEADER_USER_SPAN_CN,
    null,
    null,
    name
  );
  const userDropdownBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, HEADER_USER_BTN_CN],
    null,
    [userNameSpan]
  );

  const statLink = createLink(router, STATISTICS, PRIMARY_TEXT_CLASS, STAT);
  const settingsLink = createLink(router, SETTINGS, PRIMARY_TEXT_CLASS, SETS);
  const signOutBtn = createLink(router, LOGIN, PRIMARY_TEXT_CLASS, LOGOUT);

  const userDropdown = createDropdown(userDropdownBtn, [
    statLink,
    settingsLink,
    signOutBtn,
  ]);

  return userDropdown;
};

const createHeader = (observer: Observer, router: Router) => {
  const wrapper = createElement('div', WRAPPER_CLASS);

  const title = createElement(
    'h1',
    HEADER_TITLE_CN,
    null,
    null,
    APP_NAME.toUpperCase()
  );
  wrapper.append(title);

  const menuContainer = createElement('nav', HEADER_NAV_CN);

  const langDropdown = createLangDropdown(observer, HEADER_LANG_BTN_CN);
  menuContainer.append(langDropdown);

  const userDropdown = createUserDropdown(observer, router);
  menuContainer.append(userDropdown);

  wrapper.append(menuContainer);

  const header = createElement('header', HEADER_CN);
  header.append(wrapper);

  return header;
};

const createAuthors = (observer: Observer) => {
  const { AUTHORS } = observer.getState().langData;

  const authorsBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, FOOTER_AUTHORS_CN],
    null,
    null,
    AUTHORS
  );

  const dosenk = <HTMLLinkElement>(
    createElement('a', PRIMARY_TEXT_CLASS, null, null, 'dosenk')
  );
  dosenk.href = 'https://github.com/dosenk/';
  const vladimir = <HTMLLinkElement>(
    createElement('a', PRIMARY_TEXT_CLASS, null, null, 'vladimir6332')
  );
  vladimir.href = 'https://github.com/vladimir6332';
  const krohnic = <HTMLLinkElement>(
    createElement('a', PRIMARY_TEXT_CLASS, null, null, 'KrohNic')
  );
  krohnic.href = 'https://github.com/KrohNic';

  const authorsMenu = createDropup(authorsBtn, [dosenk, vladimir, krohnic]);

  return authorsMenu;
};

const createFooter = (observer: Observer) => {
  const wrapper = createElement('div', WRAPPER_CLASS);

  const authorsMenu = createAuthors(observer);
  wrapper.append(authorsMenu);

  const year = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, FOOTER_YEAR_CN],
    null,
    null,
    '2021'
  );
  wrapper.append(year);

  const rsLogo = <HTMLImageElement>createElement('img', FOOTER_RS_LOGO_CN);
  rsLogo.alt = 'Rolling Scopes';
  rsLogo.src = './rs_logo.svg';

  const rsLink = <HTMLLinkElement>createElement('a', null, null, [rsLogo]);
  rsLink.href = 'https://rs.school/';
  wrapper.append(rsLink);

  const footer = createElement('footer', FOOTER_CN);
  footer.append(wrapper);

  return footer;
};

const createLayout = (observer: Observer, router: Router) => {
  const header = createHeader(observer, router);
  const main = createElement('main', MAIN_CN);
  const footer = createFooter(observer);
  const wholeLayout = new DocumentFragment();

  wholeLayout.append(header, main, footer);

  return {
    wholeLayout,
    main,
  };
};

export default createLayout;
