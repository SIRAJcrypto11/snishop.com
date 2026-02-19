"use client";
import React, { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '../lib/actions';
import Link from 'next/link';
import { LogIn, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Logging in...' : (
                <>
                    Login <ArrowRight className="w-5 h-5" />
                </>
            )}
        </button>
    );
}

export default function LoginPage() {
    const [errorMessage, dispatch] = React.useActionState(authenticate, undefined);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2">Login to your SNISHOP Dashboard</p>
                </div>

                {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm flex items-center gap-2 justify-center">
                        <AlertCircle className="w-4 h-4" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                <form action={dispatch} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <LoginButton />
                </form>

                <p className="text-center text-gray-500 mt-8">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Register for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
