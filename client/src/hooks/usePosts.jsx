import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePosts = (url) => {
  const [posts, setPosts] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      const postsRes = await fetch(
        `${url}/api/users/${localStorage.getItem("userID")}/posts`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (postsRes.status == 401) return navigate("/login");
      const postsData = await postsRes.json();
      setPosts(postsData.posts);
    };
    fetchPosts();
  }, []);
  return { posts, setPosts };
};

export default usePosts;
