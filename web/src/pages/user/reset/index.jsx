import React from "react";
import { resetPasswordThunk, signOutUserThunk } from "@/clients/user";
import ResetPassword from "@/containers/user/reset";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "@/components/utils";
import useStore, { authenticationSelector, unsetAppDataSelector } from "@/store";

function ResetPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const isAuthenticated = useStore(authenticationSelector);
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(true);
  const unsetAppData = useStore(unsetAppDataSelector);

  const resetPassword = async ({ password }) => {
    setStatus("loading");
    const response = await resetPasswordThunk({ token, password });
    if (response.error) {
      setStatus("error");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error.message
      });
    } else {
      toast({
        variant: "constructive",
        title: "Success! No issues encountered.",
        description: "Please sign in with new your password."
      });
      setStatus("success");
      navigate("/signin");
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      unsetAppData();
      signOutUserThunk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  React.useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="max-w-xl ml-auto mr-auto p-2">
      <ResetPassword resetPassword={resetPassword} status={status} />
    </div>
  );
}

export default ResetPage;
