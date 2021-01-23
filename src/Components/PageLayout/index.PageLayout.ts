import type Observer from '../../Observer/index.Observer';
import type Router from '../../Router/index.Router';
import { APP_NAME } from '../../Constants/index.Constants';
import {
  createDropdown,
  createDropup,
  createElement,
  createLink,
} from '../../Utils/index.Utils';
import {
  HEADER_CN,
  HEADER_TITLE_CN,
  FOOTER_CN,
  MAIN_CN,
  HEADER_NAV_CN,
  HEADER_BTN_CN,
  HEADER_LANG_ITEM_CN,
  HEADER_LANG_ICO_CN,
  FOOTER_RS_LOGO_CN,
  FOOTER_YEAR_CN,
  FOOTER_BTN_CN,
} from './constants.PageLayout';
import { LOGIN, SETTINGS, STATISTICS, GAME } from '../../Constants/routes';
import { PRIMARY_TEXT_CLASS, WRAPPER_CLASS } from '../../Constants/classNames';
import languages from '../../langDictionaries/index.langDictionaries';
import '../../assets/images/rs_logo.svg';

const createUserDropdown = (observer: Observer, router: Router) => {
  const { langData, name } = observer.getState();
  const {
    LOGOUT,
    STATISTICS: statTitle,
    SETTINGS: settingsTitle,
    GAME: gameTitle,
  } = langData;
  const dropdownItems: Array<Element> = [];
  const itemsData = [
    { route: GAME, title: gameTitle },
    { route: SETTINGS, title: settingsTitle },
    { route: STATISTICS, title: statTitle },
    { route: LOGIN, title: LOGOUT },
  ];

  itemsData.forEach(({ route, title }) => {
    if (route === window.location.pathname) return;

    const dropdownItem = createLink(router, route, PRIMARY_TEXT_CLASS, title);

    dropdownItems.push(dropdownItem);
  });

  const userDropdownBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, HEADER_BTN_CN],
    null,
    null,
    name
  );
  const userDropdown = createDropdown(userDropdownBtn, dropdownItems);

  return userDropdown;
};

const createLangDropdown = (observer: Observer) => {
  const { lang: currentLang, flag: currentFlag } = observer.getState().langData;

  const currentIco = <HTMLImageElement>createElement('img', HEADER_LANG_ICO_CN);
  currentIco.alt = currentLang;
  currentIco.src = currentFlag;

  const dropdownBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, HEADER_BTN_CN, HEADER_LANG_ITEM_CN],
    null,
    [currentIco],
    currentLang
  );

  const langList = Object.values(languages);
  const dropdownItems: Array<Element> = [];

  langList.forEach((langDict) => {
    const { lang, flag } = langDict;
    if (lang === currentLang) return;

    const ico = <HTMLImageElement>createElement('img', HEADER_LANG_ICO_CN);
    ico.alt = lang;
    ico.src = flag;

    const dropdownItem = createElement(
      'div',
      [PRIMARY_TEXT_CLASS, HEADER_LANG_ITEM_CN],
      null,
      [ico],
      lang
    );

    dropdownItem.addEventListener('click', () => {
      observer.actions.setLang(langDict);
    });

    dropdownItems.push(dropdownItem);
  });

  const dropdown = createDropdown(dropdownBtn, dropdownItems);

  return dropdown;
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

  const langDropdown = createLangDropdown(observer);
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
    [PRIMARY_TEXT_CLASS, FOOTER_BTN_CN],
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
