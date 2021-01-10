import LangDictionaries from '../../LangDictionaries/index.langDictionaries';
import Observer from '../../Observer/index.Observer';
import { DEFAULT_LANGUAGE } from '../../Constants/index.Constants';
import Board from '../Board/index.Board';
import SocketIoClient from '../../SocketIoClient/index.SocketIoClient';

export default class App {
  private readonly observer: Observer;

  private mainElement: HTMLElement;

  socketIoClient: SocketIoClient;

  constructor() {
    const langData = LangDictionaries[DEFAULT_LANGUAGE];
    this.observer = new Observer({ langData });

    const parentElem: Element = document.body;
    this.mainElement = document.createElement('main');

    this.socketIoClient = new SocketIoClient(this.mainElement, this.observer);

    const board = new Board(this.mainElement, this.observer);
    // board.addHost();
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
