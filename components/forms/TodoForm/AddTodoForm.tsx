import { createTodo } from '@/hooks/todo/createTodo';
import { useAuth } from '@/providers/AuthProvider';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    onSuccess: () => void;
};

function AddTodoForm({ onSuccess }: Props) {
    const userData = useAuth()
    // const user = userData.user.id ?? 0

    console.log(userData, "user informations")
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await createTodo({
                ...formData,
                userId: 1,
            });

            toast.success('Todo created successfully!');
            onSuccess();
        } catch (err: any) {
            toast.error(err?.message || 'Failed to create todo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddTodo} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Add New Todo
            </h2>

            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
                {loading ? 'Creating...' : 'Create Todo'}
            </button>
        </form>
    );
}

export default AddTodoForm;