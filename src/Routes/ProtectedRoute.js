import { Navigate, Outlet } from "react-router"

const ProtectedRouteAuth = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRouteAuth
