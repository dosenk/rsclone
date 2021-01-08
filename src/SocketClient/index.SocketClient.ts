import io from 'socket.io-client';
import Observer from '../Observer/index.Observer';
import {
  SERVER_URL,
  CHAT_EVENT,
  CONNECT_EVENT,
  GREETING_EVENT,
  CLEAR_BOARD_EVENT,
  BOARD_EVENT,
  MOUSE_DOWN_EVENT,
  MOUSE_UP_EVENT,
  MOUSE_MOVE_EVENT,
  THICKNESS_EVENT,
  COLOR_EVENT,
} from './constants';

export default class SocketClient {
  private readonly connection: any;

  private readonly observer: Observer;

  private chatListeners: Array<Function> = [];

  private boardListeners: Array<Function> = [];

  constructor(observer: Observer) {
    this.observer = observer;
    this.connection = io(SERVER_URL);

    this.setSocketEventsListeners();
  }

  private setSocketEventsListeners(): void {
    this.connection.on(CONNECT_EVENT, (): void => {
      const { userName } = this.observer.getState();

      this.connection.emit(GREETING_EVENT, { userName });
    });

    this.connection.on(CHAT_EVENT, (msgJson: JSON): void => {
      this.chatListeners.forEach((listener) => {
        listener(msgJson);
      });
    });

    this.connection.on(BOARD_EVENT, (event: JSON): void => {
      this.boardListeners.forEach((listener) => {
        listener(event);
      });
    });
  }

  public setChatListener(listenerCallback: Function) {
    this.chatListeners.push(listenerCallback);
  }

  public setBoardListener(listenerCallback: Function) {
    this.chatListeners.push(listenerCallback);
  }

  public sendAnswer(msg: string): void {
    this.connection.emit(CHAT_EVENT, { msg });
  }

  public sendClearBoard(): void {
    this.connection.emit(BOARD_EVENT, {
      type: CLEAR_BOARD_EVENT,
    });
  }

  public sendMouseDown(x: number, y: number): void {
    this.connection.emit(BOARD_EVENT, {
      type: MOUSE_DOWN_EVENT,
      x,
      y,
    });
  }

  public sendMouseMove(x: number, y: number): void {
    this.connection.emit(BOARD_EVENT, {
      type: MOUSE_MOVE_EVENT,
      x,
      y,
    });
  }

  public sendMouseUp(x: number, y: number): void {
    this.connection.emit(BOARD_EVENT, {
      type: MOUSE_UP_EVENT,
      x,
      y,
    });
  }

  public sendColor(color: string): void {
    this.connection.emit(BOARD_EVENT, {
      type: COLOR_EVENT,
      color,
    });
  }

  public sendThickness(thickness: number): void {
    this.connection.emit(BOARD_EVENT, {
      type: THICKNESS_EVENT,
      thickness,
    });
  }
}
