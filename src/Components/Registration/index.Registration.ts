export default class Registration {
  private registration: HTMLElement = document.createElement('form');

  private parentElement: HTMLElement;

  private input: any;

  private login: any;

  private password: any;

  private passwordRepeat: any;

  private registrationBtn: any;

  private registrationHead: any;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.render();
    this.listener();
  }

  public render() {
    this.registration.classList.add('registration');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('registration-close');
    this.registration.append(closeBtn);

    const registrationContainer = document.createElement('div');
    registrationContainer.classList.add('registration-container');

    this.login = this.createInput('login', 'text', 'Enter Login', 'login');
    registrationContainer.append(this.login);

    this.password = this.createInput(
      'password',
      'password',
      'Enter Password',
      'password'
    );
    registrationContainer.append(this.password);

    this.passwordRepeat = this.createInput(
      'password',
      'password',
      'Repeat Password',
      'password-repeat'
    );
    registrationContainer.append(this.passwordRepeat);

    this.registrationHead = document.createElement('h1');
    this.registrationHead.classList.add('registration-text');
    this.registrationHead.innerText = '';
    registrationContainer.append(this.registrationHead);

    this.registrationBtn = document.createElement('button');
    this.registrationBtn.classList.add('registration-btn');
    this.registrationBtn.setAttribute('type', 'submit');
    this.registrationBtn.textContent = 'Register';
    registrationContainer.append(this.registrationBtn);

    this.registration.append(registrationContainer);
    this.parentElement.append(this.registration);
  }

  private createInput(
    cls: string,
    type: string,
    placeholder: string,
    name: string
  ) {
    this.input = document.createElement('input');
    this.input.classList.add('registration-item');
    this.input.classList.add(cls);
    this.input.setAttribute('type', type);
    this.input.setAttribute('placeholder', placeholder);
    this.input.setAttribute('name', name);
    this.input.required = true;
    return this.input;
  }

  private listener() {
    this.registrationBtn.addEventListener(
      'click',
      async (event: MouseEvent) => {
        event.preventDefault();
        if (this.checkPassword()) {
          const response = await this.setPost();
          this.checkResponse(response);
        } else {
          this.registrationHead.textContent = 'Пароли не совпадают!';
        }
      }
    );
  }

  private checkResponse(response: boolean) {
    if (response) {
      this.registrationHead.textContent = 'Успешно!';
    } else {
      this.registrationHead.textContent = 'Ошибка';
    }
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
          login: this.login.value,
          password: this.password.value,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => true);
    return response;
  }

  private checkPassword() {
    const password1 = this.password.value;
    const password2 = this.passwordRepeat.value;
    if (password1 === password2) {
      return password1;
    }
    return false;
  }
}
