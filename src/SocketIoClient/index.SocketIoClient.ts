import io from "socket.io-client";
import { createElement } from "../Utils/index.Utils";
import { SOCKET_SERVER } from "../Constants/index.Constants";

const SOCKET_SERVER_LOCAL = "http://localhost:3000";

export default class SocketIoClient {
  parentElement: HTMLBodyElement;

  socket: SocketIOClient.Socket;

  chat: Element | undefined;

  form: Element | undefined;

  constructor(parentElement: HTMLBodyElement) {
    this.parentElement = parentElement;
    this.socket = io(SOCKET_SERVER);
    this.start();
  }

  async start(parentElem: null = null) {
    await this.createChat(parentElem);
    await this.createForm(parentElem);
    this.listenEvents();
  }

  listenEvents(): void {
    this.socket.on("connect", () => {
      this.socket.emit("name", "nikname"); // nik when user login
    });

    this.socket.on("broadcast", (...msg: Array<string>) => {
      const nikName = msg[0];
      const message = msg[1];
      this.printMessage(nikName, message);
    });

    this.sendMessage();
  }

  sendMessage(): void {
    this.form?.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const tagetElement = e.target;
      const input = tagetElement?.childNodes[0];
      if (input.value) this.socket.emit("broadcast", input.value);
      input.value = "";
    });
  }

  printMessage(nikname: string, text: string): void {
    const msgText = `${nikname}: ${text}`;
    const p = createElement("p", "client-chat__msg", null, null, msgText);
    this.chat?.prepend(p);
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
    const btn = createElement("button", "client-form__btn", null, null, "send");
    btn.setAttribute("type", "submit");
    this.form = createElement(
      "form",
      "client-form",
      parentElem || this.parentElement,
      [input, btn]
    );
  }
}
