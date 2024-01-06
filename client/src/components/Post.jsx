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

const Post = ({ post }) => {
  const [openComments, setOpenComments] = useState(false);
  const handleComment = setOpenComments(!openComments);

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
            <Comment comment={comment} key={index} />
          ))}
          <form
            className={styles.addComment}
            onSubmit={(e) => addComment(e, blog._id)}
          >
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

Post.propTypes = { post: PropTypes.object };

export default Post;
