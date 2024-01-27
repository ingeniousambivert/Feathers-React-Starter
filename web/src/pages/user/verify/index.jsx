import React from "react";
import { verifyAccountThunk, signOutUserThunk } from "@/clients/user";
import VerifyUser from "@/containers/user/verify";
import { useNavigate, useSearchParams } from "@/components/utils";
import useStore, { authenticationSelector, unsetAppDataSelector } from "@/store";

function VerifyPage() {
  const isAuthenticated = useStore(authenticationSelector);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const unsetAppData = useStore(unsetAppDataSelector);

  const verifyAccount = async (token) => {
    setLoading(true);
    const { error } = await verifyAccountThunk(token);
    if (error) setStatus("error");
    else setStatus("success");
    setLoading(false);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      unsetAppData();
      signOutUserThunk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  React.useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/signin");
    } else {
      verifyAccount(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="max-w-xl ml-auto mr-auto p-2">
      <VerifyUser loading={loading} status={status} />
    </div>
  );
}

export default VerifyPage;
