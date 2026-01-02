import React from 'react';

const StatCard = ({ title, value, percentage, icon, isPositive = true }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-coffee/5 border border-coffee/5 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-cream/50 rounded-2xl text-2xl text-coffee">
                    {icon}
                </div>
                {percentage && (
                    <div className={`px-4 py-2 rounded-full text-xs font-bold font-display ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {isPositive ? '+' : ''}{percentage}
                    </div>
                )}
            </div>
            <div className="text-coffee/60 text-sm font-bold uppercase tracking-wider mb-2 font-sans">{title}</div>
            <div className="text-4xl font-bold text-coffee font-display tracking-tight">{value}</div>
        </div>
    );
};

export default StatCard;
