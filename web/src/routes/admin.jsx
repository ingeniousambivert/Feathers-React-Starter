import { Outlet, Navigate } from "@/components/local";
import useStore, { currentSelector } from "@/store";

function Admin() {
  const { user } = useStore(currentSelector);
  if (user.role !== "user") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Admin;
