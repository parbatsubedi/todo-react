import { apiRequest } from "@/services/apiClient";

interface TodoResponse {
    id: number;
    title: string;
    description: string;
    status: string;
    userId: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export default async function fetchTodos() {
    const todosResponse = await apiRequest('/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return todosResponse as TodoResponse[];
}