import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import AddReminderModal from '../components/AddReminderModal';
import { 
  Bell, BellOff, Plus, Check, Clock, Calendar, 
  Trash2, Smile, Award, Heart, CheckCircle2 
} from 'lucide-react';

export default function RemindersPage() {
  const { 
    reminders, 
    addReminder, 
    toggleReminderCompletion, 
    deleteReminder,
    t
  } = useContext(AppContext);

  const [modalOpen, setModalOpen] = useState(false);

  // Stats Calculations
  const totalCount = reminders.length;
  const takenCount = reminders.filter((r) => r.taken).length;
  const adherenceRate = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 100;

  // Custom Colors Mapping for styling border, icon backgrounds, pills
  const colorsMap = {
    rose: {
      border: 'border-rose-200 dark:border-rose-900/50',
      bg: 'bg-rose-50 dark:bg-rose-500/10',
      text: 'text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-500 text-white'
    },
    amber: {
      border: 'border-amber-200 dark:border-amber-900/50',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-500 text-white'
    },
    blue: {
      border: 'border-sky-200 dark:border-sky-900/50',
      bg: 'bg-sky-50 dark:bg-sky-500/10',
      text: 'text-sky-600 dark:text-sky-400',
      badge: 'bg-sky-500 text-white'
    },
    emerald: {
      border: 'border-emerald-200 dark:border-emerald-900/50',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-500 text-white'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header with trigger button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            Medication Reminders
          </h1>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
            Log and maintain your medication schedule to support clinical health outcomes.
          </p>
        </div>
        
        <button
          onClick={() => setModalOpen(true)}
          className="w-full sm:w-auto px-5 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm"
        >
          <Plus className="h-5 w-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Stats Dashboard Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Adherence Rate Circular Progress / Ring Card */}
          <div className="glass-card rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-800/80 text-center relative overflow-hidden">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-5">
              Daily Progress
            </h3>

            {/* Simulated circular chart */}
            <div className="relative h-36 w-36 mx-auto flex items-center justify-center mb-5">
              
              {/* SVG Ring chart */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#0ea5e9"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * adherenceRate) / 100}
                  className="transition-all duration-700 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inner Label */}
              <div className="absolute text-center">
                <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
                  {adherenceRate}%
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Adherence
                </p>
              </div>

            </div>

            {/* Sub stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
              <div className="border-r border-slate-100 dark:border-slate-800">
                <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  {takenCount} <span className="text-xs font-semibold text-slate-400">/ {totalCount}</span>
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  Doses Taken
                </p>
              </div>
              
              <div>
                <p className="text-2xl font-extrabold text-emerald-500">
                  {totalCount - takenCount}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                  Remaining
                </p>
              </div>
            </div>

            {adherenceRate === 100 && totalCount > 0 && (
              <div className="mt-4 p-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border border-emerald-500/10">
                <Award className="h-4 w-4" />
                <span>Excellent Daily Adherence!</span>
              </div>
            )}

          </div>

          {/* Guidelines disclaimer */}
          <div className="p-5 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/15 rounded-3xl flex items-start space-x-3.5">
            <Heart className="h-5 w-5 text-sky-500 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                Clinical Health Note
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Take medications precisely as directed by healthcare professionals. Consult with doctors at nearby clinics before altering scheduled dosages.
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Schedule Checklist (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          <h2 className="text-lg font-bold text-slate-700 dark:text-slate-300 px-1">
            Today's Schedule
          </h2>

          {totalCount === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <BellOff className="h-10 w-10 mx-auto text-slate-300 mb-3" />
              <p className="text-sm font-semibold">You have no active medication schedules set for today.</p>
              <button 
                onClick={() => setModalOpen(true)}
                className="text-xs text-sky-500 font-bold underline mt-2 cursor-pointer"
              >
                Create your first reminder
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {reminders.map((rem) => {
                const styling = colorsMap[rem.color] || colorsMap.blue;
                return (
                  <div
                    key={rem.id}
                    className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 flex items-center justify-between transition-all duration-300 ${
                      rem.taken 
                        ? 'border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30' 
                        : `border-l-4 ${styling.border}`
                    }`}
                  >
                    
                    {/* Checklist Left Side Info */}
                    <div className="flex items-center space-x-4">
                      
                      {/* Interactive Checked Toggle Box */}
                      <button
                        onClick={() => toggleReminderCompletion(rem.id)}
                        className={`h-9 w-9 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                          rem.taken
                            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-transparent border border-slate-200 dark:border-slate-700 hover:border-sky-500/40'
                        }`}
                      >
                        <Check className="h-5 w-5 stroke-[3]" />
                      </button>

                      {/* Info labels */}
                      <div className="space-y-0.5">
                        
                        {/* Title Med Name */}
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-extrabold text-base sm:text-lg transition-all ${
                            rem.taken 
                              ? 'text-slate-400 dark:text-slate-600 line-through' 
                              : 'text-slate-800 dark:text-white'
                          }`}>
                            {rem.name}
                          </h3>
                          
                          {/* Condition Tag */}
                          {rem.condition && rem.condition !== 'General' && (
                            <span className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold ${styling.badge}`}>
                              {rem.condition}
                            </span>
                          )}
                        </div>

                        {/* Dosage details */}
                        <p className={`text-xs font-semibold ${
                          rem.taken ? 'text-slate-400/80 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          Dosage: <strong>{rem.dosage}</strong> • Frequency: {rem.frequency}
                        </p>

                        {/* Time indicator */}
                        <div className={`flex items-center text-[10px] font-bold mt-1 ${
                          rem.taken ? 'text-slate-400/80 dark:text-slate-600' : 'text-sky-500'
                        }`}>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Remind at: {rem.time}</span>
                        </div>

                      </div>

                    </div>

                    {/* Delete Icon on Right */}
                    <button
                      onClick={() => deleteReminder(rem.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                      title="Remove reminder"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Add Reminder Modal overlay */}
      <AddReminderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={addReminder}
      />

    </div>
  );
}
