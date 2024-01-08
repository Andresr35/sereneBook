import PropTypes from "prop-types";
import useUser from "../hooks/useUser";

const Bio = ({ url }) => {
  const user = useUser(url);
  return (
    <div>
      <h2>{user.name}</h2>
      <img src={user.picture} alt="user picture" />
      <p>
        {user.age} {user.gender}
      </p>
      <p>{user.bio}</p>
    </div>
  );
};

Bio.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Bio;
