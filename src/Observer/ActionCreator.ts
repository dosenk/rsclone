import Observer from './index.Observer';
import {
  DRAW,
  DRAW_COLOR,
  DRAW_THICKNESS,
  LANG,
  LOADING,
  NAME,
  ROLE,
} from './actionTypes';
import langItem from '../LangDictionaries/en';

export default class ActionCreator {
  private observer: Observer;

  constructor(observer: Observer) {
    this.observer = observer;
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

  setDraw(draw: Object): void {
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
}
