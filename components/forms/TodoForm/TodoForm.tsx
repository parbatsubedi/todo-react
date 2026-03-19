import { createTodo, updateTodo } from '@/hooks/todo/createTodo'
import Todo from '@/types/Todo'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type TodoProps = {
    selectedTodo: Todo | null
    onSuccess: () => void
}
function TodoForm({ selectedTodo, onSuccess }: TodoProps) {
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        description: '',
        completed: false,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedTodo) {
            setFormData(selectedTodo);
        }
        else {
            setFormData({
                id: 0,
                title: '',
                description: '',
                completed: false,
            });
        }
    }, [selectedTodo]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (selectedTodo) {
                await updateTodo(formData);
            } else {
                await createTodo(formData);
            }
            onSuccess();
        } catch (err: any) {
            toast.error(err?.message || 'Failed to save todo.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-semibold">
                {selectedTodo ? 'Edit Todo' : 'Add Todo'}
            </h2>

            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded-lg"
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full px-4 py-2 border rounded-lg"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
                {loading
                    ? selectedTodo
                        ? 'Updating...'
                        : 'Creating...'
                    : selectedTodo
                        ? 'Update Todo'
                        : 'Create Todo'}
            </button>
        </form>
    );
}


export default TodoForm