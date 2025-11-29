import { createBrowserRouter } from "react-router";
import RootLayot from "../layout/RootLayot";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivetRout from "./PrivetRout";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayot,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "rider",
        element: (
          <PrivetRout>
            <Rider></Rider>
          </PrivetRout>
        ),
        
      },
      {
        path: "sendParcel",
        element: (
          <PrivetRout>
            <SendParcel></SendParcel>
          </PrivetRout>
        ),
        loader:()=>fetch("/warehouses.json")

      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
