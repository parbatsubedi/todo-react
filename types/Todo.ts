import { User } from "./User";

interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
    userId: number;
    user: User
}

export default Todo;