import { Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import Oracle from "@/pages/Oracle";
import ManageSubscription from "@/pages/ManageSubscription";
import Subscribe from "@/pages/Subscribe";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Oracle />} />
        <Route path="/oracle" element={<Oracle />} />
        <Route path="/manage" element={<ManageSubscription />} />
        <Route path="/subscribe" element={<Subscribe />} />
      </Routes>
    </>
  );
}







