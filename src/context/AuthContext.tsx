import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

type AuthContextType = {
    user: User | null;
    error: Error | null;
    isAuthenticated: boolean;
    isLoading: boolean; // New loading state
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
                setIsLoading(false);
            },
            (error) => {
                setError(error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, error, isAuthenticated: !!user, isLoading }}>{props.children}</AuthContext.Provider>;
};

export const useAuthState = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuthState must be used within an AuthContextProvider");
    }

    return authContext;
};
