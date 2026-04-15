import { Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import Oracle from "@/pages/Oracle";
import ManageSubscription from "@/pages/ManageSubscription";
import Subscribe from "@/pages/Subscribe";
import CardOfTheDay from "@/pages/CardOfTheDay";
import SavedReadings from "@/pages/SavedReadings";
import DeckMenu from "@/pages/DeckMenu";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Oracle />} />
        <Route path="/oracle" element={<Oracle />} />
        <Route path="/manage" element={<ManageSubscription />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/card-of-the-day" element={<CardOfTheDay />} />
        <Route path="/readings" element={<SavedReadings />} />
        <Route path="/deck" element={<DeckMenu />} />
      </Routes>
    </>
  );
}
