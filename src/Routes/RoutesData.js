import DataView from "../Components/Pages/DataView";
import Login from "../Components/Pages/Login";
import PermissionManager from "../summa";

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
  {
    path: "/summa",
    component: <PermissionManager />,
    key: "dashboard",
  },
];

export const routesData = { unProtectedRoutes, protectedRoutes };
