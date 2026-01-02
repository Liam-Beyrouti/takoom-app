import React from 'react';

const Header = ({ title, user }) => {
    // Handle Supabase user object or string
    const displayUser = user?.email || (typeof user === 'string' ? user : 'Invité');

    return (
        <div className="h-24 bg-transparent backdrop-blur-sm flex items-center justify-between px-10 sticky top-0 z-10">
            <div>
                <h1 className="text-4xl font-bold text-coffee font-display uppercase tracking-tight">Bonjour, <span className="text-coffee">{displayUser}</span> 👋</h1>
                <p className="text-coffee/60 font-medium text-sm mt-1">
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            </div>
            <button className="p-3 bg-white rounded-full shadow-lg shadow-coffee/5 hover:shadow-xl transition-all text-coffee border border-coffee/5">
                <span className="text-xl">🔔</span>
            </button>
        </div>
    );
};

export default Header;
