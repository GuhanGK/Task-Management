import DataView from "../Components/Pages/DataView";
import Login from "../Components/Pages/Login";

const unProtectedRoutes = [
  {
    path: "/:token",
    component: <Login />,
  },
  {
    path: "/login:token",
    component: <Login />,
  },
];

const protectedRoutes = [
  {
    path: "/",
    component: <DataView />,
    key: "dashboard",
  },
];

export const routesData = { unProtectedRoutes, protectedRoutes };
