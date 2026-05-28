import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function AddReminderModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [time, setTime] = useState('08:00');
  const [condition, setCondition] = useState('General');
  const [selectedColor, setSelectedColor] = useState('blue');

  if (!isOpen) return null;

  const colorOptions = [
    { id: 'blue', bg: 'bg-sky-500', text: 'text-white' },
    { id: 'rose', bg: 'bg-rose-500', text: 'text-white' },
    { id: 'amber', bg: 'bg-amber-500', text: 'text-white' },
    { id: 'emerald', bg: 'bg-emerald-500', text: 'text-white' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Convert 24h format to 12h AM/PM
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const formattedTime = `${String(h12).padStart(2, '0')}:${minutes} ${ampm}`;

    onAdd({
      name,
      dosage: dosage || 'As directed',
      frequency,
      time: formattedTime,
      condition,
      color: selectedColor
    });

    // Reset Form
    setName('');
    setDosage('');
    setFrequency('Daily');
    setTime('08:00');
    setCondition('General');
    setSelectedColor('blue');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-fade-in text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-5">
          Schedule Medication
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Med Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Medication Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lisinopril, Metformin"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm font-semibold outline-none dark:text-white"
            />
          </div>

          {/* Dosage & Time Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Dosage
              </label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="e.g. 1 Tablet, 500mg"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm font-semibold outline-none dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Reminder Time
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm font-semibold outline-none dark:text-white"
              />
            </div>
          </div>

          {/* Frequency & Condition Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm font-semibold outline-none dark:text-white"
              >
                <option value="Daily">Daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Weekly">Weekly</option>
                <option value="As needed">As needed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Condition Tag
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-sm font-semibold outline-none dark:text-white"
              >
                <option value="General">General</option>
                <option value="Malaria">Malaria</option>
                <option value="Hypertension">Hypertension</option>
                <option value="Pregnancy">Pregnancy</option>
                <option value="Diabetes">Diabetes</option>
              </select>
            </div>
          </div>

          {/* Pill Color Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 text-left">
              Visual Theme Color
            </label>
            <div className="flex space-x-3">
              {colorOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedColor(opt.id)}
                  className={`h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${opt.bg} ${
                    selectedColor === opt.id 
                      ? 'ring-4 ring-offset-2 ring-sky-400 dark:ring-offset-slate-900 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  {selectedColor === opt.id && <Check className="h-4 w-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 cursor-pointer transition-all"
            >
              Add Reminder
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
