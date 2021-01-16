import Router from '../../Router/index.Router';
import { GAME, REGISTRATION } from '../../Constants/routes';
import Observer from '../../Observer/index.Observer';

export default class Login {
  private loginForm: HTMLElement = document.createElement('form');

  private parentElement: HTMLElement;

  private login: any;

  private password: any;

  private loginBtn: any;

  private router: Router;

  observer: Observer;

  constructor(parentElement: HTMLElement, observer: Observer, router: Router) {
    this.parentElement = parentElement;
    this.observer = observer;
    this.router = router;
    this.render();
    this.listener();
  }

  public render() {
    this.loginForm.classList.add('loginForm');

    const loginContainer = document.createElement('div');
    loginContainer.classList.add('loginForm-container');

    this.login = Login.createInput(
      'login-input',
      'text',
      'Enter Login',
      'login',
    );
    loginContainer.append(this.login);

    this.password = Login.createInput(
      'password',
      'password',
      'Enter Password',
      'password',
    );
    loginContainer.append(this.password);

    this.loginBtn = document.createElement('button');
    this.loginBtn.classList.add('loginForm-btn');
    this.loginBtn.setAttribute('type', 'submit');
    this.loginBtn.textContent = 'Login';
    loginContainer.append(this.loginBtn);

    this.loginForm.append(loginContainer);
    this.parentElement.append(this.loginForm);
  }

  private static createInput(
    cls: string,
    type: string,
    placeholder: string,
    name: string,
  ) {
    const input = document.createElement('input');

    input.classList.add('loginForm-item');
    input.classList.add(cls);
    input.setAttribute('type', type);
    input.setAttribute('placeholder', placeholder);
    input.setAttribute('name', name);
    input.required = true;
    return input;
  }

  private listener() {
    this.loginBtn.addEventListener('click', async (event: MouseEvent) => {
      event.preventDefault();
      if (this.checkLoginAndPassword()) {
        const response = await this.setPost();
        this.checkResponse(response);
      }
    });
  }

  private checkResponse(response: string) {
    if (response === 'good') {
      this.observer.actions.setName(this.login.value);
      this.router.goToPage(GAME);
    } else {
      this.router.goToPage(REGISTRATION);
    }
  }

  private checkLoginAndPassword() {
    const loginInput = this.login.value.trim();
    const passwordInput = this.password.value.trim();
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
          login: this.login.value,
          password: this.password.value,
        }),
      },
    )
      .then((res) => res.json())
      .then((res) => res);
    return response;
  }
}
