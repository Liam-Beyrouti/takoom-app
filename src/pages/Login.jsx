import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, Menu, X } from 'lucide-react'

const Login = () => {
    const WEBSITE_URL = 'https://takoom-website.vercel.app'
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

    // Placeholder function for external navigation
    const navigateToSite = (page) => {
        // In production, this should point to the actual website URL
        // For now, we'll try to redirect relative to the current origin if they serve static files, 
        // or just console log if we are in simplified mode.
        // Assuming the user might manually fix the links later or we use absolute paths if known.
        // Given the user just updated static site links, we can try to assume a structure or just use # for demo in React.
        // The user's request is "add navbar", implying visual completeness.
        window.location.href = `/${page}`
    }

    return (
        <div className="min-h-screen bg-cream font-sans text-coffee flex flex-col items-center justify-center p-4 relative">

            {/* Navigation Bar */}
            <nav className="fixed w-full z-50 top-6 px-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center text-sm font-medium">
                    <a href={`${WEBSITE_URL}/`} className="text-xl font-display tracking-tight uppercase hover:opacity-80 transition">
                        TAKOOM
                    </a>

                    {/* Desktop Menu */}
                    <div id="desktop-menu"
                        className="hidden md:flex bg-coffee/5 backdrop-blur-sm rounded-full p-1 border border-coffee/10 shadow-sm">
                        <a href={`${WEBSITE_URL}/about.html`} className="px-6 py-2 rounded-full hover:bg-coffee/10 transition">À Propos</a>
                        <a href={`${WEBSITE_URL}/features.html`} className="px-6 py-2 rounded-full hover:bg-coffee/10 transition">Fonctionnalités</a>
                        <a href={`${WEBSITE_URL}/sectors.html`} className="px-6 py-2 rounded-full hover:bg-coffee/10 transition">Secteurs</a>
                        <a href={`${WEBSITE_URL}/pricing.html`} className="px-6 py-2 rounded-full hover:bg-coffee/10 transition">Offres</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-coffee font-bold text-sm hover:opacity-70 transition hidden md:block opacity-50 cursor-default">
                            Connexion
                        </span>

                        <a href={`${WEBSITE_URL}/onboarding.html`}
                            className="bg-coffee text-cream px-6 py-3 rounded-full font-bold hover:scale-105 transition transform shadow-lg shadow-coffee/20 hidden md:block">
                            Me lancer
                        </a>

                        {/* Burger Button */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            id="burger-btn"
                            className="md:hidden text-coffee p-2"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Card */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl w-full max-w-[500px] border border-coffee/5 mt-20">

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

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-coffee flex flex-col justify-center items-center transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-6 right-6 text-cream p-2 hover:bg-white/10 rounded-full transition"
                >
                    <X className="w-8 h-8" />
                </button>

                <nav className="flex flex-col items-center gap-8">
                    <a href={`${WEBSITE_URL}/`} className="text-cream font-display text-2xl uppercase tracking-tighter hover:text-white transition no-underline">Accueil</a>
                    <a href={`${WEBSITE_URL}/about.html`} className="text-cream font-display text-2xl uppercase tracking-tighter hover:text-white transition no-underline">À Propos</a>
                    <a href={`${WEBSITE_URL}/features.html`} className="text-cream font-display text-2xl uppercase tracking-tighter hover:text-white transition no-underline">Fonctionnalités</a>
                    <a href={`${WEBSITE_URL}/sectors.html`} className="text-cream font-display text-2xl uppercase tracking-tighter hover:text-white transition no-underline">Secteurs</a>
                    <a href={`${WEBSITE_URL}/pricing.html`} className="text-cream font-display text-2xl uppercase tracking-tighter hover:text-white transition no-underline">Offres</a>
                    <span className="text-cream font-display text-2xl uppercase tracking-tighter opacity-50">Connexion</span>

                    <a href={`${WEBSITE_URL}/onboarding.html`}
                        className="mt-4 bg-cream text-coffee px-8 py-3 rounded-full font-bold text-lg uppercase tracking-widest hover:scale-105 transition shadow-xl no-underline">
                        Me lancer
                    </a>
                </nav>
            </div>

        </div>
    )
}

export default Login
