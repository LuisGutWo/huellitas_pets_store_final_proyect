import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.scss'

import { BrowserRouter } from 'react-router-dom'
import ProductsContextProvider from "./context/ProductsContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsContextProvider>
  </React.StrictMode>,
)
