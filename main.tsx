// main.tsx — with Seraphine Voice Warm‑Up Loader integrated

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { warmupVoices } from "./utils/voiceWarmup";

// 🔮 PRELOAD FEMININE VOICES BEFORE ANYTHING RENDERS
warmupVoices().then(() => {
  console.log("🔮 Seraphine voice system initialized.");
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

