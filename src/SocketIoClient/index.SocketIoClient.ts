import io from 'socket.io-client';
import { createElement } from '../Utils/index.Utils';
import { SOCKET_SERVER } from '../Constants/index.Constants';
import {
  EVENT_BROADCAST,
  EVENT_CONNECT,
  EVENT_DRAW,
  EVENT_USER_INFO,
  EVENT_GAME,
  START_GAME,
  STOP_GAME,
} from './constants';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  CLEAR_BOARD,
  NAME,
  ROLE,
  USERS,
  WORDS_TO_SELECT,
  WORD_TO_GUESS,
} from '../Observer/actionTypes';
import {
  FORM_CLASS,
  FORM_BTN_CLASS,
  FORM_INPUT_CLASS,
  CHAT_CLASS,
  CHAT_MSG_CLASS,
} from '../Constants/classNames';
import type Observer from '../Observer/index.Observer';
import IState from '../Observer/Interfaces/IState';
import { GAME_IN_PROGRESS, LOADING_GAME } from '../Components/Game/statuses';

type Socket = io.Socket;

export default class SocketIoClient {
  parentElement: HTMLElement;

  socket: Socket | null;

  chat: HTMLElement;

  form: HTMLElement;

  observer: Observer;

  constructor(parentElement: HTMLElement, observer: Observer) {
    this.parentElement = parentElement;
    this.observer = observer;
    this.chat = SocketIoClient.createChat();
    this.form = this.createForm();
  }

  public start() {
    this.socket = io(SOCKET_SERVER);
    this.listenSocketEvents();
    this.sendName();
  }

  public disconnet() {
    this.socket.disconnect();
  }

  public displayForm(parentElement: HTMLElement) {
    parentElement.append(this.form);
  }

  public displayChat(parentElement: HTMLElement) {
    parentElement.append(this.chat);
  }

  public sendDrowInfoToClients(actionType: string, state: IState) {
    if (actionType === DRAW) this.socket.emit(EVENT_DRAW, state.draw, DRAW);
    if (actionType === DRAW_THICKNESS)
      this.socket.emit(EVENT_DRAW, state.drawThickness, DRAW_THICKNESS);
    if (actionType === DRAW_COLOR)
      this.socket.emit(EVENT_DRAW, state.drawColor, DRAW_COLOR);
    if (actionType === CLEAR_BOARD) {
      this.socket.emit(EVENT_DRAW, null, CLEAR_BOARD);
    }
  }

  private sendName() {
    const { name } = this.observer.getState();
    this.socket.emit(EVENT_USER_INFO, name, NAME);
  }

  listenSocketEvents(): void {
    this.socket.on(EVENT_CONNECT, () => {
      // событи будет сробатывать при подключении к сокету
    });

    this.socket.on(EVENT_GAME, (info: any, actionType: string) => {
      switch (actionType) {
        case START_GAME:
          this.observer.actions.setGameStatus(GAME_IN_PROGRESS);
          break;
        case WORDS_TO_SELECT:
          this.observer.actions.wordsToSelect(info);
          break;
        case STOP_GAME:
          if (info.loading) this.observer.actions.setGameStatus(LOADING_GAME);
          else {
            this.observer.actions.setGameEndInfo(info);
          }
          break;
        default:
          break;
      }
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

  printMessage(nickname: string, text: string): void {
    const msgText = `${nickname}: ${text}`;
    const p = createElement('p', CHAT_MSG_CLASS, null, null, msgText);
    this.chat?.prepend(p);
  }

  static createChat(): HTMLElement {
    return createElement('div', CHAT_CLASS);
  }

  clearChat(): void {
    this.chat.textContent = '';
  }

  createForm(): HTMLElement {
    const input = createElement('input', FORM_INPUT_CLASS);
    const btn = createElement('button', FORM_BTN_CLASS, null, null, 'send');
    btn.setAttribute('type', 'submit');
    const form = createElement('form', FORM_CLASS, null, [input, btn]);
    form.addEventListener('submit', (event) => this.sendMessage(event));
    return form;
  }

  sendMessage(event: Event): void {
    event.preventDefault();
    const tagetElement = event.target;
    const input = tagetElement?.childNodes[0];
    if (input.value) this.socket.emit(EVENT_BROADCAST, input.value);
    input.value = '';
  }

  sendGuessedWord(word: string) {
    this.socket.emit(EVENT_GAME, word, WORD_TO_GUESS);
  }
}
