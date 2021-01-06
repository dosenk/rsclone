import LangDictionaries from '../../LangDictionaries/index.langDictionaries';
import Observer from '../../Observer/index.Observer';
import { DEFAULT_LANGUAGE } from '../../Constants/index.Constants';
import Board from './index.Board';
import Panel from './index.Panel';

export default class App {
  private readonly observer: Observer;

  private mainElement: HTMLElement;

  constructor() {
    const langData = LangDictionaries[DEFAULT_LANGUAGE];
    this.observer = new Observer({ langData });

    const parentElem: Element = document.body;
    this.mainElement = document.createElement('main');
    new Panel();
    // const board = new Board();
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
