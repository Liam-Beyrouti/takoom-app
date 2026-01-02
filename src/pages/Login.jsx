import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) throw error
                alert('Inscription réussie ! Vérifiez vos emails.')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-coffee/10">
                <h1 className="text-3xl font-display text-coffee mb-2 text-center uppercase">
                    {isSignUp ? 'Rejoindre Takoom' : 'Connexion'}
                </h1>
                <p className="text-coffee/60 text-center mb-8 font-medium">
                    {isSignUp ? 'Créez votre compte intelligence.' : 'Accédez à votre dashboard.'}
                </p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm font-medium text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-2 text-coffee/70">Email Pro</label>
                        <input
                            type="email"
                            placeholder="marie@takoom.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-cream/50 border border-coffee/10 rounded-xl px-5 py-4 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee transition font-medium placeholder-coffee/30 text-coffee"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-2 text-coffee/70">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-cream/50 border border-coffee/10 rounded-xl px-5 py-4 focus:outline-none focus:border-coffee focus:ring-1 focus:ring-coffee transition font-medium placeholder-coffee/30 text-coffee"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-coffee text-cream font-bold text-lg py-4 rounded-xl hover:scale-[1.02] transition shadow-lg shadow-coffee/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {loading ? 'Chargement...' : (isSignUp ? "S'inscrire" : 'Se connecter')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm font-bold text-coffee/60 hover:text-coffee transition underline decoration-dotted"
                    >
                        {isSignUp ? 'Déjà un compte ? Se connecter' : "Pas encore de compte ? S'inscrire"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login
