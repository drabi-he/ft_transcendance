import { GET_USER_PROFILE } from "../actions/types";

export const dataReducer = (state = [], action: any) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return [action.payload];
    default:
      return state;
  }
};
