import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Activity, Sun, Moon, Globe, Menu, X } from "lucide-react";

export default function Navbar() {
  const {
    activePage,
    setActivePage,
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
  } = useContext(AppContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "landing", label: t.navHome },
    { id: "chat", label: t.navChat },
    { id: "clinics", label: t.navClinics },
    // { id: 'reminders', label: t.navReminders },
    { id: "education", label: t.navEducation },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick("landing")}
          >
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/20 mr-2.5">
              <Activity className="h-6 w-6 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-500 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
              {t.appName}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activePage === link.id
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Settings Section (Theme & Language) */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-amber-400" />
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg px-2 py-1.5 border border-slate-200/50 dark:border-slate-700/50">
              <Globe className="h-4 w-4 mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none text-xs font-medium focus:ring-0 outline-none text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <option value="en" className="dark:bg-slate-900">
                  {t.english}
                </option>
                <option value="fr" className="dark:bg-slate-900">
                  {t.french}
                </option>
                <option value="twi" className="dark:bg-slate-900">
                  {t.twi}
                </option>
                <option value="ewe" className="dark:bg-slate-900">
                  {t.ewe}
                </option>
              </select>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle for mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 text-amber-400" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1.5 shadow-xl transition-all duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                activePage === link.id
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center">
              <Globe className="h-4 w-4 mr-2" /> {t.langName}
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-sm font-medium focus:ring-0 outline-none"
            >
              <option value="en">{t.english}</option>
              <option value="fr">{t.french}</option>
              <option value="twi">{t.twi}</option>
              <option value="ewe">{t.ewe}</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}
