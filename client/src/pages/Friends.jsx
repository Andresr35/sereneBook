import PropTypes from "prop-types";
import Nav from "../components/Nav";
import useUsers from "../hooks/useUsers";
import useThisUser from "../hooks/useThisUser";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Chat from "../components/Chat";

const Friends = ({ url }) => {
  const { users, setUsers } = useUsers(url);
  const { user, setUser } = useThisUser(url);
  const [errors, setErrors] = useState({
    handleRequestError: "",
    friendRequestError: "",
  });
  const navigate = useNavigate();

  const filterFriends = () => {
    // Make sure this is not current user and any of users friends
    if (!users) return [];
    if (!user) return [];

    return users.filter((friend) =>
      friend._id != user._id
        ? !user.friends.find((request) => request._id == friend._id)
          ? !user.friendRequests.find((request) => request._id == friend._id)
            ? true
            : false
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
    } else {
      setErrors({ ...errors, friendRequestError: fetchData.message });
    }
  };

  const previouslyRequested = (possibleFriend) => {
    // if (!possibleFriend.friendRequests) return false;
    return possibleFriend.friendRequests.includes(user._id);
  };

  const handleRequest = async (e, accept, friendID) => {
    e.preventDefault();
    const res = await fetch(`${url}/api/users/${friendID}/friendRequests`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: user._id,
        accepted: accept,
      }),
    });
    if (res.status == 401) return navigate("/login");
    const data = await res.json();
    if (data.status == 200) {
      setUser(data.userRequesting);
    } else {
      setErrors({ ...errors, handleRequestError: data.message });
    }
  };

  return (
    <>
      <Nav header={"Add new friends?"} url={url} />
      <main>
        <Chat url={url} />
        <div className="friendButtons" style={{ flex: "1 1 70%" }}>
          <div>
            <p>Current Friends</p>
            <hr />
            {user &&
              user.friends.map((friend, index) => (
                <div key={index}>
                  <Link to={friend.url}>
                    <img
                      style={{ width: "50px", borderRadius: "100%" }}
                      src={friend.picture}
                      alt="user Picture"
                    />
                    {friend.name}
                  </Link>
                </div>
              ))}
          </div>
          {user && user.friendRequests.length != 0 && (
            <div>
              <p>Current Requests</p>
              <hr />
              {/* Here will lie the friend request */}
              {!errors.handleRequestError.length == 0 && (
                <p>{errors.handleRequestError}</p>
              )}
              {user &&
                user.friendRequests.map((request, index) => (
                  <div key={index}>
                    <Link to={request.url}>
                      <img
                        style={{ width: "50px", borderRadius: "100%" }}
                        src={request.picture}
                        alt="user Picture"
                      />
                      {request.name}
                    </Link>
                    <button
                      onClick={(e) => handleRequest(e, true, request._id)}
                    >
                      <img src="plus.svg" alt="accept friend" />
                    </button>
                    <button
                      onClick={(e) => handleRequest(e, false, request._id)}
                    >
                      <img src="delete.svg" alt="reject friend" />
                    </button>
                  </div>
                ))}
            </div>
          )}
          <div>
            <p>Add?</p>
            <hr />
            {users &&
              filterFriends().map((possibleFriend, index) => (
                <p key={index}>
                  <Link to={possibleFriend.url}>
                    <img
                      style={{ width: "50px", borderRadius: "100%" }}
                      src={possibleFriend.picture}
                      alt="user Picture"
                    />
                    {possibleFriend.name}
                  </Link>

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
        </div>
      </main>
    </>
  );
};

Friends.propTypes = {
  url: PropTypes.string,
};

export default Friends;
