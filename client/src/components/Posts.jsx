import PropTypes from "prop-types";
import Post from "../../../server/models/Post";
import usePosts from "../hooks/usePosts";

const Posts = ({ url }) => {
  const { posts, setPosts } = usePosts(url);
  const setNewPost = (newPost, index) => {
    const newPosts = [...posts];

    if (Object.keys(newPost).length == 0) newPosts.splice(index, 1);
    else newPosts[index] = newPost;
    setPosts(newPosts);
  };
  return (
    <div>
      {posts.map((post, index) => (
        <Post
          post={post}
          key={index}
          url={url}
          setNewPost={(newPost) => setNewPost(newPost, index)}
        />
      ))}
    </div>
  );
};

Posts.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Posts;
