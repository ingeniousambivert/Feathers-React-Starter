import React from "react";
import { signUpUserThunk, signInUserThunk } from "@/clients/user";
import CreateUser from "@/containers/user/create";
import { useToast } from "@/components/ui/use-toast";
import useStore, { setCurrentUserSelector } from "@/store";

function SignupPage() {
  const { toast } = useToast();
  const [status, setStatus] = React.useState(null);
  const setCurrentUser = useStore(setCurrentUserSelector);
  const createUser = async (payload) => {
    setStatus("loading");
    const response = await signUpUserThunk(payload);
    if (response.error) {
      setStatus("errored");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.error.message
      });
    } else {
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
    }
  };
  return (
    <div className="max-w-xl ml-auto mr-auto p-2">
      <CreateUser createUser={createUser} status={status} />
    </div>
  );
}

export default SignupPage;
