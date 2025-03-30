import React, { createContext, useEffect, useState } from "react";
import { getUserFromSession } from "../../lib/auth";
import { User } from "../../types/api";

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = !!user;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserFromSession();
                setUser(userData);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator until session is verified
      }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;