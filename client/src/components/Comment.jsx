/**
 * This page handles rendering a comment. It should show all data in comment object.
 *
 * TODO
 * Make date and author show on right side with small lettering and lighter font color
 * If this is the comment you made, you may delete it
 * make sure authors for each comment, the author is populated
 * make sure backend checks authentication token for user matches author id as well
 *
 */
import PropTypes from "prop-types";
import styles from "../assets/Post.module.css";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, url }) => {
  const navigate = useNavigate();
  const authenticated = localStorage.getItem("userID") == comment.author._id;

  const deleteComment = async (e, commentID) => {
    e.preventDefault();
    const deleteCommentRes = await fetch(
      `${url}/api/posts/comments/${commentID}`,
      {
        method: "DELETE",
      }
    );
    if (deleteCommentRes.status == 401) return navigate("/login");
    const deleteCommentData = await deleteCommentRes.json();
    if (deleteCommentData.status == 200) {
      // do something about it
    } else; // show that they were not authenticated or something
  };

  return (
    <div className={styles.commentContainer}>
      <p>{comment.message}</p>
      <p>{comment.date}</p>
      <p>{comment.author.name}</p>
      {authenticated && (
        <button
          className={styles.delete}
          onClick={(e) => deleteComment(e, comment._id)}
        >
          <img src="../../delete-svgrepo-com.svg" alt="Delete Button" />
        </button>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  url: PropTypes.string.isRequired,
};

export default Comment;
