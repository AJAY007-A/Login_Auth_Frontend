import React from 'react';

const Input = ({ label, type = 'text', placeholder = ' ', value, onChange, name, required = false }) => {
    return (
        <div className="premium-input-wrapper mb-6 relative">
            <input
                type={type}
                name={name}
                placeholder={placeholder || ' '}
                value={value}
                onChange={onChange}
                required={required}
                className="premium-input w-full text-white px-4 py-3.5 outline-none bg-black/40 border border-white/10 focus:border-[#00F0FF] transition-all"
            />
            {label && (
                <label className="input-label absolute left-4 top-4 text-zinc-500 text-sm transition-all pointer-events-none uppercase tracking-wider font-bold text-[10px]">
                    {label}
                </label>
            )}
        </div>
    );
};

export default Input;