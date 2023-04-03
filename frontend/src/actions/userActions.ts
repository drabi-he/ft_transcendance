import { Dispatch } from "react";
import { GET_CURRENT_USER, LOGOUT_USER, SET_LOADING } from "./types";

export const getCurrentUser = async (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_LOADING, payload: true });
  const res = await fetch("http://localhost:3001/api/user", {
    credentials: "include",
    mode: "cors",
  });
  const user = await res.json();

  if (user.status !== "Error")
    dispatch({ type: GET_CURRENT_USER, payload: user });
  setTimeout(() => {
    dispatch({ type: SET_LOADING, payload: false });
  }, 2000);
};

export const logoutUser = async (dispatch: Dispatch<any>) => {
  const res = await fetch("http://localhost:3001/api/logout", {
    method: "POST",
    credentials: "include",
    mode: "cors",
  });
  const user = await res.json();

  if (user.status !== "Error") dispatch({ type: LOGOUT_USER, payload: user });
};
