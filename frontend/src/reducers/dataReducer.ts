import { GET_USER_PROFILE, GET_ALL_USERS } from "../actions/types";

export const dataReducer = (state = [], action: any) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        search: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
