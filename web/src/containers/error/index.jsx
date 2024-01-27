/* eslint-disable react/prop-types */
import { Component } from "react";
import { appName } from "@/utils/constants";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: null
  };

  static getDerivedStateFromError(data) {
    return { hasError: true, errorInfo: data.toString() };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.VITE_APP_STAGE === "production") {
      localStorage.clear();
    } else {
      console.error("Uncaught error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-16">
          <h1 className="text-2xl my-2 font-medium">{appName}</h1>
          <h2 className="text-xl my-2">Oops! Something went wrong.</h2>
          <p className="my-2">
            An unexpected error has occurred, we apologize for this, please try again later. <br />
            If this problem persists please contact us with the description of the error.
          </p>
          <div className="p-4 bg-slate-800 text-white rounded-sm max-w-2xl my-8 overflow-auto">
            <code>{this.state.errorInfo}</code>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
