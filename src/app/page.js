"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="animate-pulse text-zinc-500 text-xs tracking-[0.3em] font-bold uppercase">Securing Session</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl glass p-12 rounded-[3.5rem] animate-fade-in relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] -ml-32 -mb-32"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-10 animate-slide-up">
            <div className="w-28 h-28 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-[2.5rem] p-[2px] shadow-2xl shadow-purple-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-[2.4rem] flex items-center justify-center text-4xl font-bold">
                {user.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-black mb-4 tracking-tight animate-slide-up text-center" style={{ animationDelay: '0.1s' }}>
            Welcome, <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">{user.name}</span>
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Account Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-bold mb-2">Member Since</p>
              <p className="text-white font-medium text-lg">February 2026</p>
            </div>
            <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-zinc-500 text-[11px] uppercase tracking-[0.2em] font-bold mb-2">Security Level</p>
              <p className="text-white font-medium text-lg">Tier 1 Premium</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="outline" className="flex-1 !rounded-2xl" onClick={() => router.push('/signup')}>
              Profile Settings
            </Button>
            <Button variant="primary" className="flex-1 !rounded-2xl shadow-xl shadow-purple-500/10" onClick={handleLogout}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-zinc-600 text-xs font-bold uppercase tracking-[0.4em] animate-fade-in" style={{ animationDelay: '0.6s' }}>
        Premium Identity System
      </p>
    </div>
  );
}
