import io from 'socket.io-client';
import Observer from '../Observer/index.Observer';
import { CHAT_MSG, SERVER_URL } from './constants';

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
    this.connection.on(CHAT_MSG, (msgJson: JSON): void => {
      this.chatListeners.forEach((listener) => {
        listener(msgJson);
      });
    });
  }

  public setChatListener(listenerCallback: Function) {
    this.chatListeners.push(listenerCallback);
  }

  public sensAnswer(msg: string): void {
    const { userName } = this.observer.getState();

    this.connection.emit(CHAT_MSG, { msg, userName });
  }
}
