import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useThisUser from "../hooks/useThisUser";

const Nav = ({ header, url, children }) => {
  const { authenticated } = useThisUser(url);
  return (
    <nav>
      <div>{children}</div>
      <div>
        <h2>{header}</h2>
      </div>
      <div>
        <ul>
          {authenticated && (
            <>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={`/profile/${localStorage.getItem("userID")}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/friends"}>Find Friends</Link>
              </li>
            </>
          )}
          {!authenticated && (
            <>
              <li>
                <Link to={"/login"}>Log in</Link>
              </li>
              <li>
                <Link to={"/signup"}>Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.object,
  url: PropTypes.string.isRequired,
  header: PropTypes.string,
};

export default Nav;
