
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Manuscripts from './pages/Manuscripts';
import ManuscriptDetail from './pages/ManuscriptDetail';
import Login from './pages/Login';

const App: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? 'pb-12' : ''}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manuscripts" element={<Manuscripts />} />
          <Route path="/manuscripts/:id" element={<ManuscriptDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
      
      {!isAuthPage && (
        <footer className="bg-white border-t border-gray-200 py-6 text-center">
          <p className="text-xs text-gray-400 font-medium">
            Central Council for Research in Ayurvedic Sciences (CCRAS) - Manuscript Management Workflow
            <br />
            Ministry of Ayush, Govt. of India
          </p>
        </footer>
      )}
    </div>
  );
};

export default App;
