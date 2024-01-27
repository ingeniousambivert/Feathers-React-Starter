/* eslint-disable react/prop-types */
import { XCircle, CheckCircle2 } from "./icons";

function ErrorResult(props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        <XCircle className="bg-red-500 text-white h-24 w-24 rounded-full" />
      </div>
      <div>
        <p className="text-xl font-semibold">{props.title ? props.title : "Error"}</p>
      </div>
      <div>
        <p className="text-lg font-light text-gray-400">
          {props.subTitle ? props.subTitle : "Something went wrong."}
        </p>
      </div>
      <div>{props.extra ? props.extra : null}</div>
    </div>
  );
}
function SuccessResult(props) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        <CheckCircle2 className="bg-green-500 text-white h-24 w-24 rounded-full" />
      </div>
      <div>
        <p className="text-xl font-semibold">{props.title ? props.title : "Error"}</p>
      </div>
      <div>
        <p className="text-lg font-light text-gray-400">
          {props.subTitle ? props.subTitle : "Something went wrong."}
        </p>
      </div>
      <div>{props.extra ? props.extra : null}</div>
    </div>
  );
}

export { ErrorResult, SuccessResult };
