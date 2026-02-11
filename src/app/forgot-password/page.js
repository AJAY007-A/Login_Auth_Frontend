"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../lib/api';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });
            setIsSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] glass p-10 animate-fade-in relative z-10 border border-white/10">
                <div className="text-center mb-10 relative">
                    <h1 className="text-4xl font-bold mb-3 tracking-tight text-white/90 uppercase">
                        Access<br />Recovery
                    </h1>
                    <div className="h-1 w-20 bg-[#00F0FF] mb-4 mx-auto"></div>
                    <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
                        {isSubmitted
                            ? "Signal transmitted to relay"
                            : "Enter ID to initiate recovery sequence"}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border-l-2 border-red-500 rounded-sm text-red-500 text-sm text-center animate-slide-up font-mono">
                        {error}
                    </div>
                )}

                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <Input
                                label="Communication ID"
                                type="email"
                                name="email"
                                placeholder=" "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? 'TRANSMITTING...' : 'INITIATE RESET'}
                            </Button>
                        </div>

                        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 text-zinc-400 hover:text-[#00F0FF] transition-colors group text-[10px] font-bold uppercase tracking-widest"
                            >
                                <span className="transform group-hover:-translate-x-1 transition-transform">{'<'}</span>
                                Return to Terminal
                            </Link>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8 text-center animate-slide-up">
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-sm">
                            <p className="text-zinc-400 text-sm leading-relaxed font-mono">
                                Transmission successful to <span className="text-white font-bold">{email}</span>.
                                <br />Check your secure inbox.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                                Retry Transmission
                            </Button>
                            <Link
                                href="/login"
                                className="block text-zinc-500 hover:text-white transition-colors text-[10px] font-mono tracking-widest uppercase mt-4"
                            >
                                Terminate Sequence
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
