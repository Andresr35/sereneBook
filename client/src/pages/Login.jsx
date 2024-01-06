import { useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ url }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  const navigate = useNavigate();

  const validateUser = async (e) => {
    e.preventDefault();
    const logInResults = await fetch(`${url}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });
    const resJson = await logInResults.json();
    if (resJson.status == 200) {
      sessionStorage.setItem("token", resJson.token);
      localStorage.setItem("userID", resJson.user._id);
      navigate("/");
    } else {
      setUser({ ...user, erorr: resJson.message });
      //create error with message
    }
  };

  return (
    <>
      <Nav header={"Log In"} />
      <main>
        <form onSubmit={validateUser}>
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
            {!user.error.length == 0 && <p>{user.error}</p>}
            <input
              type="password"
              value={user.password}
              placeholder="Enter Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </main>
    </>
  );
};

Login.propTypes = {
  url: PropTypes.string,
};

export default Login;
