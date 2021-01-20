import ISubscriber from './Interfaces/ISubscriber';
import IAction from './Interfaces/IAction';
import IState from './Interfaces/IState';
import ActionCreator from './ActionCreator';
import { INIT } from './actionTypes';
import reducer from './reducer';
import { LOADING_GAME } from '../Components/Game/statuses';
import { LANDING } from '../Constants/routes';

export default class Observer {
  private state: IState;

  private subscribers: Array<ISubscriber> = [];

  public readonly actions: ActionCreator;

  constructor(initialState: Partial<IState> = {}) {
    const state: IState = {
      game: {},
      loading: true,
      langData: {},
      role: '',
      name: 'name',
      users: {},
      draw: null,
      drawThickness: 1,
      drawColor: 'black',
      wordsToSelect: [],
      wordToGuess: '',
      gameStatus: LOADING_GAME,
      gameEndInfo: null,
      ...initialState,
      route: LANDING,
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
