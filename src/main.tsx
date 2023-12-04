import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ShoutoutContextProvider from "./context/ShoutoutContextProvider.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ShoutoutContextProvider>
        <App />
      </ShoutoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
