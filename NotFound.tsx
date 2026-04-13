import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07061a]">
      <div className="text-center p-12 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-8">
          <Sparkles className="w-7 h-7 text-purple-400/50" />
        </div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
          404
        </h1>
        <p className="text-purple-300/50 text-lg mb-2">This path does not exist in the field.</p>
        <p className="text-purple-500/30 text-sm mb-8">The energy you seek lies elsewhere.</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300"
        >
          Return to the Oracle
        </a>
      </div>
    </div>
  );
};

export default NotFound;
