import PropTypes from "prop-types";
import Nav from "../components/Nav";
import { useUser } from "../hooks/useUser";

const Profile = ({ url }) => {
  const user = useUser(url);
  return (
    <>
      <Nav />
      <main>Profile</main>
    </>
  );
};

Profile.propTypes = {
  url: PropTypes.string,
};

export default Profile;
