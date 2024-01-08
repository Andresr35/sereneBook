import PropTypes from "prop-types";

const Bio = ({ user }) => {
  return (
    <div>
      {/* <img src={user.picture} alt="user picture" /> */}
      <div>
        <h2>{user.name}</h2>
        <p>
          {/*  Put this header and p tag side by side */}
          {user.age} | {user.gender}
        </p>
      </div>

      <p>{user.bio}</p>
    </div>
  );
};

Bio.propTypes = {
  url: PropTypes.string,
  user: PropTypes.object,
};

export default Bio;
