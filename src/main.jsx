import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignIn from "./pages/SignIn.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import UploadPost from "./pages/UploadPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import { Protected } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <LogIn />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignIn />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication={true}>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true}>
            <UploadPost />
          </Protected>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
