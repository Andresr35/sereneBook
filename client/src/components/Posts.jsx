import PropTypes from "prop-types";
import Post from "../../../server/models/Post";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
