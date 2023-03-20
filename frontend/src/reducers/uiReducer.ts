import { SET_LOADING } from "../actions/types";

export const uiReducer = (state = { loading: false }, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
