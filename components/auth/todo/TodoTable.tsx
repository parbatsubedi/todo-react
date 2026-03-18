import AddTodoForm from '@/components/forms/TodoForm/AddTodoForm';
import Modal from '@/components/Modal';
import fetchTodos from '@/hooks/todo/fetchTodos';
import Todo from '@/types/Todo';
import { useEffect, useState } from 'react'

function TodoTable() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const loadTodos = async () => {
        const todosResponse = await fetchTodos();
        setTodos(todosResponse);
    };

    useEffect(() => {
        loadTodos();
    }, [])
    return (
        <div className="w-full p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-colors">
                <div className="p-4 border-b flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 transition-colors">Todo List</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Todo
                    </button>
                </div>


                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {todos.length > 0 ? (
                                todos.map((todo: Todo) => (
                                    <tr
                                        key={todo.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        {/* Title */}
                                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                                            {todo.title}
                                        </td>

                                        {/* Description */}
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                            {todo.description}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${todo.status === 'completed'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                                    }`}
                                            >
                                                {todo.status}
                                            </span>
                                        </td>

                                        {/* User */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-200">
                                                    {todo.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-200 text-sm">
                                                    {todo.user.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                                                    Edit
                                                </button>
                                                <button className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 text-gray-400 dark:text-gray-500"
                                    >
                                        No todos found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <AddTodoForm
                        onSuccess={() => {
                            setIsModalOpen(false); // close modal
                            loadTodos(); // 🔥 refresh table
                        }}
                    />
                </Modal>
            )}
        </div>
    )
}

export default TodoTable