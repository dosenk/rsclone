import { LOADING } from './actionTypes';

export default class ActionCreator {
  constructor(observer) {
    this.observer = observer;
  }

  setLoading(isLoading = true) {
    if (this.observer.getState().loading === isLoading) return;

    this.observer.dispatch({
      type: LOADING,
      payload: isLoading,
    });
  }
}
