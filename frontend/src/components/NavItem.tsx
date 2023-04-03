import React, { FC } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  icon: JSX.Element;
  title: string;
  selected: boolean;
  path: string;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps | any> = (props) => {
  return (
    <Link
      to={props.path}
      className={props.selected ? "item selected" : "item"}
      onClick={props.onClick}
    >
      <div className="item-icon">{props.icon}</div>
      <div className="item-title">{props.title}</div>
    </Link>
  );
};

export default NavItem;
