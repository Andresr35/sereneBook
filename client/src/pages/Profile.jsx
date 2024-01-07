import PropTypes from "prop-types";
import Nav from "../components/Nav";
// import { useUser } from "../hooks/useUser";
import Posts from "../components/Posts";

const Profile = ({ url }) => {
  // const user = useUser(url);
  return (
    <>
      <Nav header={"Profile"} />
      <main>
        <Posts url={url} />
      </main>
    </>
  );
};

Profile.propTypes = {
  url: PropTypes.string,
};

export default Profile;
