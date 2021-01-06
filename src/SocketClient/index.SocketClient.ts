import io from 'socket.io-client';
import Observer from '../Observer/index.Observer';
import {
  SERVER_URL,
  CHAT_EVENT,
  CONNECT_EVENT,
  GREETING_EVENT,
} from './constants';

export default class SocketClient {
  private readonly connection: any;

  private readonly observer: Observer;

  private chatListeners: Array<Function> = [];

  constructor(observer: Observer) {
    this.observer = observer;
    this.connection = io(SERVER_URL);

    this.setSocketListeners();
  }

  private setSocketListeners(): void {
    this.connection.on(CONNECT_EVENT, (): void => {
      const { userName } = this.observer.getState();

      this.connection.emit(GREETING_EVENT, { userName });
    });

    this.connection.on(CHAT_EVENT, (msgJson: JSON): void => {
      this.chatListeners.forEach((listener) => {
        listener(msgJson);
      });
    });
  }

  public setChatListener(listenerCallback: Function) {
    this.chatListeners.push(listenerCallback);
  }

  public sensAnswer(msg: string): void {
    this.connection.emit(CHAT_EVENT, { msg });
  }
}
