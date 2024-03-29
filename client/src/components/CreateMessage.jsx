import PropTypes from "prop-types";
import { useState } from "react";
import useThisUser from "../hooks/useThisUser";
import { useNavigate } from "react-router-dom";
import styles from "../assets/Chat.module.css";

const CreateMessage = ({ url, setMessages, messages }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState({
    message: "",
    recieverID: "",
  });
  const { user } = useThisUser(url);
  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageRes = await fetch(
      `${url}/api/users/${localStorage.getItem("userID")}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...message,
        }),
      }
    );
    if (messageRes.status == 401) return navigate("/login");
    const messageData = await messageRes.json();
    if (messageData.status == 201) {
      setMessages([...messages, messageData.newMessage]);
      setMessage({ message: "", recieverID: "" });
      e.target.reset();
    } else {
      setError(messageData.message);
    }
  };

  return (
    <>
      <form onSubmit={sendMessage} className={styles.form}>
        {!error.length == 0 && <p>{error}</p>}
        <select
          name="recipient"
          defaultValue="select"
          onChange={(e) =>
            setMessage({ ...message, recieverID: e.target.value })
          }
        >
          <option value="select" disabled>
            Friend
          </option>
          {user &&
            user.friends.map((user, index) => (
              <option key={index} value={user._id}>
                {user.name}
              </option>
            ))}
        </select>
        <hr />
        <div>
          <input
            type="text"
            placeholder="Message"
            value={message.message}
            onChange={(e) =>
              setMessage({ ...message, message: e.target.value })
            }
          />
          <button type="submit">
            <img src="/downSend.svg" alt="send button" />
          </button>
        </div>
      </form>
    </>
  );
};

CreateMessage.propTypes = {
  url: PropTypes.string.isRequired,
  messages: PropTypes.array,
  setMessages: PropTypes.func,
};

export default CreateMessage;
