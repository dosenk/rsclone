import Observer from '../../Observer/index.Observer';

export default class App {
  private mainElement: HTMLElement;

  private observer = new Observer();

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
