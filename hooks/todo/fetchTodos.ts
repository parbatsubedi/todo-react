import { apiRequest } from "@/services/apiClient";
import Todo from "@/types/Todo";

interface TodoResponse {
    status: boolean;
    message: string;
    data: Todo[];
}

export default async function fetchTodos() {
    const todosResponse = await apiRequest('/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return todosResponse as TodoResponse;
}