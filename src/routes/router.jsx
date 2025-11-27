import { createBrowserRouter } from "react-router";
import RootLayot from "../layout/RootLayot";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
        path: "/",
        Component: RootLayot,
        children: [
            {
                index: true,
                Component:Home
          },
      ]
  },
  {
    path:"/",
    Component:AuthLayout,
    children:[
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/register",
        element: <Register />
      }
    ]
  }
]);