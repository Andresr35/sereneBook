import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useThisUser = (url) => {
  const [user, setUser] = useState();
  const [authenticated, setAuthenticaed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const res = await fetch(`${url}/api/users/authenticate`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (res.status == 200) setAuthenticaed(true);
      else setAuthenticaed(false);
      if (res.status == 401) navigate("/login");
      const data = await res.json();
      setUser(data.user);
    };
    checkAuthentication();
  }, []);
  return { user, authenticated };
};

export default useThisUser;
