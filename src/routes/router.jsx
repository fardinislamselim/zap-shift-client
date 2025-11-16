import { createBrowserRouter } from "react-router";
import RootLayot from "../layout/RootLayot";
import Home from "../pages/Home/Home/Home";

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
]);