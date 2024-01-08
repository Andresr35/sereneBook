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
  const [addCommentError, setAddCommentError] = useState("");
  const [handleLikeError, setHandleLikeError] = useState("");
  const [deletePostError, setDeletePostError] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const handleComment = () => setOpenComments(!openComments);
  const authenticated = localStorage.getItem("userID") == post.author._id;

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
        userID: localStorage.getItem("userID"),
      }),
    });
    if (addCommentRes.status == 401) return navigate("/login");
    const addCommentData = await addCommentRes.json();
    if (addCommentData.status == 201) setNewPost(addCommentData.newPost);
    else setAddCommentError(addCommentData.message);
    e.target.reset();
  };

  const deletePost = async (e) => {
    e.preventDefault();
    const deletePostRes = await fetch(`${url}/api/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (deletePostRes.status == 401) return navigate("/login");
    const deletePostData = await deletePostRes.json();
    if (deletePostData.status == 200) setNewPost({});
    else setDeletePostError(deletePostData.message);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const likeRes = await fetch(`${url}/api/posts/${post._id}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: localStorage.getItem("userID"),
      }),
    });
    if (likeRes.status == 401) return navigate("/login");
    const likeData = await likeRes.json();
    if (likeData.status == 200) setNewPost(likeData.newPost);
    else setHandleLikeError(likeData.message);
  };

  return (
    <div className={styles.postContainer}>
      <h4>{post.title}</h4>
      <hr />
      <p>{post.message}</p>
      <p className={styles.timestamp}>Created: {post.date}</p>
      <p>{post.author.name}</p>
      {!handleLikeError.length == 0 && <p>{handleLikeError}</p>}

      <p onClick={handleLike}>Likes: {post.likes.length}</p>
      <button className={styles.icon} onClick={handleComment}>
        <div>{post.comments.length}</div>
        <img src="/chat.svg" alt="chat button img" />
      </button>
      {authenticated && (
        <>
          {!deletePostError.length == 0 && <p>{deletePostError}</p>}

          <button className={styles.icon} onClick={deletePost}>
            <img src="/delete.svg" alt="Delete post" />
          </button>
        </>
      )}
      {openComments && (
        <div className={styles.commentsContainer}>
          {post.comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={index}
              setPost={setNewPost}
              url={url}
            />
          ))}
          <form className={styles.addComment} onSubmit={addComment}>
            {!addCommentError.length == 0 && <p>{addCommentError}</p>}
            <input type="text" name="comment" placeholder="Add Comment" />
            <button className={styles.icon} type="submit">
              <img src="/send.svg" alt="Add comment Button" />
            </button>
          </form>
        </div>
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
