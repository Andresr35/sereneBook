import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = ({ header, url }) => {
  const [authenticated, setAuthenticaed] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const res = await fetch(`${url}/api/users/authenticate`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) setAuthenticaed(true);
      else setAuthenticaed(false);
    };
    checkAuthentication();
  }, []);

  return (
    <nav>
      <div></div>
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
  url: PropTypes.string.isRequired,
  header: PropTypes.string,
};

export default Nav;
