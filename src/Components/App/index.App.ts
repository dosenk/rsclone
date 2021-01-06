import LangDictionaries from '../../LangDictionaries/index.langDictionaries';
import Observer from '../../Observer/index.Observer';
import { DEFAULT_LANGUAGE } from '../../Constants/index.Constants';

export default class App {
  private readonly observer: Observer;

  private mainElement: HTMLElement;

  constructor() {
    const langData = LangDictionaries[DEFAULT_LANGUAGE];
    this.observer = new Observer({ langData });

    const parentElem: Element = document.body;
    this.mainElement = document.createElement("main");

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
