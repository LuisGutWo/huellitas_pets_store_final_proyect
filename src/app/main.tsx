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

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
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
    </React.StrictMode>
  );
}
