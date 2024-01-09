import PropTypes from "prop-types";
import Nav from "../components/Nav";
import Posts from "../components/Posts";
import Bio from "../components/Bio";
import useUser from "../hooks/useUser";

const Profile = ({ url }) => {
  const user = useUser(url);

  return (
    <>
      <Nav header={"Profile"} url={url}>
        <img
          style={{ width: "50px", borderRadius: "100%" }}
          src={user.picture}
          alt="user Picture"
        />
      </Nav>
      <main>
        <Bio url={url} user={user} />
        <Posts url={url} includeFriends={false} />
      </main>
    </>
  );
};

Profile.propTypes = {
  url: PropTypes.string,
};

export default Profile;
