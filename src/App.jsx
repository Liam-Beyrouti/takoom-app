import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './pages/DashboardHome';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Helper component to handle location-based logic inside Router
const DashboardLayout = () => {
  const location = useLocation();
  const [user, setUser] = useState("Invité");

  useEffect(() => {
    // Check URL params for user
    const params = new URLSearchParams(location.search);
    const userParam = params.get('user');

    if (userParam) {
      setUser(userParam);
      localStorage.setItem('takoom_user', userParam);
    } else {
      // Check localStorage
      const savedUser = localStorage.getItem('takoom_user');
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, [location]);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/reports':
        return 'Rapports';
      case '/settings':
        return 'Configuration';
      case '/':
      default:
        return "Vue d'ensemble";
    }
  };

  return (
    <div className="flex h-screen bg-[#f5ebe0] overflow-hidden font-sans text-coffee">
      {/* Sidebar - Fixed width */}
      <Sidebar user={user} />

      {/* Main Content - Takes remaining width */}
      <div className="flex-1 ml-72 flex flex-col h-full overflow-hidden relative">
        {/* Header - Fixed at top relative to content area */}
        <Header title={getPageTitle(location.pathname)} user={user} />

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout />
    </BrowserRouter>
  );
}

export default App;
