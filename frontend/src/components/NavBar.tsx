import { useState } from "react";
import NavItem from "./NavItem";

import "../styles/NavBar.css";

/********************* ICONS *********************/
import { MdKeyboardArrowLeft, MdLeaderboard } from "react-icons/md";
import { IoHome, IoGameControllerOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";

const menuItems = [
  {
    title: "home",
    path: "/",
    icon: <IoHome color="#5EBFDF" />,
    selected: true,
  },
  {
    title: "game",
    path: "/game",
    icon: <IoGameControllerOutline color="#F3754D" />,
    selected: false,
  },
  {
    title: "leaderboard",
    path: "/leaderboard",
    icon: <MdLeaderboard color="#F6FA4D" />,
    selected: false,
  },
  {
    title: "connections",
    path: "/connections",
    icon: <FaUserFriends color="#63FF55" />,
    selected: false,
  },
];

const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const [hidden, setHidden] = useState(false);

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
              path={item.path}
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
