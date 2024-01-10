import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useThisUser = (url) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticaed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      const res = await fetch(`${url}/api/users/authenticate`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (res.status == 200) setAuthenticaed(true);
      else setAuthenticaed(false);
      if (res.status == 401) {
        if (location.pathname == "/login" || location.pathname == "/signup")
          return;
        navigate("/login");
      }
      const data = await res.json();
      setUser(data.user);
    };
    checkAuthentication();
  }, []);
  return { user, setUser, authenticated };
};

export default useThisUser;
