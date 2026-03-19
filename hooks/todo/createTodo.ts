import { apiRequest } from "@/services/apiClient";

interface DeleteResponse {
    status: boolean;
    message: string;
}

export async function createTodo(todo: any) {

    const createTodoResponse = await apiRequest('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });

    return createTodoResponse;
}

export async function updateTodo(todo: any) {

    const updateTodoResponse = await apiRequest(`/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });

    return updateTodoResponse;
}

export async function deleteTodo(id: number) {

    const deleteTodoResponse = await apiRequest(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return deleteTodoResponse as DeleteResponse;
}