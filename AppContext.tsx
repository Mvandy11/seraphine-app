import { createContext, useContext, useState } from "react";

interface AppContextValue {
  user: any | null;
  setUser: (u: any | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  signOut: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const signOut = () => {
    setUser(null);
    // If you later add Supabase/Auth0/Firebase, hook it here.
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}



