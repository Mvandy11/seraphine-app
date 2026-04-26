import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AppProvider } from "@/contexts/AppContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { OracleProvider } from "@/contexts/OracleContext";
import { DeckProvider } from "@/contexts/DeckContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <PaymentProvider>
          <OracleProvider>
            <DeckProvider>
              <App />
            </DeckProvider>
          </OracleProvider>
        </PaymentProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
