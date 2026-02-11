"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('PASSCODE MISMATCH');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/auth/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setSuccess('REGISTRATION COMPLETE.');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'REGISTRATION FAILED.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-[480px] glass p-8 md:p-12 animate-fade-in relative z-10 border border-white/10">
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-cyan-500/20 to-transparent pointer-events-none" />

                <div className="mb-10 relative">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight text-white/90 uppercase">
                        New<br />Entity
                    </h1>
                    <div className="h-1 w-20 bg-[#FF3366] mb-4"></div>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        Register to the mainframe
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-sm font-mono tracking-wide animate-slide-up flex items-center gap-2">
                        <span className="text-lg">⚠</span> {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border-l-2 border-emerald-500 text-emerald-400 text-sm font-mono tracking-wide animate-slide-up flex items-center gap-2">
                        <span className="text-lg">✓</span> {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="premium-input-wrapper">
                            <input
                                className="premium-input"
                                type="text"
                                name="name"
                                placeholder=" "
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">Entity Name</label>
                        </div>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="premium-input-wrapper">
                            <input
                                className="premium-input"
                                type="email"
                                name="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">Communication ID</label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="premium-input-wrapper mb-0">
                            <input
                                className="premium-input"
                                type="password"
                                name="password"
                                placeholder=" "
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">Passcode</label>
                        </div>
                        <div className="premium-input-wrapper mb-0">
                            <input
                                className="premium-input"
                                type="password"
                                name="confirmPassword"
                                placeholder=" "
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">Confirm</label>
                        </div>
                    </div>

                    <div className="pt-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <button type="submit" className="btn-cyber w-full py-4 text-sm tracking-[0.2em]" disabled={loading}>
                            {loading ? 'PROCESSING...' : 'INITIATE REGISTRATION'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <p className="text-center text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                        Already Registered?{' '}
                        <Link href="/login" className="text-[#00F0FF] hover:text-cyan-300 font-bold transition-colors">
                            ACCESS TERMINAL
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}