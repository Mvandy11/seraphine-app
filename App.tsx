import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import Oracle from "@/pages/Oracle";
import ManageSubscription from "@/pages/ManageSubscription";
import Subscribe from "@/pages/Subscribe";
import Index from "@/pages/Index";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/oracle" element={<Oracle />} />
        <Route path="/manage" element={<ManageSubscription />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </BrowserRouter>
  );
}
