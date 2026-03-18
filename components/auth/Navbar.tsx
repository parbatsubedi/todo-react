'use client'

import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()

    const { user, logout } = useAuth();
    const handleLogout = async () => {
        await logout();
        localStorage.removeItem('access_token');
        router.push('/login')
    }


    return (
        <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-400 cursor-pointer">
                MyApp
            </h1>

            <div className="flex items-center gap-6">
                <span className="text-gray-300">
                    {user?.name ? `Hi, ${user.name}` : 'User'}
                </span>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}