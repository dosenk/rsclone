import type Router from '../../Router/index.Router';
import type Observer from '../../Observer/index.Observer';
import { LANDING, LOGIN } from '../../Constants/routes';
import {
  createElement,
  createInput,
  createLangDropdown,
} from '../../Utils/index.Utils';
import {
  REG_FORM_CN,
  REG_ITEM_CN,
  REG_CONTAINER_CN,
  REG_BTN_CN,
  REG_TEXT_CN,
} from './constants';
import {
  PRIMARY_BTN_CLASS,
  PRIMARY_LINK_CLASS,
  PRIMARY_TEXT_CLASS,
} from '../../Constants/classNames';

export default class Registration {
  private registration: HTMLFormElement | undefined;

  private readonly parentElement: HTMLElement;

  private login: HTMLInputElement | undefined;

  private password: HTMLInputElement | undefined;

  private passwordRepeat: HTMLInputElement | undefined;

  private registrationBtn: HTMLElement | undefined;

  private registrationHead: HTMLElement | undefined;

  private readonly router: Router;

  private readonly observer: Observer;

  constructor(parentElement: HTMLElement, router: Router, observer: Observer) {
    this.parentElement = parentElement;
    this.router = router;
    this.observer = observer;
  }

  public start() {
    this.render();
    this.listener();
  }

  private appendInputsTo(parent: Element) {
    const {
      ENTER_LOGIN,
      ENTER_PASSWORD,
      REPEAT_PASSWORD,
    } = this.observer.getState().langData;

    this.login = createInput(
      ['login', REG_ITEM_CN],
      'text',
      ENTER_LOGIN,
      'login',
      true
    );
    parent.append(this.login);

    this.password = createInput(
      ['password', REG_ITEM_CN],
      'password',
      ENTER_PASSWORD,
      'password',
      true
    );
    parent.append(this.password);

    this.passwordRepeat = createInput(
      ['password', REG_ITEM_CN],
      'password',
      REPEAT_PASSWORD,
      'password-repeat',
      true
    );
    parent.append(this.passwordRepeat);
  }

  private createLoginBlock() {
    const {
      ALREADY_HAVE_AN_ACCOUNT,
      SING_IN,
    } = this.observer.getState().langData;

    const regLink = <HTMLLinkElement>(
      createElement('a', PRIMARY_LINK_CLASS, null, null, SING_IN)
    );
    regLink.href = LOGIN;
    regLink.addEventListener('click', (e) => {
      e.preventDefault();

      this.router.goToPage(LOGIN);
    });

    const regSpan = createElement(
      'span',
      PRIMARY_TEXT_CLASS,
      null,
      null,
      ALREADY_HAVE_AN_ACCOUNT
    );
    const container = createElement('div', null, null, [regSpan, regLink]);

    return container;
  }

  private render() {
    const { REGISTER } = this.observer.getState().langData;

    this.registration = <HTMLFormElement>createElement('form', REG_FORM_CN);

    this.appendInputsTo(this.registration);

    this.registrationHead = createElement('h1', REG_TEXT_CN);
    this.registrationHead.innerText = '';
    this.registration.append(this.registrationHead);

    this.registrationBtn = document.createElement('button');
    this.registrationBtn.classList.add(PRIMARY_BTN_CLASS, REG_BTN_CN);
    this.registrationBtn.setAttribute('type', 'submit');
    this.registrationBtn.textContent = REGISTER;
    this.registration.append(this.registrationBtn);

    const registrationContainer = createElement('div', REG_CONTAINER_CN);
    const loginBlock = this.createLoginBlock();

    const langDropdown = createLangDropdown(this.observer);

    registrationContainer.append(langDropdown, this.registration, loginBlock);
    this.parentElement.append(registrationContainer);
  }

  private listener() {
    if (!this.registrationBtn) return;

    const { PASSWORDS_NOT_EQUAL } = this.observer.getState().langData;

    this.registrationBtn.addEventListener('click', async (event) => {
      event.preventDefault();

      if (this.checkPassword()) {
        const response = await this.setPost();
        this.checkResponse(response);
      } else if (this.registrationHead)
        this.registrationHead.textContent = PASSWORDS_NOT_EQUAL;
    });
  }

  private checkResponse(response: string) {
    if (!this.registrationHead) return;

    const { SUCCESS, LOGIN_EXISTS, ERROR } = this.observer.getState().langData;

    if (response === 'success') {
      this.registrationHead.textContent = SUCCESS;
      this.goToLandingPage();
    } else if (response === 'login_exists') {
      this.registrationHead.textContent = LOGIN_EXISTS;
    } else {
      this.registrationHead.textContent = ERROR;
    }
  }

  private goToLandingPage() {
    setTimeout(() => {
      this.router.goToPage(LANDING);
    }, 1000);
  }

  private async setPost() {
    const response = await fetch(
      'https://rsclone-node-js.herokuapp.com/users/user',
      {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: this.login?.value,
          password: this.password?.value,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => res);
    return response;
  }

  private checkPassword() {
    const password1 = this.password?.value;
    const password2 = this.passwordRepeat?.value;
    if (password1 === password2) {
      return password1;
    }
    return false;
  }
}
