import { APP_NAME } from '../Constants/index.Constants';
import { createElement } from '../Utils/index.Utils';
import './styles/landing.scss';
import '../assets/images/crocodile.png';
import Router from '../Router/index.Router';
import { REGISTRATION, LOGIN } from '../Constants/routes';

const LANDING_CN = 'landing';
const DESCRIPTION_1 = 'One draws, the rest guess in real time.';
const DESCRIPTION_2 = 'Please login or register before playing';

const createButtons = (router: Router): Element => {
  const loginBtn = createElement('button', [
    'primary_btn',
    `${LANDING_CN}--btn`,
  ]);
  loginBtn.textContent = 'LOGIN';
  loginBtn.addEventListener('click', () => router.goToPage(LOGIN));

  const regBtn = createElement('button', ['primary_btn', `${LANDING_CN}--btn`]);
  regBtn.textContent = 'SIGN UP';
  regBtn.addEventListener('click', () => router.goToPage(REGISTRATION));

  const buttons = createElement('div', [`${LANDING_CN}--buttons`], null, [
    loginBtn,
    regBtn,
  ]);

  return buttons;
};

export default (parent: HTMLElement, _: Object, router: Router): void => {
  const h1 = createElement('h1', [`${LANDING_CN}--title`]);
  h1.textContent = APP_NAME.toUpperCase();

  const text1 = createElement('p', [`${LANDING_CN}--text`]);
  text1.textContent = DESCRIPTION_1;

  const text2 = createElement('p', [`${LANDING_CN}--text`]);
  text2.textContent = DESCRIPTION_2;

  const buttons = createButtons(router);

  const column = createElement('div', [`${LANDING_CN}--column`], null, [
    text1,
    text2,
    buttons,
  ]);

  const img = createElement('div', `${LANDING_CN}--img`);

  const content = createElement('div', [`${LANDING_CN}--content`], null, [
    column,
    img,
  ]);
  const body = createElement('div', [`${LANDING_CN}--body`], null, [
    h1,
    content,
  ]);

  const container = createElement('div', [LANDING_CN], null, [body]);

  parent.append(container);
};
