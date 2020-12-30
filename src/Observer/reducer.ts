import { LOADING, INIT } from './actionTypes';
import IAction from './Interfaces/IAction';
import IState from './Interfaces/IState';

export default (state: IState, action: IAction) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
      };
    case LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
