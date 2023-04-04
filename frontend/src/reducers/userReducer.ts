import {
  GET_CURRENT_USER,
  PATCH_CURRENT_USER,
  LOGOUT_USER,
} from "../actions/types";

export const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        connected: action.payload.status === "Success",
        data: action.payload.data,
      };
    case PATCH_CURRENT_USER:
      return {
        ...state,
        data: action.payload.data,
      };
    case LOGOUT_USER:
      return {
        ...state,
        connected: !(action.payload.status === "Success"),
        data: {},
      };
    default:
      return state;
  }
};
