import React from 'react';

const Settings = () => {
    return (
        <div className="p-8 space-y-8 pb-20">
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-coffee/5 max-w-3xl">
                <h3 className="text-xl font-bold text-coffee mb-6 font-display">Configuration de la Veille</h3>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-coffee/80">Url Concurrent Principal</label>
                        <input
                            type="url"
                            placeholder="https://www.concurrent.com"
                            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-coffee/10 focus:outline-none focus:border-coffee/30 focus:bg-white transition-all text-coffee"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-coffee/80">Mots-clés à tracker</label>
                        <textarea
                            rows="4"
                            placeholder="Séparez les mots-clés par des virgules..."
                            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-coffee/10 focus:outline-none focus:border-coffee/30 focus:bg-white transition-all text-coffee resize-none"
                        ></textarea>
                        <p className="text-xs text-coffee/50">Ex: Nike Air Max, PS5, iPhone 15</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-coffee/80">Fréquence des rapports</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-coffee/10 focus:outline-none focus:border-coffee/30 focus:bg-white transition-all text-coffee appearance-none">
                                <option>Quotidien</option>
                                <option>Hebdomadaire</option>
                                <option>Mensuel</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-coffee/80">Devise</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-coffee/10 focus:outline-none focus:border-coffee/30 focus:bg-white transition-all text-coffee appearance-none">
                                <option>EUR (€)</option>
                                <option>USD ($)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-coffee text-cream font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-coffee-light transition-all transform hover:-translate-y-0.5"
                        >
                            Sauvegarder les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
