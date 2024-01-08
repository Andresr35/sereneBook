import PropTypes from "prop-types";
import Nav from "../components/Nav";
import useUsers from "../hooks/useUsers";
import useThisUser from "../hooks/useThisUser";
import { useNavigate } from "react-router-dom";

const Friends = ({ url }) => {
  const { users } = useUsers(url);
  const { user } = useThisUser(url);
  const navigate = useNavigate();

  const filterFriends = () => {
    // Make sure this is not current user and any of users friends
    if (!users) return [];
    if (!user) return [];
    return users.filter((friend) =>
      friend._id != user._id
        ? !user.friends.includes(friend._id)
          ? !user.friendRequests.includes(friend._id)
            ? true
            : false
          : false
        : false
    );
  };
  const isButton = (e) => e.tagName.toLowerCase() == "button";

  const sendFriendRequest = async (e, possibleFriend) => {
    e.preventDefault();
    const fetchRes = await fetch(
      `${url}/api/users/${possibleFriend}/friendRequests`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user._id,
        }),
      }
    );
    if (fetchRes.status == 401) return navigate("/login");
    const fetchData = await fetchRes.json();
    if (fetchData.status == 201) {
      //change image to checkmark instead and make button unclickable
      if (isButton(e.target)) e.target.firstChild.src = "/check.svg";
      else {
        e.target.parentElement.disabled = true;
        e.target.src = "/check.svg";
      }
    }
  };

  return (
    <>
      <Nav header={"Add new friends?"} url={url} />
      {users &&
        filterFriends().map((possibleFriend, index) => (
          <p key={index}>
            {possibleFriend.name}
            <button onClick={(e) => sendFriendRequest(e, possibleFriend._id)}>
              <img src="/plus.svg" alt="add friend button" />
            </button>
          </p>
        ))}
    </>
  );
};

Friends.propTypes = {
  url: PropTypes.string,
};

export default Friends;
