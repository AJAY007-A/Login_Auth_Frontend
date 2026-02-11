"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../lib/api';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("MISMATCHED PASSCODES");
            return;
        }

        if (!token) {
            setError("MISSING AUTH TOKEN");
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/auth/reset-password', {
                token,
                newPassword: formData.password
            });
            setIsSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'RESET SEQUENCE FAILED');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[480px] glass p-10 animate-fade-in relative z-10 border border-white/10">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-3 tracking-tight text-white/90 uppercase">
                    Secure<br />Reset
                </h1>
                <div className="h-1 w-20 bg-[#FF3366] mb-4 mx-auto"></div>
                <p className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
                    {isSuccess
                        ? "Credentials Updated Successfully"
                        : "Establish New Security Protocols"}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border-l-2 border-red-500 text-red-500 text-sm text-center animate-slide-up font-mono">
                    {error}
                </div>
            )}

            {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <Input
                            label="New Passcode"
                            type="password"
                            name="password"
                            placeholder=" "
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Input
                            label="Confirm Passcode"
                            type="password"
                            name="confirmPassword"
                            placeholder=" "
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="pt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? 'ENCRYPTING...' : 'ESTABLISH'}
                        </Button>
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link
                            href="/login"
                            className="block text-center text-zinc-500 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest"
                        >
                            Abort Sequence
                        </Link>
                    </div>
                </form>
            ) : (
                <div className="space-y-8 text-center animate-slide-up">
                    <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-sm">
                        <p className="text-zinc-400 text-sm leading-relaxed font-mono">
                            Protocol Complete. <br />
                            Access restored.
                        </p>
                    </div>
                    <Link href="/login" className="block w-full">
                        <Button variant="primary">
                            ENTER TERMINAL
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="text-center py-12 glass p-10">
                    <div className="w-12 h-12 border-4 border-[#00F0FF]/20 border-t-[#00F0FF] rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Initializing Secure Session...</p>
                </div>
            }>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
