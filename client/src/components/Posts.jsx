import PropTypes from "prop-types";
import Post from "../components/Post";
import usePosts from "../hooks/usePosts";
import CreatePost from "./CreatePost";

const Posts = ({ url, includeFriends }) => {
  const { posts, setPosts } = usePosts(url, includeFriends);
  const setNewPost = (newPost, index) => {
    const newPosts = [...posts];
    if (Object.keys(newPost).length == 0 && index !== undefined)
      newPosts.splice(index, 1);
    else if (index === undefined) newPosts.push(newPost);
    else newPosts[index] = newPost;
    setPosts(newPosts);
  };

  return (
    <div>
      <CreatePost url={url} setNewPost={setNewPost} />
      {posts &&
        posts.map((post, index) => (
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
  includeFriends: PropTypes.bool.isRequired,
};

export default Posts;
