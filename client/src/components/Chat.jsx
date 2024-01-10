import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateMessage from "./CreateMessage";
import { useNavigate } from "react-router-dom";
import useThisUser from "../hooks/useThisUser";
import styles from "../assets/Chat.module.css";

const Chat = ({ url }) => {
  const [messages, setMessages] = useState([]);
  const [openMessage, setOpenMessage] = useState("");
  const [error, setError] = useState("");
  const { user } = useThisUser(url);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const userRes = await fetch(
        `${url}/api/users/${localStorage.getItem("userID")}/messages`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (userRes.status == 401) navigate("/");
      const userData = await userRes.json();
      if (userData.status == 200) {
        setMessages(userData.messages);
      } else {
        setError(userData.message);
      }
    };
    fetchMessages();
  }, []);

  const toggleName = (name) => {
    if (openMessage == name) {
      setOpenMessage("");
    } else setOpenMessage(name);
  };

  const grabUsers = () => {
    if (!user) return {};
    return messages.reduce((prev, curr) => {
      if (
        !Object.prototype.hasOwnProperty.call(prev, curr.reciever._id) &&
        curr.reciever.name != user.name
      )
        prev[curr.reciever._id] = {
          name: curr.reciever.name,
        };
      return prev;
    }, {});
  };

  const sendMessage = async (e, recieverID) => {
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
          message: e.target.message.value,
          recieverID: recieverID,
        }),
      }
    );
    if (messageRes.status == 401) return navigate("/login");
    const messageData = await messageRes.json();
    if (messageData.status == 201) {
      setMessages([...messages, messageData.newMessage]);
      e.target.reset();
    }
  };

  return (
    <div className={styles.chat}>
      <CreateMessage url={url} setMessages={setMessages} messages={messages} />
      {error.length != 0 && <p>{error}</p>}
      {Object.entries(grabUsers()).map(([id, { name }]) => (
        <div key={id} className={styles.bubble}>
          <h4 onClick={() => toggleName(name)}>{name}</h4>

          {name == openMessage && (
            <div>
              <hr />
              {messages
                .filter(
                  (message) =>
                    message.reciever.name == name ||
                    message.messenger.name == name
                )
                .map((message, index) => (
                  <p
                    key={index}
                    className={
                      message.messenger.name == user.name
                        ? styles.messenger
                        : styles.reciever
                    }
                  >
                    {message.message}
                  </p>
                ))}
              <form onSubmit={(e) => sendMessage(e, id)}>
                <input type="text" placeholder="Message" name="message" />
                <button type="submit">
                  <img src="/downSend.svg" alt="send button" />
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
Chat.propTypes = { url: PropTypes.string.isRequired };

export default Chat;
