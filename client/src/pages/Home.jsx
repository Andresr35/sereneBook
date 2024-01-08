import Nav from "../components/Nav";
import PropTypes from "prop-types";

const Home = ({ url }) => {
  return (
    <>
      <Nav header={"Home Page"} url={url} />
      <main>
        <h1>Welcome to Serene Book</h1>
      </main>
    </>
  );
};
Home.propTypes = {
  url: PropTypes.string,
};
export default Home;
