import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routesData } from "./Routes/RoutesData";
import { useSelector } from "react-redux";
import ProtectedRouteAuth from "./Routes/ProtectedRoute";

function App() {
  const { unProtectedRoutes, protectedRoutes } = routesData;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Routes>
        {!isLoggedIn &&
          unProtectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}

        <Route element={<ProtectedRouteAuth isLoggedIn={isLoggedIn} />}>
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
