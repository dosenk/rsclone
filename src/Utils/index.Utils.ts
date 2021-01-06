export const createElement = (
  tag: string,
  classList?: string | Array<string>,
  parent?: Element | null,
  childsList?: Array<Node> | Array<string> | null,
  textContent?: string | null,
): Element => {
  const elem = document.createElement(tag);

  if (typeof classList === 'string') {
    elem.classList.add(classList);
  } else if (classList instanceof Array) {
    elem.classList.add(...classList);
  }

  if (childsList) elem.append(...childsList);

  if (textContent) elem.textContent = textContent;

  if (parent) parent.append(elem);

  return elem;
};
