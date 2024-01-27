/* eslint-disable react/prop-types */
import { Spinner } from "@/components/local/icons";

function Content({ children, loading }) {
  return (
    <div>
      <div className={loading ? "flex items-center justify-center min-h-content" : "hidden"}>
        <div className="text-center">
          <div className="flex flex-col gap-4 items-center">
            <Spinner className="h-24 w-24 animate-spin-slow" />
            <p className="font-light">Please Wait</p>
          </div>
        </div>
      </div>
      <div className={loading ? "hidden" : "p-2 m-2 flex-col min-h-content"}>{children}</div>
    </div>
  );
}

export default Content;
