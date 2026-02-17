import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "../shared/styles/index.scss";
import "../services/firebase";

import { BrowserRouter } from "react-router-dom";
import ProductsContextProvider from "../context/ProductsContext";
import UserContextProvider from "../context/UserContext";
import { ToastProvider } from "../context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <ProductsContextProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </ProductsContextProvider>
    </ToastProvider>
  </React.StrictMode>,
);
