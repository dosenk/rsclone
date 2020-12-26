import ActionCreator from './ActionCreator';
import ISubscriber from './ISubscriber';
import IAction from './IAction';
import { INIT } from './actionTypes';
import reducer from './reducer';

export default class Observer {
  private state: Object;

  private subscribers: Array<ISubscriber> = [];

  public actions: ActionCreator;

  constructor(initialState: Object = {}) {
    this.state = reducer(initialState, { type: INIT });
    this.actions = new ActionCreator(this);
  }

  dispatch(action: IAction): void {
    this.state = reducer(this.state, action);
    this.subscribers.forEach((subscriber) => {
      subscriber.update(this.state, action.type);
    });
  }

  subscribe(...subscriber: Array<ISubscriber>): void {
    this.subscribers.push(...subscriber);
  }

  getState(): Object {
    return this.state;
  }
}
