import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import StatCard from '../components/StatCard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const DashboardHome = () => {
    const stats = [
        { title: 'Produits Scrappés', value: '1,234', percentage: '12%', icon: '📦', isPositive: true },
        { title: 'Prix Moyen', value: '€45.20', percentage: '2.4%', icon: '🏷️', isPositive: true },
        { title: 'Alertes Actives', value: '8', percentage: '5%', icon: '🔔', isPositive: false },
        { title: 'Dernière Mise à Jour', value: '2m ago', icon: '⏱️' },
    ];

    const chartData = {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
            {
                label: 'Évolution des Prix',
                data: [42, 45, 43, 48, 46, 52, 55],
                borderColor: '#23120b',
                backgroundColor: 'rgba(35, 18, 11, 0.05)',
                tension: 0.5,
                fill: true,
                pointBackgroundColor: '#23120b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#23120b',
                titleFont: { family: 'Archivo Black' },
                bodyFont: { family: 'Inter' },
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(35, 18, 11, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    font: { family: 'Inter', weight: '500' },
                    color: 'rgba(35, 18, 11, 0.4)'
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { family: 'Inter', weight: '500' },
                    color: 'rgba(35, 18, 11, 0.4)'
                }
            },
        },
    };

    const recentMoves = [
        { product: 'Nike Air Force 1', prev: '€120', curr: '€110', change: '-8.3%', date: '10:42 AM' },
        { product: 'Sony WH-1000XM5', prev: '€350', curr: '€349', change: '-0.3%', date: '09:15 AM' },
        { product: 'MacBook Air M2', prev: '€1100', curr: '€1150', change: '+4.5%', date: 'Yesterday' },
    ];

    return (
        <div className="p-10 space-y-10 pb-20 max-w-[1600px] mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Chart */}
            <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] shadow-xl shadow-coffee/5 border border-white/40">
                <h3 className="text-2xl font-bold text-coffee mb-8 font-display uppercase tracking-tight">Tendance des Prix</h3>
                <div className="h-[400px] w-full">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-coffee/5 border border-coffee/5">
                <h3 className="text-2xl font-bold text-coffee mb-8 font-display uppercase tracking-tight">Derniers Mouvements</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-coffee/10">
                                <th className="pb-6 font-bold text-coffee/40 uppercase text-xs tracking-wider">Produit</th>
                                <th className="pb-6 font-bold text-coffee/40 uppercase text-xs tracking-wider">Ancien Prix</th>
                                <th className="pb-6 font-bold text-coffee/40 uppercase text-xs tracking-wider">Nouveau Prix</th>
                                <th className="pb-6 font-bold text-coffee/40 uppercase text-xs tracking-wider">Variation</th>
                                <th className="pb-6 font-bold text-coffee/40 uppercase text-xs tracking-wider text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-coffee/5">
                            {recentMoves.map((move, i) => (
                                <tr key={i} className="group hover:bg-cream/30 transition-colors">
                                    <td className="py-5 font-bold text-coffee text-lg">{move.product}</td>
                                    <td className="py-5 text-coffee/60 font-medium">{move.prev}</td>
                                    <td className="py-5 font-bold text-coffee font-display">{move.curr}</td>
                                    <td className={`py-5 font-bold ${move.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className="px-3 py-1 rounded-full bg-opacity-10 bg-current">
                                            {move.change}
                                        </span>
                                    </td>
                                    <td className="py-5 text-coffee/60 text-right font-medium">{move.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
