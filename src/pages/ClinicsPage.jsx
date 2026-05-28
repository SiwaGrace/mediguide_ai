import React, { useState, useMemo } from 'react';
import { mockClinics } from '../data/mockClinics';
import { 
  Search, Star, MapPin, Phone, Clock, AlertTriangle, 
  Grid, Compass, ShieldAlert, Award, Stethoscope 
} from 'lucide-react';

export default function ClinicsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [emergencyFilter, setEmergencyFilter] = useState(false);
  const [selectedClinicId, setSelectedClinicId] = useState('clinic-1');

  // Filter clinics
  const filteredClinics = useMemo(() => {
    return mockClinics.filter((clinic) => {
      const matchesSearch = 
        clinic.name.toLowerCase().includes(search.toLowerCase()) ||
        clinic.address.toLowerCase().includes(search.toLowerCase()) ||
        clinic.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesType = typeFilter === 'All' || clinic.type === typeFilter;
      const matchesEmergency = !emergencyFilter || clinic.hasEmergency;

      return matchesSearch && matchesType && matchesEmergency;
    });
  }, [search, typeFilter, emergencyFilter]);

  const selectedClinic = useMemo(() => {
    return mockClinics.find((c) => c.id === selectedClinicId) || mockClinics[0];
  }, [selectedClinicId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
          Healthcare Directory
        </h1>
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Locate verified clinics, pharmacies, and emergency hospitals in your local district.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Filter bar + Cards List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Search and Filters Bar */}
          <div className="glass-card rounded-3xl p-5 shadow-sm space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search clinics by name, district, or medical services (e.g. malaria test)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm font-semibold outline-none dark:text-white"
              />
            </div>

            {/* Sub-Filters Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Type Category Tabs */}
              <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                {['All', 'Clinic', 'Hospital'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      typeFilter === type
                        ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {type}s
                  </button>
                ))}
              </div>

              {/* Emergency Only Filter */}
              <label className="flex items-center space-x-2.5 cursor-pointer text-xs font-bold text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={emergencyFilter}
                  onChange={(e) => setEmergencyFilter(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                />
                <span className="flex items-center text-red-500">
                  <ShieldAlert className="h-4 w-4 mr-1 animate-pulse" />
                  Emergency Trauma Only
                </span>
              </label>

            </div>

          </div>

          {/* Cards List Panel */}
          <div className="space-y-4 max-h-[580px] overflow-y-auto pr-2">
            {filteredClinics.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center text-slate-400">
                <Compass className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-semibold">No clinics found matching your filter criteria.</p>
                <button 
                  onClick={() => { setSearch(''); setTypeFilter('All'); setEmergencyFilter(false); }}
                  className="text-xs text-sky-500 font-bold underline mt-2"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  onClick={() => setSelectedClinicId(clinic.id)}
                  className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 cursor-pointer transition-all duration-350 hover:shadow-md ${
                    selectedClinicId === clinic.id
                      ? 'border-sky-500 ring-2 ring-sky-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      
                      {/* Name & Badge */}
                      <h3 className="font-extrabold text-slate-800 dark:text-white text-base sm:text-lg">
                        {clinic.name}
                      </h3>
                      
                      <div className="flex items-center space-x-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          clinic.type === 'Hospital' 
                            ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400' 
                            : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                        }`}>
                          {clinic.type}
                        </span>
                        
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Star className="h-3.5 w-3.5 fill-current mr-0.5 shrink-0" />
                          <span>{clinic.rating}</span>
                          <span className="text-slate-400 text-[10px] font-medium ml-1">
                            ({clinic.reviews} reviews)
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Emergency Badge */}
                    {clinic.hasEmergency && (
                      <span className="px-2.5 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold rounded-lg uppercase flex items-center shrink-0">
                        <ShieldAlert className="h-3.5 w-3.5 mr-1" /> ER 24/7
                      </span>
                    )}
                  </div>

                  {/* Distance & Address */}
                  <div className="mt-3.5 space-y-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1.5 text-slate-400 shrink-0" />
                      <span>{clinic.address} • <strong>{clinic.distance} km away</strong></span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-slate-400 shrink-0" />
                      <span>{clinic.hours}</span>
                    </div>
                  </div>

                  {/* List of services in compact pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {clinic.services.map((serv, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800/80 text-[10px] font-semibold text-slate-600 dark:text-slate-400 rounded-md"
                      >
                        {serv}
                      </span>
                    ))}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

        {/* Right Side: Mock Map & Detailed Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Map Visual Component */}
          <div className="bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden relative shadow-sm h-72">
            
            {/* Interactive Vector Map Grid */}
            <svg 
              className="w-full h-full bg-slate-50 dark:bg-slate-950/80" 
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              
              {/* Map roads grid */}
              <line x1="10" y1="0" x2="10" y2="100" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="4" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="6" />
              <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="3" />
              
              <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="4" />
              <line x1="0" y1="65" x2="100" y2="65" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="5" />
              
              {/* Map Green Parks */}
              <rect x="15" y="5" width="25" height="20" rx="4" fill="rgba(34, 197, 94, 0.04)" />
              <rect x="55" y="70" width="20" height="25" rx="4" fill="rgba(34, 197, 94, 0.04)" />

              {/* Draw Pins for each clinic */}
              {mockClinics.map((c) => {
                const isSelected = selectedClinicId === c.id;
                return (
                  <g 
                    key={c.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedClinicId(c.id)}
                  >
                    {/* Pulsing ring for selected pin */}
                    {isSelected && (
                      <circle 
                        cx={c.coordinates.x} 
                        cy={c.coordinates.y} 
                        r="6" 
                        fill="rgba(14, 165, 233, 0.3)" 
                        className="animate-ping"
                      />
                    )}
                    
                    {/* Outer Circle */}
                    <circle 
                      cx={c.coordinates.x} 
                      cy={c.coordinates.y} 
                      r={isSelected ? '4' : '3'} 
                      fill={isSelected ? '#0ea5e9' : c.hasEmergency ? '#ef4444' : '#10b981'} 
                      stroke="#ffffff"
                      strokeWidth="1"
                    />

                    {/* Compact text labels above pins */}
                    {isSelected && (
                      <g>
                        <rect 
                          x={c.coordinates.x - 16} 
                          y={c.coordinates.y - 8} 
                          width="32" 
                          height="5" 
                          rx="1" 
                          fill="rgba(15, 23, 42, 0.85)" 
                        />
                        <text 
                          x={c.coordinates.x} 
                          y={c.coordinates.y - 4} 
                          fill="#ffffff" 
                          fontSize="3" 
                          textAnchor="middle" 
                          fontWeight="bold"
                        >
                          {c.distance} km
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* User Current Location Indicator */}
              <circle cx="25" cy="50" r="3.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1" />
              <circle cx="25" cy="50" r="6" fill="rgba(59, 130, 246, 0.2)" className="animate-pulse" />
              
            </svg>

            {/* Map Labels Floating overlay */}
            <div className="absolute bottom-3 left-3 bg-slate-900/85 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-700/50 flex space-x-3 items-center">
              <div className="flex items-center"><span className="h-2 w-2 rounded-full bg-red-500 mr-1 shrink-0" /> Hospital (ER)</div>
              <div className="flex items-center"><span className="h-2 w-2 rounded-full bg-emerald-500 mr-1 shrink-0" /> Clinic</div>
              <div className="flex items-center"><span className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-1 border border-white shrink-0" /> You</div>
            </div>

            <div className="absolute top-3 right-3 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
              <Compass className="h-5 w-5 animate-spin" style={{ animationDuration: '20s' }} />
            </div>

          </div>

          {/* Quick Details Sidebar View (Selected Clinic Details) */}
          {selectedClinic && (
            <div className="glass-card rounded-3xl p-6 shadow-md border border-slate-100 dark:border-slate-800/80 animate-fade-in">
              <div className="flex items-start space-x-3">
                <div className="p-3 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-2xl shrink-0">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">
                    {selectedClinic.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                    Verified Healthcare Provider
                  </p>
                </div>
              </div>

              {/* Service List Details */}
              <div className="mt-5 space-y-4 text-xs font-semibold">
                
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Available Medical Services
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                    {selectedClinic.services.map((ser, serIdx) => (
                      <div key={serIdx} className="flex items-center">
                        <Award className="h-4 w-4 mr-1.5 text-emerald-500 shrink-0" />
                        <span>{ser}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hours & Contact */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <Clock className="h-4 w-4 mr-2.5 text-slate-400 shrink-0" />
                    <span>Operating Hours: <strong>{selectedClinic.hours}</strong></span>
                  </div>
                  
                  <div className="flex items-center text-slate-600 dark:text-slate-300">
                    <Phone className="h-4 w-4 mr-2.5 text-slate-400 shrink-0" />
                    <span>Phone: <a href={`tel:${selectedClinic.phone}`} className="text-sky-500 underline font-bold">{selectedClinic.phone}</a></span>
                  </div>
                </div>

              </div>

              {/* CTA call action button */}
              <div className="mt-6 flex space-x-2">
                <a
                  href={`tel:${selectedClinic.phone}`}
                  className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl text-center shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25 transition-all text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Provider</span>
                </a>
                
                {selectedClinic.hasEmergency && (
                  <button
                    onClick={() => alert(`Directions loaded for ER trauma at ${selectedClinic.name}`)}
                    className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
                  >
                    Get Emergency Route
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
