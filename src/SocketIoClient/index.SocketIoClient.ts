import io from "socket.io-client";
import { createElement } from "./../Utils/index.Utils";

export default class SocketIoClient {
  parentElement: HTMLBodyElement;
  socket: SocketIOClient.Socket;
  chat: HTMLBodyElement | undefined;

  constructor(parentElement: HTMLBodyElement) {
    this.parentElement = parentElement;
    this.socket = io();
  }

  start(parentElem: null = null) {
    this.createChat(parentElem);
    this.createForm(parentElem);
    this.listenEvents();
  }

  listenEvents() {
    this.socket.on("connect", () => {
      this.socket.emit("name", "nikname"); // nik when user login
    });

    this.socket.on("broadcast", (...msg: Array<string>) => {
      const nikName = msg[1];
      const message = msg[2];
      this.printMessange(nikName, message);
    });
  }

  printMessange(nikname: string, text: string): void {
    const msgText = `${nikname}: ${text}`;
    createElement("p", "client-chat__msg", this.chat, null, msgText);
  }

  createChat(parentElem: HTMLBodyElement | null = null): void {
    this.chat = createElement(
      "div",
      "client-chat",
      parentElem || this.parentElement
    );
  }

  createForm(parentElem: HTMLBodyElement | null = null): void {
    const input = createElement("input", "client-form__info");
    const label = createElement(
      "label",
      "client-form__info",
      null,
      [input],
      "Enter nikname:"
    );
    const btn = createElement("button", "client-form__btn");
    createElement("div", "client-form", parentElem || this.parentElement, [
      label,
      btn,
    ]);
  }
}
