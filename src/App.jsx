import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardHome from './pages/DashboardHome'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { supabase } from './supabaseClient'

// Layout wrapper for protected routes
const DashboardLayout = ({ children, user }) => {
  return (
    <div className="flex h-screen bg-[#f5ebe0] overflow-hidden font-sans text-coffee">
      <Sidebar user={user} />
      <div className="flex-1 ml-72 flex flex-col h-full overflow-hidden relative">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#f5ebe0] text-coffee font-display animate-pulse uppercase tracking-widest">
        Chargement...
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            session ? (
              <DashboardLayout user={session.user}>
                <DashboardHome />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/reports"
          element={
            session ? (
              <DashboardLayout user={session.user}>
                <Reports />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/settings"
          element={
            session ? (
              <DashboardLayout user={session.user}>
                <Settings />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            session ? (
              <DashboardLayout user={session.user}>
                <Profile user={session.user} />
              </DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
