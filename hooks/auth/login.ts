import { apiRequest } from "@/services/apiClient";

interface LoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
    };
    token: string;
}

export async function loginHook(email: string, password: string): Promise<LoginResponse> {
    const response = await apiRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    });
    
    return response as LoginResponse;
}
