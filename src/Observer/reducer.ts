import { LOADING, INIT } from './actionTypes';

export default (state, action) => {
  switch (action.type) {
    case INIT:
      return {
        loading: true,
        ...state,
      };
    case LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
