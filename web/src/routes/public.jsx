import { Outlet, Navigate } from "@/components/local";
import useStore, { authenticationSelector } from "@/store";

function Public() {
  const isAuthenticated = useStore(authenticationSelector);
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default Public;
