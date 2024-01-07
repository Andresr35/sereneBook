import { useState } from "react";
import PropTypes from "prop-types";
import styles from "../assets/Post.module.css";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ url, setNewPost }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    message: "",
  });
  const [error, setError] = useState();
  const createPost = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: input.title,
        message: input.message,
        author: localStorage.getItem("userID"),
      }),
    });
    if (res.status == 401) return navigate("/login");
    const data = await res.json();
    if (data.status == 201) setNewPost(data.newPost);
    else setError(data.message);
  };
  return (
    <div>
      {!error.length == 0 && <p>{error}</p>}
      <form className={styles.container} onSubmit={createPost}>
        <label className={styles.title}>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={input.title}
            placeholder="Enter Title"
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </label>
        <label className={styles.message}>
          <textarea
            type="text"
            name="message"
            id="message"
            value={input.message}
            required
            onChange={(e) => setInput({ ...input, message: e.target.value })}
            placeholder="Enter Message"
          />
        </label>
        <button type="Submit">Add Post</button>
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  url: PropTypes.string.isRequired,
  setNewPost: PropTypes.func.isRequired,
};

export default CreatePost;
