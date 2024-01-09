import PropTypes from "prop-types";
import Nav from "../components/Nav";
import useUsers from "../hooks/useUsers";
import useThisUser from "../hooks/useThisUser";
import { Link, useNavigate } from "react-router-dom";

const Friends = ({ url }) => {
  const { users, setUsers } = useUsers(url);
  const { user } = useThisUser(url);
  const navigate = useNavigate();

  const filterFriends = () => {
    // Make sure this is not current user and any of users friends
    if (!users) return [];
    if (!user) return [];
    return users.filter((friend) =>
      friend._id != user._id
        ? !user.friends.includes(friend._id)
          ? true
          : false
        : false
    );
  };

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
      const newUsers = [...users];
      const newUserIndex = newUsers.findIndex(
        (newUser) => newUser._id == fetchData.userRecieving._id
      );
      newUsers[newUserIndex] = fetchData.userRecieving;
      setUsers(newUsers);
    }
  };

  const previouslyRequested = (possibleFriend) => {
    // if (!possibleFriend.friendRequests) return false;
    return possibleFriend.friendRequests.includes(user._id);
  };

  return (
    <>
      <Nav header={"Add new friends?"} url={url} />
      <main>
        <div>
          {users &&
            filterFriends().map((possibleFriend, index) => (
              <p key={index}>
                <Link to={possibleFriend.url}> {possibleFriend.name}</Link>

                <button
                  onClick={(e) => sendFriendRequest(e, possibleFriend._id)}
                >
                  <img
                    src={
                      previouslyRequested(possibleFriend)
                        ? "/check.svg"
                        : "/plus.svg"
                    }
                    alt="add friend button"
                  />
                </button>
              </p>
            ))}
        </div>
      </main>
    </>
  );
};

Friends.propTypes = {
  url: PropTypes.string,
};

export default Friends;
