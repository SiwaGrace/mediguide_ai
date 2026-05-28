import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Bot, MapPin, Bell, BookOpen, Globe, 
  ArrowRight, ShieldCheck, HeartHandshake, Smile, Star 
} from 'lucide-react';

export default function LandingPage() {
  const { setActivePage, createNewChat, t } = useContext(AppContext);

  const stats = [
    { label: t.statAccuracy, value: '1.2s', desc: 'Simulated Latency' },
    { label: t.statClinics, value: '50+', desc: 'Across Greater Accra' },
    { label: t.statLanguages, value: '4', desc: 'EN, FR, Twi, Ewe' },
    { label: t.statChecks, value: '10,000+', desc: 'Consultations Simulated' }
  ];

  const features = [
    {
      title: 'AI Symptom Assessment',
      icon: Bot,
      desc: 'Discuss health concerns in standard terms or local languages. Get immediate urgency analysis.',
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      action: () => createNewChat()
    },
    {
      title: 'Nearby Clinics Directory',
      icon: MapPin,
      desc: 'Locate nearby doctors and pharmacies. Filter by operating status and emergency support.',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      action: () => setActivePage('clinics')
    },
    {
      title: 'Medication Tracking',
      icon: Bell,
      desc: 'Set custom reminders and schedule times. Dynamic dashboard logs pill completion rates.',
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      action: () => setActivePage('reminders')
    },
    {
      title: 'Health Education Hub',
      icon: BookOpen,
      desc: 'Browse medically-verified articles on common conditions like Malaria, Hypertension, and Diabetes.',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      action: () => setActivePage('education')
    },
    {
      title: 'Local Language Integrations',
      icon: Globe,
      desc: 'Access healthcare guidance in English, French, Twi, and Ewe, removing linguistic barriers.',
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      action: () => {}
    }
  ];

  const testimonials = [
    {
      name: 'Esi Mensah',
      role: 'Mother of two, East Legon',
      text: 'The local language support in Twi made checking my daughter\'s fever symptoms extremely easy. It directed me straight to a pediatric clinic nearby.',
      rating: 5,
      avatar: '👩🏾‍💼'
    },
    {
      name: 'Jean-Pierre Diallo',
      role: 'Expat, Airport Residential Area',
      text: 'Having a French localization option and being able to find St. Jude Hospital\'s emergency services in under a minute was incredibly comforting.',
      rating: 5,
      avatar: '👨🏼‍💻'
    },
    {
      name: 'Kofi Boadu',
      role: 'Chronic Care Patient, Spintex',
      text: 'Using the medication reminders helped me stay perfectly adherent to my daily Lisinopril for high blood pressure. The progress ring keeps me motivated!',
      rating: 5,
      avatar: '👴🏾'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden pb-16">
      
      {/* Background soft glowing circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-400/10 dark:bg-sky-400/5 rounded-full blur-[120px] -z-10 animate-float" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-[100px] -z-10 animate-float" style={{ animationDelay: '2s' }} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 text-center">
        
        {/* Soft Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-sky-500/10 dark:bg-sky-500/5 text-sky-600 dark:text-sky-400 rounded-full text-xs font-bold border border-sky-500/20 mb-6 animate-fade-in">
          <ShieldCheck className="h-4 w-4" />
          <span>Verified Healthcare Guidance</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-[1.1] max-w-4xl mx-auto mb-6">
          {t.tagline}
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => createNewChat()}
            className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-xl shadow-sky-500/20 hover:shadow-sky-500/35 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>{t.ctaStart}</span>
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
          
          <button
            onClick={() => setActivePage('education')}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-bold rounded-2xl transition-all flex items-center justify-center cursor-pointer"
          >
            {t.ctaExplore}
          </button>
        </div>

      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="glass-card rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-800/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y divide-slate-100 lg:divide-y-0 lg:divide-x divide-slate-200/50 dark:divide-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx} className={`pt-4 lg:pt-0 lg:px-4 ${idx === 0 ? 'pt-0' : ''}`}>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                  {stat.label}
                </p>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 text-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            Core Assistant Features
          </h2>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-2">
            Integrated tools designed to make healthcare access effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                onClick={feat.action}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                <div className={`p-3.5 rounded-2xl w-fit ${feat.color} mb-5`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition-colors flex items-center">
                  <span>{feat.title}</span>
                  {feat.action !== (() => {}) && (
                    <ArrowRight className="h-4 w-4 ml-1.5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  )}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 text-left">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            What Our Community Says
          </h2>
          <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-2">
            Real impact stories from individuals accessing digital health guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex space-x-1 text-amber-400 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-semibold italic text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{test.text}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-2xl">{test.avatar}</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
