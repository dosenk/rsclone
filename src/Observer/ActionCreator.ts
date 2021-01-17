import Observer from './index.Observer';
import Game from '../Components/Game/index.Game';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  LANG,
  LOADING,
  NAME,
  USERS,
  ROLE,
  CLEAR_BOARD,
  GAME,
} from './actionTypes';
import langItem from '../langDictionaries/en';
import IDraw from './Interfaces/IDraw';

export default class ActionCreator {
  private observer: Observer;

  constructor(observer: Observer) {
    this.observer = observer;
  }

  setGame(game: Game): void {
    this.observer.dispatch({
      type: GAME,
      payload: game,
    });
  }

  setLoading(isLoading: boolean = true): void {
    if (this.observer.getState().loading === isLoading) return;

    this.observer.dispatch({
      type: LOADING,
      payload: isLoading,
    });
  }

  setLang(lang: typeof langItem): void {
    this.observer.dispatch({
      type: LANG,
      payload: lang,
    });
  }

  setRole(role: string): void {
    this.observer.dispatch({
      type: ROLE,
      payload: role,
    });
  }

  setName(name: string): void {
    this.observer.dispatch({
      type: NAME,
      payload: name,
    });
  }

  setUsers(users: object): void {
    this.observer.dispatch({
      type: USERS,
      payload: users,
    });
  }

  setDraw(draw: IDraw): void {
    this.observer.dispatch({
      type: DRAW,
      payload: draw,
    });
  }

  setDrawThickness(thickness: number): void {
    this.observer.dispatch({
      type: DRAW_THICKNESS,
      payload: thickness,
    });
  }

  setDrawColor(color: string): void {
    this.observer.dispatch({
      type: DRAW_COLOR,
      payload: color,
    });
  }

  clearBoard(): void {
    this.observer.dispatch({
      type: CLEAR_BOARD,
      payload: null,
    });
  }
}
