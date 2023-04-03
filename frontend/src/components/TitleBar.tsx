import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../actions/userActions";
import { GlobalContext } from "../context/GlobalContext";

import "../styles/TitleBar.css";

import {
  MdPersonSearch,
  MdKeyboardArrowDown,
  MdOutlineLogout,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const TitleBar = () => {
  const {
    state: { user, ui },
    dispatch,
  } = useContext(GlobalContext);

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    getCurrentUser(dispatch);
  }, []);

  const logout = () => {
    logoutUser(dispatch);
  };
  return (
    <div className="title-container">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <MdPersonSearch />
      </div>
      <div className="title">ft_transcendance</div>
      {user && user.connected ? (
        <div className={dropdown ? "user-btn drop-down" : "user-btn"}>
          <div
            className="user-div"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <div className="user-avatar">
              <img src={user.data?.avatar} alt="avatar" />
            </div>
            <div className="username">{user.data?.username}</div>
            <MdKeyboardArrowDown />
          </div>
          <Link
            to={`/profile/${user.data?.username}`}
            className="profile"
            onClick={() => {
              setDropdown(false);
            }}
          >
            <FaUser />
            profile
          </Link>
          <div className="logout" onClick={logout}>
            <MdOutlineLogout />
            logout
          </div>
        </div>
      ) : (
        <a href={process.env.REACT_APP_API_URL_42} className="login-btn">
          {ui.loading ? (
            <Loader />
          ) : (
            <svg
              width="52"
              height="37"
              viewBox="0 0 52 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32.5601 10.2311V1H41.7242H51V10.2311L41.7801 19.4846V28.671L51 19.4846V28.671H41.7801H32.5601V19.4846L41.7242 10.2311V1L32.5601 10.2311Z"
                fill="white"
              />
              <path
                d="M41.7801 28.671H32.5601V19.4846L41.7242 10.2311V1L32.5601 10.2311V1H51V10.2311L41.7801 19.4846V28.671ZM41.7801 28.671H51V19.4846L41.7801 28.671Z"
                stroke="black"
                stroke-opacity="0.1"
              />
              <path
                d="M1 19.3728L19.4175 1H28.6263L10.1864 19.4622H28.6263V36.1587H19.4175V26.8829H1V19.3728Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.1"
              />
            </svg>
          )}
        </a>
      )}
    </div>
  );
};

export default TitleBar;
