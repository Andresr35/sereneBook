import { useEffect, useState } from "react";

export const useUser = (url) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await fetch(
        `${url}/api/users/${localStorage.getItem("userID")}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const userData = await userRes.json();

      setUser(userData.user);
    };
    fetchUser();
  }, []);
  return user;
};
