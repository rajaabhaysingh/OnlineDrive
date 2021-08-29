import { Redirect } from "react-router-dom";

// views
import Home from "../views/Home";

const defaultRoutes = [
  {
    path: "/",
    exact: true,
    component: Home,
    isProtected: false, // not relevant in toddle-exercise [NO-AUTH]
  },
  {
    path: "*",
    component: () => <Redirect to={"/"} />,
    isProtected: false,
  },
];

export default defaultRoutes;
