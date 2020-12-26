import Observer from '../../Observer/index.Observer';

export default class App {
  constructor() {
    const parentElem = document.body;
    this.mainElement = document.createElement('main');
    this.observer = new Observer();

    // this.table = new Table(
    //   this.mainElement,
    //   this.observer,
    // );

    parentElem.append(this.mainElement);
  }

  start() {
    // this.observer.actions.fetchData();
    // this.observer.subscribe(this.table, ...etc);
  }
}
