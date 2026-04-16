import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AppProvider } from "@/contexts/AppContext";
import { PaymentProvider } from "@/contexts/PaymentContext";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <PaymentProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PaymentProvider>
    </AppProvider>
  </React.StrictMode>
);


