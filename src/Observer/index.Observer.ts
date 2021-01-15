import ActionCreator from './ActionCreator';
import ISubscriber from './Interfaces/ISubscriber';
import IAction from './Interfaces/IAction';
import { INIT } from './actionTypes';
import reducer from './reducer';
import IState from './Interfaces/IState';

export default class Observer {
  private static instance: Observer;

  private state: IState;

  private subscribers: Array<ISubscriber> = [];

  public readonly actions: ActionCreator;

  constructor(initialState: Partial<IState> = {}) {
    if (Observer.instance) {
      return Observer.instance;
    }

    Observer.instance = this;

    const state: IState = {
      loading: true,
      langData: {},
      role: '',
      name: 'name',
      users: {},
      draw: null,
      drawThickness: 1,
      drawColor: 'black',
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

  subscribe(...subscribers: Array<ISubscriber>): void {
    this.subscribers.push(...subscribers);
  }

  unsubscribe(...subscribers: Array<ISubscriber>): void {
    subscribers.forEach((subscriber) => {
      this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    });
  }

  getState(): IState {
    return this.state;
  }
}
