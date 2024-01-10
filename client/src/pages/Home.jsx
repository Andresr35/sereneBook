import Nav from "../components/Nav";
import PropTypes from "prop-types";
import Posts from "../components/Posts";
import Chat from "../components/Chat";

const Home = ({ url }) => {
  return (
    <>
      <Nav header={"Home Page"} url={url} />
      <main>
        <Chat url={url} />
        <Posts url={url} includeFriends={true} />
      </main>
    </>
  );
};
Home.propTypes = {
  url: PropTypes.string,
};
export default Home;
