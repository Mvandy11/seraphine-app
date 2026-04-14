// src/components/AppLayout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "radial-gradient(circle at top, #0f172a, #020617)",
        color: "white",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Header />

      <main style={{ flex: 1, width: "100%", paddingTop: "20px", zIndex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;



