import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const emailParam = params.get('email')
        if (emailParam) {
            setEmail(emailParam)
        }
    }, [location])

    const handleAuth = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) throw error
            navigate('/')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4 font-sans text-coffee">

            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl w-full max-w-[500px] border border-coffee/5">

                <div className="mb-0">
                    <h1 className="text-4xl font-black font-display text-coffee uppercase mb-2 tracking-tight">CONNEXION</h1>
                    <p className="text-[#8c8279] font-medium text-lg">Accédez à votre compte.</p>
                </div>

                {error && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm font-medium">
                        ⚠️ {error}
                    </div>
                )}

                <div className="mt-8">
                    <button type="button" className="w-full bg-white border border-gray-200 text-coffee font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continuer avec Google
                    </button>
                </div>

                <div className="relative flex py-2 items-center my-6">
                    <div className="flex-grow border-t border-coffee/10"></div>
                    <span className="flex-shrink-0 mx-4 text-xs font-bold text-coffee/30 uppercase tracking-widest">OU</span>
                    <div className="flex-grow border-t border-coffee/10"></div>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-coffee">NOM DE VOTRE MARQUE / EMAIL</label>
                        <input
                            type="email"
                            placeholder="vous@marque.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-[#FAF6F3] border border-transparent focus:border-coffee rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-coffee transition-all font-medium text-coffee placeholder-coffee/30"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 ml-1 text-coffee">MOT DE PASSE</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-[#FAF6F3] border border-transparent focus:border-coffee rounded-xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-coffee transition-all font-medium text-coffee placeholder-coffee/30"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border-2 border-coffee/20 flex items-center justify-center transition-all ${rememberMe ? 'bg-coffee border-coffee' : 'bg-transparent group-hover:border-coffee/50'}`}>
                                {rememberMe && <Check className="w-3.5 h-3.5 text-cream" strokeWidth={4} />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span className="text-sm font-bold text-coffee/60 group-hover:text-coffee transition-colors">Se souvenir de moi</span>
                        </label>

                        <a href="#" className="text-sm font-bold text-coffee hover:underline decoration-2 underline-offset-4 decoration-coffee/30">
                            Mot de passe oublié ?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#23120b] text-[#f5ebe0] font-bold text-lg py-4 rounded-xl hover:scale-[1.01] transition-all duration-300 shadow-xl shadow-coffee/20 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
