// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
    id: number;
    email: string;
    username: string;
}

interface User {
    id: number;
    email: string;
    username: string;
}



interface AuthContextType {
    user: User | null;
    logout: () => void;
    login: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    logout: () => {},
    login: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            decodeAndSetUser(token);
        }
    }, []);

    const decodeAndSetUser = (token: string) => {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            setUser({
                id: decoded.id,
                email: decoded.email,
                username: decoded.username,
            });



        } catch (err) {
            console.error('Invalid token', err);
            setUser(null);
        }
    };

    const login = (token: string) => {
        localStorage.setItem('token', token);
        decodeAndSetUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
