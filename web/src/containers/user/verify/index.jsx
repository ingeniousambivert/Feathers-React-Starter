/* eslint-disable react/prop-types */
import { ErrorResult, SuccessResult } from "@/components/local/results";
import { Link } from "@/components/local";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/local/icons";

function VerifyUser({ status, loading }) {
  if (loading) {
    return (
      <div className="text-center w-auto h-auto">
        <div className="flex flex-col gap-4 items-center">
          <Spinner className="h-24 w-24 animate-spin-slow" />
          <p className="font-light">Please Wait</p>
        </div>
      </div>
    );
  } else {
    if (status === "error") {
      return (
        <ErrorResult
          title="Email Verification Failed"
          subTitle="The token is invalid or your email has already been verified."
          extra={
            <Button variant="ghost">
              <Link to="/signin">
                <span className="hover:text-blue-600 text-md font-semibold cursor-pointer">Sign In</span>
              </Link>
            </Button>
          }
        />
      );
    } else if (status === "success") {
      return (
        <SuccessResult
          title="Email Verification Successful"
          subTitle="Your email has been successfully verified. Sign in to try all the features."
          extra={
            <Button variant="ghost">
              <Link to="/signin">
                <span className="hover:text-blue-600 text-md font-semibold cursor-pointer">Sign In</span>
              </Link>
            </Button>
          }
        />
      );
    } else {
      return (
        <ErrorResult
          title="Application Crashed"
          subTitle="Sorry, there was an error while loading the app. Please try again later."
        />
      );
    }
  }
}

export default VerifyUser;
