import { apiRequest } from "@/services/apiClient";

export default async function createTodo(todo: any) {

    const createTodoResponse = await apiRequest('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });

    return createTodoResponse.json();
}