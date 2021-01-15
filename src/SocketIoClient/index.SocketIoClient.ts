import io from 'socket.io-client';
import { createElement } from '../Utils/index.Utils';
import { SOCKET_SERVER, ROLE_PAINTER } from '../Constants/index.Constants';
import {
  EVENT_BROADCAST,
  EVENT_CONNECT,
  EVENT_DRAW,
  EVENT_USER_INFO,
} from './constants';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  CLEAR_BOARD,
  NAME,
  ROLE,
  USERS,
} from '../Observer/actionTypes';
import {
  FORM_CLASS,
  FORM_BTN_CLASS,
  FORM_INPUT_CLASS,
  CHAT_CLASS,
  CHAT_MSG_CLASS,
} from '../Constants/classNames';
import Observer from '../Observer/index.Observer';
import IDraw from '../Observer/Interfaces/IDraw';

export default class SocketIoClient {
  parentElement: HTMLElement;

  socket: SocketIOClient.Socket;

  chat: Element | undefined;

  form: Element | undefined;

  observer: Observer;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.socket = io(SOCKET_SERVER);
    this.observer = observer;
    this.observer.subscribe(this);
    const { name } = this.observer.getState();
    this.socket.emit(EVENT_USER_INFO, name, NAME);
    this.listenEvents();
  }

  start(parentElem: HTMLElement = this.parentElement) {
    this.createChat(parentElem);
    this.createForm(parentElem);
    this.setFormSubmitListener();
  }

  public update(
    state: {
      role: string;
      name: string;
      draw: IDraw;
      drawThickness: number;
      drawColor: string;
    },
    actionType: string,
  ) {
    if (state.role === ROLE_PAINTER) {
      if (actionType === DRAW) this.socket.emit(EVENT_DRAW, state.draw, DRAW);
      if (actionType === DRAW_THICKNESS)
        this.socket.emit(EVENT_DRAW, state.drawThickness, DRAW_THICKNESS);
      if (actionType === DRAW_COLOR)
        this.socket.emit(EVENT_DRAW, state.drawColor, DRAW_COLOR);
      if (actionType === CLEAR_BOARD) {
        this.socket.emit(EVENT_DRAW, null, CLEAR_BOARD);
      }
    }
    if (actionType === NAME) {
      this.socket.emit(EVENT_USER_INFO, state.name, NAME);
    }
  }

  listenEvents(): void {
    this.socket.on(EVENT_CONNECT, () => {
      // eslint-disable-next-line no-console
      console.log('user connected');
    });

    this.socket.on(EVENT_USER_INFO, (info: any, actionType: string) => {
      switch (actionType) {
        case ROLE:
          this.observer.actions.setRole(info);
          break;
        case USERS:
          this.observer.actions.setUsers(info);
          break;
        default:
          break;
      }
    });

    this.socket.on(EVENT_DRAW, (info: any, actionType: string) => {
      switch (actionType) {
        case DRAW_THICKNESS:
          this.observer.actions.setDrawThickness(info);
          break;
        case DRAW_COLOR:
          this.observer.actions.setDrawColor(info);
          break;
        case CLEAR_BOARD:
          this.observer.actions.clearBoard();
          break;
        default:
          this.observer.actions.setDraw(info);
          break;
      }
    });

    this.socket.on(EVENT_BROADCAST, (...msg: Array<string>) => {
      const nikName = msg[0];
      const message = msg[1];
      this.printMessage(nikName, message);
    });
  }

  setFormSubmitListener(): void {
    this.form?.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const tagetElement = event.target;
      const input = tagetElement?.childNodes[0];
      if (input.value) this.socket.emit(EVENT_BROADCAST, input.value);
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
