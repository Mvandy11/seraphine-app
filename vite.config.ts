import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // ⭐ REQUIRED FOR NETLIFY
  plugins: [react()],
  define: {
    // Explicitly pull from process.env (Replit Secrets) so they always win
    // over any placeholder value in the .env file.
    "import.meta.env.VITE_ELEVENLABS_API_KEY": JSON.stringify(process.env.VITE_ELEVENLABS_API_KEY ?? ""),
    "import.meta.env.VITE_ELEVENLABS_VOICE_ID": JSON.stringify(process.env.VITE_ELEVENLABS_VOICE_ID ?? ""),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react-router-dom": path.resolve(__dirname, "./node_modules/react-router-dom"),
      "lucide-react": path.resolve(__dirname, "./node_modules/lucide-react"),
      "input-otp": path.resolve(__dirname, "./node_modules/input-otp"),
      "sonner": path.resolve(__dirname, "./node_modules/sonner"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: [],
  },
});
