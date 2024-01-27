import React from "react";
import { forgotPasswordThunk, signOutUserThunk } from "@/clients/user";
import RequestPasswordReset from "@/containers/user/requestReset";
import { useToast } from "@/components/ui/use-toast";
import useStore, { authenticationSelector, unsetAppDataSelector } from "@/store";

function ForgotPage() {
  const isAuthenticated = useStore(authenticationSelector);
  const unsetAppData = useStore(unsetAppDataSelector);
  const { toast } = useToast();
  const [status, setStatus] = React.useState(null);
  const requestReset = async (payload) => {
    setStatus("loading");
    const response = await forgotPasswordThunk(payload.email);
    if (response.error) {
      setStatus("errored");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error.message
      });
    } else {
      toast({
        variant: "constructive",
        title: "Success! No issues encountered.",
        description: "Please follow the link sent to your email."
      });
      setStatus("success");
    }
  };
  React.useEffect(() => {
    if (isAuthenticated) {
      unsetAppData();
      signOutUserThunk();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <div className="max-w-xl ml-auto mr-auto p-2">
      <RequestPasswordReset requestReset={requestReset} status={status} />
    </div>
  );
}

export default ForgotPage;
