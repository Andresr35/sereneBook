import { useEffect, useState } from "react";

const useUsers = (url) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await fetch(`${url}/api/users`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const userData = await userRes.json();

      setUsers(userData.users);
    };
    fetchUser();
  }, []);
  return { users };
};

export default useUsers;
