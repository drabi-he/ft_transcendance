import { Dispatch } from "react";
import { GET_CURRENT_USER } from "./types";

export const getCurrentUser = async (dispatch: Dispatch<any>) => {
  const res = await fetch("http://localhost:3001/api/user", {
    credentials: "include",
    mode: "cors",
  });
  const user = await res.json();

  console.log({ user });
  dispatch({ type: GET_CURRENT_USER, payload: user });
};
