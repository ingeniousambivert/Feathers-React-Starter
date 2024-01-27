import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "@/components/local";
import ErrorBoundary from "@/containers/error";
import App from "./App.jsx";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);
