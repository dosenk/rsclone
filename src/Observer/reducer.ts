import {
  LOADING,
  INIT,
  LANG,
  ROLE,
  NAME,
  DRAW,
  DRAW_THICKNESS,
  DRAW_COLOR,
  USERS,
  GAME,
} from './actionTypes';
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
      return { ...state, name: action.payload };
    case USERS:
      return { ...state, users: action.payload };
    case DRAW:
      return { ...state, draw: action.payload };
    case DRAW_THICKNESS:
      return { ...state, drawThickness: action.payload };
    case DRAW_COLOR:
      return { ...state, drawColor: action.payload };
    case GAME:
      return { ...state, game: action.payload };
    default:
      return state;
  }
};
