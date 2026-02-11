"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        // Handle Google Login Callback
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userStr = urlParams.get('user');

        if (token && userStr) {
            try {
                localStorage.setItem('token', token);
                localStorage.setItem('user', decodeURIComponent(userStr));
                setSuccess('G-SUITE ACCESS GRANTED.');
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } catch (e) {
                console.error("Failed to parse user data", e);
                setError("DATA CORRUPTION DETECTED.");
            }
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.post('/auth/login', formData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setSuccess('ACCESS GRANTED.');

            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'ACCESS DENIED.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] glass p-8 md:p-12 animate-fade-in relative z-10 border border-white/10">

                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-teal-400/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/20 to-transparent pointer-events-none" />

                <div className="mb-10 relative">
                    <h1 className="text-5xl font-bold mb-2 tracking-tight text-white/90">
                        SYSTEM<br />ENTRY
                    </h1>
                    <div className="h-1 w-20 bg-[#00F0FF] mb-4"></div>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        Secure Terminal v4.0
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border-l-2 border-red-500 text-red-400 text-sm font-mono tracking-wide animate-slide-up flex items-center gap-2">
                        <span className="text-lg">⚠</span> {error.toUpperCase()}
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
                                type="email"
                                name="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">ID / Email</label>
                        </div>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="premium-input-wrapper">
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
                        <div className="flex justify-end mt-2">
                            <Link href="/forgot-password" px-0 className="text-[10px] text-zinc-400 hover:text-[#00F0FF] transition-colors font-mono uppercase tracking-widest">
                                Recover Access?
                            </Link>
                        </div>
                    </div>

                    <div className="pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <button type="submit" className="btn-cyber w-full py-4 text-sm tracking-[0.2em]" disabled={loading}>
                            {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
                        </button>
                    </div>
                </form>

                <div className="mt-12 pt-6 border-t border-white/5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <p className="text-center text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6">
                        Or Authenticate via
                    </p>

                    <div className="flex gap-4">
                      <a
  href={
    (process.env.NEXT_PUBLIC_API_URL ||
      "https://login-authbackend-production.up.railway.app/api") +
    "/auth/google"
  }
  className="btn-outline w-full py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 no-underline hover:text-white"
>
  G-Suite
</a>

                    </div>
                </div>

                <p className="mt-8 text-center text-zinc-600 text-[10px] font-mono animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    NO ID? {' '}
                    <Link href="/signup" className="text-[#FF3366] hover:text-[#ff6699] font-bold transition-colors uppercase tracking-widest">
                        REGISTER ENTITY
                    </Link>
                </p>
            </div>
        </div>
    );
}