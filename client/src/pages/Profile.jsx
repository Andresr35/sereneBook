import PropTypes from "prop-types";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
import Bio from "../components/Bio";

const Profile = ({ url }) => {
  return (
    <>
      <Nav header={"Profile"} />
      <main>
        <Bio url={url} />
        <Posts url={url} />
      </main>
    </>
  );
};

Profile.propTypes = {
  url: PropTypes.string,
};

export default Profile;
