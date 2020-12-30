import ActionCreator from './ActionCreator';
import ISubscriber from './Interfaces/ISubscriber';
import IAction from './Interfaces/IAction';
import { INIT } from './actionTypes';
import reducer from './reducer';
import IState from './Interfaces/IState';
import IIncompleteState from './Interfaces/IIncompleteState';

export default class Observer {
  private state: IState;

  private subscribers: Array<ISubscriber> = [];

  public actions: ActionCreator;

  constructor(initialState: IIncompleteState = {}) {
    const state: IState = {
      loading: true,
      langData: {},
      ...initialState,
    };

    this.state = reducer(state, { type: INIT });
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

  getState(): IState {
    return this.state;
  }
}
