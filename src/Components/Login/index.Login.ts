import Router from '../../Router/index.Router';
import { GAME, REGISTRATION } from '../../Constants/routes';
import Observer from '../../Observer/index.Observer';
import { createElement, createInput } from '../../Utils/index.Utils';
import {
  FORM_CN,
  FORM_ITEM_CN,
  FORM_CONTAINER_CN,
  FORM_BTN_CN,
} from './constants';
import {
  PRIMARY_LINK_CLASS,
  PRIMARY_TEXT_CLASS,
  PRIMARY_BTN_CLASS,
} from '../../Constants/classNames';

export default class Login {
  private loginForm: HTMLElement = document.createElement('form');

  private parentElement: HTMLElement;

  private login: HTMLInputElement | undefined;

  private password: HTMLInputElement | undefined;

  private loginBtn: HTMLButtonElement | undefined;

  private router: Router;

  observer: Observer;

  constructor(parentElement: HTMLElement, observer: Observer, router: Router) {
    this.parentElement = parentElement;
    this.observer = observer;
    this.router = router;
  }

  public start() {
    this.render();
    this.listener();
  }

  private createRegBlock() {
    const {
      CREATE_AN_ACCOUNT,
      NEW_TO_GAME,
    } = this.observer.getState().langData;

    const regLink = <HTMLLinkElement>(
      createElement('a', PRIMARY_LINK_CLASS, null, null, CREATE_AN_ACCOUNT)
    );
    regLink.href = REGISTRATION;
    regLink.addEventListener('click', (e) => {
      e.preventDefault();

      this.router.goToPage(REGISTRATION);
    });

    const regSpan = createElement(
      'span',
      PRIMARY_TEXT_CLASS,
      null,
      null,
      NEW_TO_GAME
    );
    const regContainer = createElement('div', null, null, [regSpan, regLink]);

    return regContainer;
  }

  public render() {
    this.loginForm.classList.add(FORM_CN);

    this.login = createInput(
      ['login-input', FORM_ITEM_CN],
      'text',
      'Enter Login',
      'login',
      true
    );
    this.loginForm.append(this.login);

    this.password = createInput(
      ['password', FORM_ITEM_CN],
      'password',
      'Enter Password',
      'password',
      true
    );
    this.loginForm.append(this.password);

    this.loginBtn = document.createElement('button');
    this.loginBtn.classList.add(PRIMARY_BTN_CLASS, FORM_BTN_CN);
    this.loginBtn.setAttribute('type', 'submit');
    this.loginBtn.textContent = 'Login';
    this.loginForm.append(this.loginBtn);

    const regBlock = this.createRegBlock();
    const loginContainer = document.createElement('div');

    loginContainer.classList.add(FORM_CONTAINER_CN);
    loginContainer.append(this.loginForm, regBlock);

    this.parentElement.append(loginContainer);
  }

  private listener() {
    this.loginBtn?.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      if (this.checkLoginAndPassword()) {
        const response = await this.setPost();
        this.checkResponse(response);
      }
    });
  }

  private checkResponse(response: string) {
    if (response === 'good') {
      this.observer.actions.setName(this.login?.value || '');
      this.router.goToPage(GAME);
    } else {
      this.router.goToPage(REGISTRATION);
    }
  }

  private checkLoginAndPassword() {
    const loginInput = this.login?.value.trim();
    const passwordInput = this.password?.value.trim();
    if (loginInput !== '' && passwordInput !== '') {
      return true;
    }
    return false;
  }

  private async setPost() {
    const response = await fetch(
      'https://rsclone-node-js.herokuapp.com/users/userPass',
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
}
