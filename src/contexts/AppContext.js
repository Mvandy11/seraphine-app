import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const AppContext = createContext(null);
export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const signOut = () => {
        setUser(null);
        // If you later add Supabase/Auth0/Firebase, hook it here.
    };
    return (_jsx(AppContext.Provider, { value: {
            user,
            setUser,
            loading,
            setLoading,
            signOut,
        }, children: children }));
}
export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx)
        throw new Error("useAppContext must be used inside AppProvider");
    return ctx;
}
