import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../actions/dataActions";
import ProfileInfo from "../components/ProfileInfo";
import { GlobalContext } from "../context/GlobalContext";

import "../styles/Profile.css";

const profileItems = [
  {
    title: "profile",
    selected: true,
  },
  {
    title: "stats",
    selected: false,
  },
  {
    title: "match history",
    selected: false,
  },
  {
    title: "achievements",
    selected: false,
  },
];

const Profile = () => {
  const username = useParams().username;

  const {
    state: {
      data: { search },
    },
    dispatch,
  } = useContext(GlobalContext);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getUserProfile(dispatch, username || "");
  }, [username]);

  const changeDisplay = (index: number) => {
    profileItems.forEach((item, i) => {
      if (i === index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      setSelected(index);
    });
  };

  return (
    <div className="profile-container">
      <div className="avatar">
        <img src={search?.rank?.border} alt="border" className="border" />
        <img src={search?.avatar} alt="avatar" className="user-image" />
        <h1>{search?.username}</h1>
      </div>
      <div className="menu">
        {profileItems.map((item, i) => {
          return (
            <div
              key={i}
              className={
                item.selected ? "menu-item menu-selected" : "menu-item"
              }
              onClick={() => changeDisplay(i)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="stats">
        {profileItems[0].selected && <ProfileInfo data={search} />}
        {profileItems[1].selected && <div></div>}
        {profileItems[2].selected && <div></div>}
        {profileItems[3].selected && <div></div>}
      </div>
    </div>
  );
};

export default Profile;
