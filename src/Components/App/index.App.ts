import Observer from '../../Observer/index.Observer';
import SocketClient from '../../SocketClient/index.SocketClient';

export default class App {
  private mainElement: HTMLElement;

  private readonly observer = new Observer();

  private readonly socketClient = new SocketClient(this.observer);

  constructor() {
    const parentElem: Element = document.body;
    this.mainElement = document.createElement('main');

    // this.table = new Table(
    //   this.mainElement,
    //   this.observer,
    // );

    parentElem.append(this.mainElement);
  }

  public start() {
    // this.observer.actions.fetchData();
    // this.observer.subscribe(this.table, ...etc);
  }
}
