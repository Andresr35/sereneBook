import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const Router = () => {
  const url =
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV == "development" ? "http://localhost:3000" : "";

  const router = createBrowserRouter([
    { path: "/", element: <Home url={url} /> },
    { path: "/login", element: <Login url={url} /> },
    { path: "/signup", element: <Signup url={url} /> },
    { path: "/profile", element: <Profile url={url} /> },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
