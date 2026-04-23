import { Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "@/pages/Index";
import Oracle from "@/pages/Oracle";
import Login from "@/pages/Login";
import Account from "@/pages/Account";
import Subscribe from "@/pages/Subscribe";
import ManageSubscription from "@/components/ManageSubscription";
import CardOfTheDay from "@/pages/CardOfTheDay";
import SavedReadings from "@/pages/SavedReadings";
import DeckMenu from "@/pages/DeckMenu";
import PaymentSuccess from "@/pages/PaymentSuccess";
import VaultPreview from "@/pages/VaultPreview";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/vault-preview"   element={<VaultPreview />} />

        {/* Requires auth + subscription */}
        <Route
          path="/oracle"
          element={
            <ProtectedRoute>
              <Oracle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card-of-the-day"
          element={
            <ProtectedRoute>
              <CardOfTheDay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/readings"
          element={
            <ProtectedRoute>
              <SavedReadings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deck"
          element={
            <ProtectedRoute>
              <DeckMenu />
            </ProtectedRoute>
          }
        />

        {/* Requires auth only */}
        <Route path="/account" element={<Account />} />
        <Route path="/manage" element={<ManageSubscription />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <BottomNav />
    </>
  );
}
