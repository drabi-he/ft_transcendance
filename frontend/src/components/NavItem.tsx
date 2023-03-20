import React, { FC } from "react";

interface NavItemProps {
  icon: JSX.Element;
  title: string;
  selected: boolean;
  onClick?: () => void;
}

const NavItem: FC<NavItemProps | any> = (props) => {
  return (
    <div
      className={props.selected ? "item selected" : "item"}
      onClick={props.onClick}
    >
      <div className="item-icon">{props.icon}</div>
      <div className="item-title">{props.title}</div>
    </div>
  );
};

export default NavItem;
