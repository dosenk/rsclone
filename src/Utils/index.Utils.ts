/* eslint-disable import/prefer-default-export */
export const createElement = (
  tag: string,
  classList?: string | Array<string>,
  parent?: Object | null,
  childsList?: Array<Node> | Array<string> | null,
  textContent?: string | null
): Element => {
  const elem = document.createElement(tag);

  if (typeof classList === 'string') {
    elem.classList.add(classList);
  } else if (classList instanceof Array) {
    elem.classList.add(...classList);
  }

  if (textContent) elem.textContent = textContent;

  if (childsList) elem.append(...childsList);

  if (parent) parent.append(elem);

  return elem;
};
