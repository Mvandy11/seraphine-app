import { createContext, useContext, useState } from "react";

interface AppContextValue {
  user: any | null;
  setUser: (u: any | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  signOut: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const signOut = () => {
    setUser(null);
  };

  const signIn = async (email: string, _password: string) => {
    setUser({ email });
    setShowAuthModal(false);
  };

  const signUp = async (email: string, _password: string) => {
    setUser({ email });
    setShowAuthModal(false);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        signOut,
        showAuthModal,
        setShowAuthModal,
        signIn,
        signUp,
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

export const useApp = useAppContext;
