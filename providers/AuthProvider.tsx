'use client'

import { createContext, useState, ReactNode, useContext } from 'react';
import { loginHook } from '@/hooks/auth/login';
import { apiRequest } from '@/services/apiClient';
import { toast } from 'react-toastify';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(
        typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    );
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await loginHook(email, password);

            const accessToken = response.token;
            const userData = response.user;

            localStorage.setItem('access_token', accessToken);
            document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax`;

            setToken(accessToken);
            setUser(userData);
            toast.success(`Welcome back, ${userData.name}!`);
        } catch (error: any) {
            toast.error(error?.message || 'Login failed. Please check your credentials.');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await apiRequest('/logout', {
                method: 'POST'
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        localStorage.removeItem('access_token');
        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully.');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
