import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Activity, ShieldAlert, Heart } from "lucide-react";

export default function Footer() {
  const { setActivePage, t } = useContext(AppContext);

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Urgent Emergency Alert Banner inside Footer */}
        {/* <div className="mb-8 p-4 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-left">
          <div className="p-2 bg-red-500 text-white rounded-xl shadow-md shadow-red-500/20 shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
              {t.disclaimerTitle}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              {t.emergencyDisclaimer}
            </p>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-sky-500 text-white shadow-sm mr-2 shrink-0">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-500 dark:from-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                {t.appName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Connecting communities to professional healthcare support through
              accessible, localized AI guidance.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Application Services
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <button
                  onClick={() => setActivePage("chat")}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  AI Symptom Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("clinics")}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Clinics & Hospital Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("reminders")}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Medication Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("education")}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Health Education Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Health Categories */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Common Guides
            </h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <button
                  onClick={() => {
                    setActivePage("education");
                  }}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Malaria Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("education");
                  }}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Managing Hypertension
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("education");
                  }}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Prenatal Care Checkup
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage("education");
                  }}
                  className="hover:text-sky-500 cursor-pointer"
                >
                  Nutrition Core Habits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Future Integrations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
              Ready for production integration with local WhatsApp, SMS, and
              Voice response networks.
            </p>
            <span className="inline-flex items-center px-2 py-1 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-bold border border-sky-500/20">
              V1.0 Stable Release
            </span>
          </div>
        </div>

        {/* Core copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {t.appName}. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 sm:mt-0 flex items-center">
            Designed for impact with{" "}
            <Heart className="h-3.5 w-3.5 mx-1 text-red-500 animate-pulse fill-current" />{" "}
            in West Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}
