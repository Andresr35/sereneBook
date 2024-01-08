import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import PropTypes from "prop-types";
import { useState } from "react";

const Signup = ({ url }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmationPassword: "",
    name: "",
    age: 0,
    gender: "",
    bio: "",
    error: "",
  });

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    const signUpRes = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });

    const signUpData = await signUpRes.json();
    if (signUpData.status == 201) {
      sessionStorage.setItem("token", signUpData.token);
      localStorage.setItem("userID", signUpData.user._id);
      navigate("/");
    } else setUser({ ...user, error: signUpData.message });
  };

  const checkConfirmationPassword = (e) => {
    setUser({ ...user, confirmationPassword: e.target.value });
    if (e.target.value !== user.password)
      e.target.setCustomValidity("Passwords do not match");
    else e.target.setCustomValidity("");
  };

  return (
    <>
      <Nav header={"Sign Up"} url={url} />
      <main>
        <form onSubmit={signUp}>
          {!user.error.length == 0 && <p>{user.error}</p>}
          <label>
            Name
            <input
              type="text"
              value={user.name}
              placeholder="Enter Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={user.email}
              placeholder="Enter Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={user.password}
              placeholder="Enter Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <label>
            Confirmation password
            <input
              type="password"
              value={user.confirmationPassword}
              placeholder="Enter Confirmation Password"
              onChange={checkConfirmationPassword}
            />
          </label>
          <label>
            Age
            <input
              type="number"
              max={110}
              value={user.age}
              placeholder="Enter Age"
              onChange={(e) => setUser({ ...user, age: e.target.value })}
            />
          </label>
          <label>
            Gender
            <select
              name=""
              id=""
              defaultValue="select"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <option value="select" disabled>
                Select
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </label>
          <label>
            Bio
            <textarea
              type="text"
              value={user.bio}
              placeholder="Enter Bio"
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </>
  );
};

Signup.propTypes = {
  url: PropTypes.string,
};

export default Signup;
