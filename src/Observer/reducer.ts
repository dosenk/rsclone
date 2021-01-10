import { LOADING, INIT, LANG, ROLE, NAME } from './actionTypes';
import IAction from './Interfaces/IAction';
import IState from './Interfaces/IState';

export default (state: IState, action: IAction): IState => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
      };
    case LOADING:
      return { ...state, loading: action.payload };
    case LANG:
      return { ...state, langData: action.payload };
    case ROLE:
      return { ...state, role: action.payload };
    case NAME:
      return { ...state, role: action.payload };

    default:
      return state;
  }
};
