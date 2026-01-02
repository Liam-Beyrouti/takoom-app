import React from 'react';

const Reports = () => {
    const reports = [
        { id: 1, title: 'Rapport Hebdo - Semaine 42', date: '28 Oct 2024', type: 'Hebdomadaire' },
        { id: 2, title: 'Analyse Concurrents - Octobre', date: '01 Nov 2024', type: 'Mensuel' },
        { id: 3, title: 'Opportunités de Prix - Q3', date: '15 Oct 2024', type: 'Trimestriel' },
        { id: 4, title: 'Performance - Septembre', date: '30 Sept 2024', type: 'Mensuel' },
    ];

    return (
        <div className="p-8 space-y-8 pb-20">
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-coffee/5">
                <h3 className="text-xl font-bold text-coffee mb-6 font-display">Mes Rapports</h3>
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 bg-cream/20 rounded-xl hover:bg-cream/40 transition-all border border-transparent hover:border-coffee/5 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xl shadow-sm">
                                    📄
                                </div>
                                <div>
                                    <h4 className="font-bold text-coffee">{report.title}</h4>
                                    <div className="flex items-center gap-2 text-sm text-coffee/60">
                                        <span>{report.date}</span>
                                        <span>•</span>
                                        <span>{report.type}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-white text-coffee text-sm font-bold rounded-full shadow-sm hover:shadow-md transition-all border border-coffee/10 group-hover:bg-coffee group-hover:text-cream">
                                Télécharger
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reports;
