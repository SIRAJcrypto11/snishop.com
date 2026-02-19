"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/login?registered=true');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Create Account
                    </h1>
                    <p className="text-gray-400 mt-2">Join SNISHOP Network today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Register <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-8">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
