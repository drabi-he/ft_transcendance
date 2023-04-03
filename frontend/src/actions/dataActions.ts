import { Dispatch } from "react";
import { GET_USER_PROFILE, SET_LOADING } from "./types";

export const getUserProfile = async (
  dispatch: Dispatch<any>,
  username: string
) => {
  dispatch({ type: SET_LOADING, payload: true });
  const res = await fetch(`http://localhost:3001/api/user/${username}`, {
    credentials: "include",
    mode: "cors",
  });
  const user = await res.json();
  console.log({ user });
  if (user.status !== "Error")
    dispatch({ type: GET_USER_PROFILE, payload: user });
  setTimeout(() => {
    dispatch({ type: SET_LOADING, payload: false });
  }, 2000);
};
