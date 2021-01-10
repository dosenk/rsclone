import ActionCreator from './ActionCreator';
import ISubscriber from './Interfaces/ISubscriber';
import IAction from './Interfaces/IAction';
import { INIT } from './actionTypes';
import reducer from './reducer';
import IState from './Interfaces/IState';

export default class Observer {
  private state: IState;

  private subscribers: Array<ISubscriber> = [];

  public actions: ActionCreator;

  constructor(initialState: Partial<IState> = {}) {
    const state: IState = {
      loading: true,
      langData: {},
      role: '',
      name: 'name',
      draw: {},
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

  subscribe(...subscriber: Array<ISubscriber>): void {
    this.subscribers.push(...subscriber);
  }

  getState(): IState {
    return this.state;
  }
}
