import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const usePosts = (url, includeFriends) => {
  const [posts, setPosts] = useState();
  const { profileID } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPosts = async () => {
      let postsRes;
      if (includeFriends) {
        postsRes = await fetch(
          `${url}/api/users/${localStorage.getItem(
            "userID"
          )}/posts?includeFriends=true`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
      } else {
        postsRes = await fetch(`${url}/api/users/${profileID}/posts`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
      }

      if (postsRes.status == 401) return navigate("/login");
      const postsData = await postsRes.json();
      setPosts(postsData.posts);
    };
    fetchPosts();
  }, [profileID]);
  return { posts, setPosts };
};

export default usePosts;
