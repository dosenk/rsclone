import type Observer from '../../Observer/index.Observer';
import type Router from '../../Router/index.Router';
import { APP_NAME } from '../../Constants/index.Constants';
import {
  createDropdown,
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
} from './constants.PageLayout';
import { LOGIN, SETTINGS, STATISTICS } from '../../Constants/routes';
import { PRIMARY_TEXT_CLASS } from '../../Constants/classNames';
import languages from '../../langDictionaries/index.langDictionaries';

const createUserDropdown = (observer: Observer, router: Router) => {
  const { langData, name } = observer.getState();
  const { LOGOUT, STATISTICS: STAT, SETTINGS: SETS } = langData;

  const userDropdownBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, HEADER_BTN_CN],
    null,
    null,
    name
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

const createLangDropdown = (observer: Observer) => {
  const { lang: currentLang } = observer.getState().langData;

  const dropdownBtn = createElement(
    'div',
    [PRIMARY_TEXT_CLASS, HEADER_BTN_CN],
    null,
    null,
    currentLang
  );

  const langList = Object.values(languages);
  const dropdownItems: Array<Element> = [];

  langList.forEach((langDict) => {
    const { lang } = langDict;
    if (lang === currentLang) return;

    const dropdownItem = createElement(
      'div',
      PRIMARY_TEXT_CLASS,
      null,
      null,
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
  const header = createElement('header', HEADER_CN);

  const title = createElement(
    'h1',
    HEADER_TITLE_CN,
    null,
    null,
    APP_NAME.toUpperCase()
  );
  header.append(title);

  const menuContainer = createElement('nav', HEADER_NAV_CN);

  const langDropdown = createLangDropdown(observer);
  menuContainer.append(langDropdown);

  const userDropdown = createUserDropdown(observer, router);
  menuContainer.append(userDropdown);

  header.append(menuContainer);

  return header;
};

const createFooter = () => {
  const footer = createElement('footer', FOOTER_CN);

  return footer;
};

const createLayout = (observer: Observer, router: Router) => {
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

export default createLayout;
