import io from 'socket.io-client';
import { createElement } from '../Utils/index.Utils';
import { SOCKET_SERVER } from '../Constants/index.Constants';
import {
  FORM_CLASS,
  FORM_BTN_CLASS,
  FORM_INPUT_CLASS,
  CHAT_CLASS,
  CHAT_MSG_CLASS,
} from './constants';

export default class SocketIoClient {
  parentElement: HTMLElement;

  socket: SocketIOClient.Socket;

  chat: Element | undefined;

  form: Element | undefined;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.socket = io(SOCKET_SERVER);
    this.start();
  }

  async start(parentElem: HTMLElement = this.parentElement) {
    await this.createChat(parentElem);
    await this.createForm(parentElem);
    this.listenEvents();
  }

  listenEvents(): void {
    this.socket.on('connect', () => {
      // eslint-disable-next-line no-alert
      const name = prompt('Enter nikname:'); // todo - login form
      this.socket.emit('name', name);
    });

    this.socket.on('broadcast', (...msg: Array<string>) => {
      const nikName = msg[0];
      const message = msg[1];
      this.printMessage(nikName, message);
    });

    this.sendMessage();
  }

  sendMessage(): void {
    this.form?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const tagetElement = event.target;
      const input = tagetElement?.childNodes[0];
      if (input.value) this.socket.emit('broadcast', input.value);
      input.value = '';
    });
  }

  printMessage(nikname: string, text: string): void {
    const msgText = `${nikname}: ${text}`;
    const p = createElement('p', CHAT_MSG_CLASS, null, null, msgText);
    this.chat?.prepend(p);
  }

  createChat(parentElem: HTMLElement = this.parentElement): void {
    this.chat = createElement('div', CHAT_CLASS, parentElem);
  }

  createForm(parentElem: HTMLElement = this.parentElement): void {
    const input = createElement('input', FORM_INPUT_CLASS);
    const btn = createElement('button', FORM_BTN_CLASS, null, null, 'send');
    btn.setAttribute('type', 'submit');
    this.form = createElement('form', FORM_CLASS, parentElem, [input, btn]);
  }
}
