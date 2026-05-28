import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import ClinicsPage from './pages/ClinicsPage';
import RemindersPage from './pages/RemindersPage';
import EducationPage from './pages/EducationPage';

function AppContent() {
  const { activePage } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/20 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Responsive Header Navigation */}
      <Navbar />
      
      {/* Main Content Page Router */}
      <main className="flex-1 w-full">
        <div className="animate-fade-in">
          {activePage === 'landing' && <LandingPage />}
          {activePage === 'chat' && <ChatPage />}
          {activePage === 'clinics' && <ClinicsPage />}
          {activePage === 'reminders' && <RemindersPage />}
          {activePage === 'education' && <EducationPage />}
        </div>
      </main>

      {/* Global Clinical Disclaimer Footer */}
      <Footer />
      
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
