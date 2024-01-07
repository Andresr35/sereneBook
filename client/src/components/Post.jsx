/**
 * This page will just handle putting a post on the page
 *
 * TODO
 * Don't allow the same user to like
 * If a post is yours allow to edit
 * add images to like, delete, and comment buttons
 *
 */

import PropTypes from "prop-types";
import styles from "../assets/Post.module.css";
import { useState } from "react";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setNewPost, url }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const handleComment = setOpenComments(!openComments);

  const addComment = async (e) => {
    e.preventDefault();
    const addCommentRes = await fetch(`${url}/api/posts/${post._id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: e.target.comment.value,
        author: localStorage.getItem("userID"),
      }),
    });
    if (addCommentRes.status == 401) return navigate("/login");
    const addCommentData = await addCommentRes.json();
    if (addCommentData.status == 201) {
      // start doing stuff
    } else setError(addCommentData.message);
  };

  return (
    <div className={styles.postContainer}>
      <h4>{post.title}</h4>
      <hr />
      <p>{post.message}</p>
      <p className={styles.timestamp}>Created: {post.timestamp}</p>
      <p>Likes: {post.likes.length}</p>
      <button onClick={handleComment}>Open Comments</button>
      {openComments && (
        <div className={styles.commentsContainer}>
          {post.comments.map((comment, index) => (
            <Comment comment={comment} key={index} setPost={setNewPost} />
          ))}
          <form className={styles.addComment} onSubmit={addComment}>
            {!error.length == 0 && <p>{error}</p>}
            <input type="text" name="comment" placeholder="Add Comment" />
            <button className={styles.add} type="submit">
              <img src="../../checkmark-svgrepo-com.svg" alt="Delete Button" />
            </button>
          </form>
        </div>
      )}
      {authenticated && (
        <button
          className={styles.delete}
          onClick={(e) => deletePost(e, post._id)}
        >
          <img src="../../delete-svgrepo-com.svg" alt="Delete Button" />
        </button>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  setNewPost: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Post;
