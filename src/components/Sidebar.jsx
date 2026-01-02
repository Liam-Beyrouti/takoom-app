import React from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Sidebar = ({ user = "Invité" }) => {
    const menuItems = [
        { name: "Vue d'ensemble", path: "/" },
        { name: "Rapports", path: "/reports" },
        { name: "Configuration", path: "/settings" },
    ];

    const getInitials = (name) => {
        if (typeof name !== 'string') return 'TK';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Handle Supabase user object or string
    const displayUser = user?.email || (typeof user === 'string' ? user : 'Utilisateur');

    return (
        <div className="w-72 bg-coffee text-cream h-full flex flex-col p-6 fixed left-0 top-0 rounded-r-[2rem] shadow-2xl z-20">
            <div className="text-3xl text-center font-bold font-display mb-12 tracking-tighter uppercase mt-4">
                Takoom
            </div>

            <nav className="flex-1 space-y-3">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `block cursor-pointer px-6 py-4 rounded-full transition-all duration-300 font-bold ${isActive
                            ? 'bg-cream text-coffee shadow-lg'
                            : 'text-cream/60 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto">
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-6 py-2 text-sm font-bold text-cream/40 hover:text-cream transition mb-4 uppercase tracking-wider"
                >
                    Se déconnecter
                </button>

                <NavLink to="/profile" className="pt-6 border-t border-white/10 flex items-center gap-4 px-2 hover:bg-white/5 rounded-xl transition cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-cream text-coffee flex items-center justify-center text-xl font-bold border-2 border-cream group-hover:scale-105 transition">
                        {getInitials(displayUser)}
                    </div>
                    <div className="overflow-hidden">
                        <div className="font-bold text-base font-display tracking-tight truncate max-w-[140px] group-hover:text-white transition">{displayUser}</div>
                        <div className="text-xs opacity-60 font-sans group-hover:opacity-80">Voir mon profil</div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
