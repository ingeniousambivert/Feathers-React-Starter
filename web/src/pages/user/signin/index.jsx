import React from "react";
import { signInUserThunk } from "@/clients/user";
import AuthenticateUser from "@/containers/user/authenticate";
import { useToast } from "@/components/ui/use-toast";
import useStore, { setCurrentUserSelector } from "@/store";

function SigninPage() {
  const { toast } = useToast();
  const [status, setStatus] = React.useState(null);
  const setCurrentUser = useStore(setCurrentUserSelector);
  const authenticateUser = async (payload) => {
    setStatus("loading");
    const response = await signInUserThunk(payload);
    if (response.error) {
      setStatus("errored");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error.message
      });
    } else {
      setCurrentUser(response.data.user);
      setStatus("success");
    }
  };
  return (
    <div className="max-w-xl ml-auto mr-auto p-2">
      <AuthenticateUser authenticateUser={authenticateUser} status={status} />
    </div>
  );
}

export default SigninPage;
