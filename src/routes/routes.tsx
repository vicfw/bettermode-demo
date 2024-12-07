import Signin from "../pages/auth/signin/Signin";
import Verify from "../pages/auth/verify/Verify";
import Home from "../pages/home/Home";
import SinglePost from "../pages/single-post/SinglePost";

export const routes = {
  public: [
    {
      path: "/auth/signin",
      element: <Signin />,
    },
    {
      path: "/auth/verify",
      element: <Verify />,
    },
  ],
  private: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts/:postId",
      element: <SinglePost />,
    },
  ],
};
