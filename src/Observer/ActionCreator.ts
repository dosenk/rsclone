import Observer from './index.Observer';
import { LANG, LOADING } from './actionTypes';
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
}
