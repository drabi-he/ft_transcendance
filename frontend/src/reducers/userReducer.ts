import { GET_CURRENT_USER } from "../actions/types";

export const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        connected: action.payload.status === "Success",
        data: action.payload.data,
      };
    default:
      return state;
  }
};
