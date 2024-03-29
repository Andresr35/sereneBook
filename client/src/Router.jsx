import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";

const Router = () => {
  const url =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://serenebook-production.up.railway.app";

  const router = createBrowserRouter([
    { path: "/", element: <Home url={url} /> },
    { path: "/login", element: <Login url={url} /> },
    { path: "/signup", element: <Signup url={url} /> },
    { path: "/friends", element: <Friends url={url} /> },
    { path: "/profile/:profileID", element: <Profile url={url} /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
