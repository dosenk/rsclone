import type Router from '../Router/index.Router';

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
