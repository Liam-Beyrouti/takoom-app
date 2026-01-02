import React from 'react'

const Profile = ({ user }) => {
    if (!user) return null

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <header className="mb-8">
                <h1 className="text-4xl font-display text-coffee uppercase mb-2">Mon Profil</h1>
                <p className="text-coffee/60 font-medium">Gérez vos informations personnelles.</p>
            </header>

            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-coffee/5 border border-coffee/5 max-w-2xl">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-coffee/10">
                    <div className="w-24 h-24 rounded-full bg-coffee text-cream flex items-center justify-center text-3xl font-bold font-display">
                        {user.email ? user.email.substring(0, 2).toUpperCase() : 'TK'}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-coffee mb-1">
                            {user.email || 'Utilisateur Takoom'}
                        </h2>
                        <span className="inline-block bg-cream text-coffee px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            Utilisateur Connecté
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-cream/30 p-4 rounded-2xl border border-coffee/5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee/50 mb-1">
                            Email
                        </label>
                        <div className="font-medium text-coffee">{user.email}</div>
                    </div>

                    <div className="bg-cream/30 p-4 rounded-2xl border border-coffee/5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee/50 mb-1">
                            ID Utilisateur
                        </label>
                        <div className="font-mono text-sm text-coffee/80 truncate" title={user.id}>
                            {user.id}
                        </div>
                    </div>

                    <div className="bg-cream/30 p-4 rounded-2xl border border-coffee/5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee/50 mb-1">
                            Dernière Connexion
                        </label>
                        <div className="font-medium text-coffee">
                            {user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Non disponible'}
                        </div>
                    </div>

                    <div className="bg-cream/30 p-4 rounded-2xl border border-coffee/5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-coffee/50 mb-1">
                            Compte Créé le
                        </label>
                        <div className="font-medium text-coffee">
                            {user.created_at ? formatDate(user.created_at) : 'Non disponible'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
