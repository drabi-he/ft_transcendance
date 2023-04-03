import React, { FC, useState } from "react";
import { dataType } from "../context/GlobalContext";

import "../styles/ProfileInfo.css";

interface Props {
  data: dataType;
}

const ProfileInfo: FC<Props> = (props) => {
  const [username, setUsername] = useState("username");
  const [avatar, setAvatar] = useState(null);

  const imgPreview = (e: any, setImg: any) => {
    const img = document.querySelector(
      ".update-avatar img"
    ) as HTMLImageElement;
    if (img) img.src = URL.createObjectURL(e.target.files[0]);
    console.log({ avatar });
    setImg(e.target.files[0]);
  };

  return (
    <div className="profileInfo-container">
      <div className="info">
        <div>
          <p>
            <span>first name: </span>
            <span>{props.data.first_name}</span>
          </p>
          <p>
            <span>last name: </span>
            <span>{props.data.last_name}</span>
          </p>
          <p>
            <span>login: </span>
            <span>{props.data.login}</span>
          </p>
          <p>
            <span>campus: </span>
            <span>{props.data.campus}</span>
          </p>
          <p>
            <span>cursus level: </span>
            <span>{props.data.cursus_lvl}</span>
          </p>
          <p>
            <span>game level:</span>
            <span>{props.data.game_lvl}</span>
          </p>
        </div>
      </div>
      <div className="line"></div>
      <div className="edit">
        <label htmlFor="upload-avatar">
          <div className="update-avatar">
            <img src="/assets/avatar.png" alt="update avatar" />
          </div>
        </label>
        <input
          type="file"
          id="upload-avatar"
          style={{ display: "none" }}
          onChange={(e) => imgPreview(e, setAvatar)}
        />
        <p>{username}</p>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <div className="btn-update">save</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
