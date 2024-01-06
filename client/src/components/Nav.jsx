import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Nav = ({ header }) => {
  return (
    <nav>
      <div></div>
      <div>
        <h2>{header}</h2>
      </div>
      <div>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          <li>
            <Link to={"/login"}>Log in</Link>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  url: PropTypes.string,
  header: PropTypes.string,
};

export default Nav;
