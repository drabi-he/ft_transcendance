import { Dispatch } from "react";
import { SET_LOADING } from "./types";

export const setLoading = (dispatch: Dispatch<any>, loading: boolean) => {
  dispatch({ type: SET_LOADING, payload: loading });
};
