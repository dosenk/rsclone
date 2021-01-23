import type Router from '../Router/index.Router';
import {
  DROPDOWN_CN,
  DROPDOWN_ITEM_CN,
  DROPDOWN_MENU_CN,
  DROPDOWN_BTN_CN,
  DROPUP_MENU_CN,
} from '../Constants/classNames';

export const createElement = (
  tag: string,
  className?: string | Array<string> | null,
  parent?: Element | null,
  childsList?: Array<Node> | Array<Element> | null,
  textContent?: string | null
): HTMLElement => {
  const elem = document.createElement(tag);

  if (typeof className === 'string') {
    elem.classList.add(className);
  } else if (className instanceof Array) {
    elem.classList.add(...className);
  }

  if (textContent) elem.textContent = textContent;

  if (childsList) elem.append(...childsList);

  if (parent) parent.append(elem);

  return elem;
};

export const createInput = (
  className?: string | Array<string>,
  type = 'text',
  placeholder = '',
  name = '',
  required = false
): HTMLInputElement => {
  const input = <HTMLInputElement>createElement('input', className);

  input.setAttribute('type', type);
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('name', name);
  input.required = required;
  return input;
};

export const createLink = (
  router: Router,
  route: string,
  cssClass?: string | Array<string> | null,
  text: string = route
) => {
  const a = <HTMLAnchorElement>createElement('a', cssClass, null, null, text);

  a.href = route;
  a.addEventListener('click', (e) => {
    e.preventDefault();

    router.goToPage(route);
  });

  return a;
};

export const createDropdown = (dropdownBtn: Element, items: Array<Element>) => {
  dropdownBtn.classList.add(DROPDOWN_BTN_CN);

  const dropdownMenu = createElement('div', DROPDOWN_MENU_CN);
  items.forEach((item) => {
    item.classList.add(DROPDOWN_ITEM_CN);
    dropdownMenu.append(item);
  });

  const dropdown = createElement('div', DROPDOWN_CN);
  dropdown.append(dropdownBtn, dropdownMenu);

  return dropdown;
};

export const createDropup = (dropupBtn: Element, items: Array<Element>) => {
  const dropup = createDropdown(dropupBtn, items);
  const menu = dropup.querySelector(`.${DROPDOWN_MENU_CN}`);

  menu?.classList.remove(DROPDOWN_MENU_CN);
  menu?.classList.add(DROPUP_MENU_CN);

  console.log(menu?.classList);

  return dropup;
};
