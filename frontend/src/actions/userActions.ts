import { Dispatch } from "react";
import {
  GET_CURRENT_USER,
  PATCH_CURRENT_USER,
  LOGOUT_USER,
  SET_LOADING,
} from "./types";

export const getCurrentUser = async (dispatch: Dispatch<any>) => {
  dispatch({ type: SET_LOADING, payload: true });
  const res = await fetch("http://localhost:3001/api/user", {
    credentials: "include",
    mode: "cors",
  });
  const user = await res.json();

  dispatch({ type: GET_CURRENT_USER, payload: user });
  setTimeout(() => {
    dispatch({ type: SET_LOADING, payload: false });
  }, 2000);
};

export const patchCurrentUser = async (
  dispatch: Dispatch<any>,
  user: {
    username: string;
    avatar: any;
  }
) => {
  let updatedAvatar: any;
  if (user.avatar) {
    const formData = new FormData();
    formData.append("avatar", user.avatar);

    const res = await fetch("http://localhost:3001/api/upload", {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: formData,
    });

    updatedAvatar = await res.json();
  }

  const res = await fetch("http://localhost:3001/api/user", {
    method: "PATCH",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      avatar: updatedAvatar ? updatedAvatar.data : null,
    }),
  });

  const updatedUser = await res.json();

  console.log({ updatedUser });

  dispatch({ type: PATCH_CURRENT_USER, payload: updatedUser });
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
