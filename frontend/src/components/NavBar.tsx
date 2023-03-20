import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import NavItem from "./NavItem";

import "../styles/NavBar.css";

/********************* ICONS *********************/
import { MdKeyboardArrowLeft, MdLeaderboard } from "react-icons/md";
import { IoHome, IoGameControllerOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

const menuItems = [
  {
    title: "home",
    icon: <IoHome color="#5EBFDF" />,
    selected: true,
  },
  {
    title: "game",
    icon: <IoGameControllerOutline color="#F3754D" />,
    selected: false,
  },
  {
    title: "leaderboard",
    icon: <MdLeaderboard color="#F6FA4D" />,
    selected: false,
  },
  {
    title: "connections",
    icon: <FaUserFriends color="#63FF55" />,
    selected: false,
  },
];

const NavBar = () => {
  const {
    state: {
      user: { connected },
    },
    dispatch,
  } = useContext(GlobalContext);

  const [selected, setSelected] = useState(0);
  const [hidden, setHidden] = useState(false);

  const menuRef = useRef(null);

  const ChangeMenu = (index: number) => {
    menuItems.forEach((item, i) => {
      if (i === index) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      setSelected(index);
    });
  };

  return (
    <div className={hidden ? "navbar-container hidden" : "navbar-container"}>
      <div
        className="menu-btn"
        onClick={() => {
          setHidden((prev) => !prev);
        }}
      >
        <MdKeyboardArrowLeft />
      </div>
      <div className="nav-items">
        {menuItems.map((item, index) => {
          return (
            <NavItem
              key={index}
              icon={item.icon}
              title={item.title}
              selected={item.selected}
              onClick={() => {
                ChangeMenu(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
