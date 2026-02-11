import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {

    let buttonClass = '';

    if (variant === 'primary') {
        buttonClass = 'btn-cyber';
    } else if (variant === 'outline') {
        buttonClass = 'btn-outline';
    } else {
        buttonClass = 'text-zinc-400 hover:text-[#00F0FF] uppercase tracking-widest text-xs font-bold transition-colors';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full py-4 text-sm font-bold uppercase tracking-widest relative overflow-hidden transition-all duration-300 ${buttonClass} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
};

export default Button;