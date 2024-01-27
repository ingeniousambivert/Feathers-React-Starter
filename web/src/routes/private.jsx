import { Outlet, Navigate } from "@/components/local";
import useStore, { authenticationSelector } from "@/store";

function Private() {
  const isAuthenticated = useStore(authenticationSelector);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default Private;
