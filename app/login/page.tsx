'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { loginHook } from '@/hooks/auth/login';

function LoginPage() {
    const router = useRouter();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await loginHook(email, password);
            
            const accessToken = response.token;
            const userData = response.user;

            localStorage.setItem('access_token', accessToken);
            document.cookie = `access_token=${accessToken}; path=/; SameSite=Lax`;

            console.log('Login successful', userData);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form 
        onSubmit={handleSubmit} 
        className="max-w-md mx-auto mt-12 p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
    >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">Login</h2>

        {error && (
            <p className="text-red-400 bg-red-900 p-2 rounded mb-4 text-center font-medium">
                {error}
            </p>
        )}

        <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 mb-2 font-medium">
                Email
            </label>
            <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="you@example.com"
                required
            />
        </div>

        <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2 font-medium">
                Password
            </label>
            <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
                required
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
        >
            {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
            Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
    </form>
    )
}

export default LoginPage
