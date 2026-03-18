import { loginHook } from "@/hooks/auth/login";
import { useState } from "react";

export async function loginUser(email: string, password: string) {
    const [accessToken, setAccessToken] = useState(
        typeof window !== "undefined" ? localStorage.getItem('access_token') : null
    );

    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        const response = await loginHook(email, password);

        const accessToken = response.token;

        // Persist token for client-side requests
        localStorage.setItem('access_token', accessToken);

        // Also set a cookie so Next.js middleware can access it for guarding routes
        document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax`;

        setAccessToken(accessToken);
        setUser(response.user);
    }
}