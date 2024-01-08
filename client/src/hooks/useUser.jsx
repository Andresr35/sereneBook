import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useUser = (url) => {
  const [user, setUser] = useState({});
  const { profileID } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await fetch(`${url}/api/users/${profileID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const userData = await userRes.json();

      setUser(userData.user);
    };
    fetchUser();
  }, [profileID]);
  return user;
};
export default useUser;
