import Router from '../../Router/index.Router';
import { LANDING, LOGIN } from '../../Constants/routes';
import { createElement, createInput } from '../../Utils/index.Utils';
import {
  REG_CLOSE_CN,
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
import Observer from '../../Observer/index.Observer';

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
    this.login = createInput(
      ['login', REG_ITEM_CN],
      'text',
      'Enter Login',
      'login',
      true
    );
    parent.append(this.login);

    this.password = createInput(
      ['password', REG_ITEM_CN],
      'password',
      'Enter Password',
      'password',
      true
    );
    parent.append(this.password);

    this.passwordRepeat = createInput(
      ['password', REG_ITEM_CN],
      'password',
      'Repeat Password',
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
    this.registration = <HTMLFormElement>createElement('form', REG_FORM_CN);

    this.appendInputsTo(this.registration);

    this.registrationHead = createElement('h1', REG_TEXT_CN);
    this.registrationHead.innerText = '';
    this.registration.append(this.registrationHead);

    this.registrationBtn = document.createElement('button');
    this.registrationBtn.classList.add(PRIMARY_BTN_CLASS, REG_BTN_CN);
    this.registrationBtn.setAttribute('type', 'submit');
    this.registrationBtn.textContent = 'Register';
    this.registration.append(this.registrationBtn);

    const registrationContainer = createElement('div', REG_CONTAINER_CN);
    const loginBlock = this.createLoginBlock();

    registrationContainer.append(this.registration, loginBlock);
    this.parentElement.append(registrationContainer);
  }

  private listener() {
    if (!this.registrationBtn) return;

    this.registrationBtn.addEventListener(
      'click',
      async (event: MouseEvent) => {
        event.preventDefault();
        if (this.checkPassword()) {
          const response = await this.setPost();
          this.checkResponse(response);
        } else if (this.registrationBtn)
          this.registrationHead.textContent = 'Пароли не совпадают!';
      }
    );
  }

  private checkResponse(response: string) {
    if (!this.registrationBtn) return;

    if (response === 'success') {
      this.registrationHead.textContent = 'Успешно!';
      this.goToLandingPage();
    } else if (response === 'login_exists') {
      this.registrationHead.textContent = 'Имя пользователя существует';
    } else {
      this.registrationHead.textContent = 'Ошибка';
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
