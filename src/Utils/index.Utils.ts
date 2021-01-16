export const createElement = (
  tag: string,
  className?: string | Array<string>,
  parent?: Element | null,
  childsList?: Array<Node> | Array<Element> | null,
  textContent?: string | null,
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
  required = false,
): HTMLInputElement => {
  const input = <HTMLInputElement>createElement('input', className);

  input.setAttribute('type', type);
  input.setAttribute('placeholder', placeholder);
  input.setAttribute('name', name);
  input.required = required;
  return input;
};
