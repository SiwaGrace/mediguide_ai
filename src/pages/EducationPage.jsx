import React, { useState, useMemo, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { mockArticles } from '../data/mockArticles';
import { 
  Search, BookOpen, Clock, User, X, ChevronRight, 
  Sparkles, CheckCircle2, Bookmark, Share2 
} from 'lucide-react';

export default function EducationPage() {
  const { educationCategory, setEducationCategory } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Sync category if redirected from Chatbot quick actions
  useEffect(() => {
    if (educationCategory) {
      setSelectedCategory(educationCategory);
      setEducationCategory(null); // Reset after consuming
    }
  }, [educationCategory, setEducationCategory]);

  const categories = ['All', 'Malaria', 'Hypertension', 'Pregnancy', 'Diabetes', 'Nutrition'];

  // Filter Articles
  const filteredArticles = useMemo(() => {
    return mockArticles.filter((art) => {
      const matchesSearch = 
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.summary.toLowerCase().includes(search.toLowerCase()) ||
        art.content.toLowerCase().includes(search.toLowerCase());

      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  const activeArticle = useMemo(() => {
    return mockArticles.find((art) => art.id === selectedArticleId);
  }, [selectedArticleId]);

  const colorPacks = {
    emerald: {
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      gradient: 'from-emerald-500/20 to-teal-500/5',
      accent: 'border-emerald-500'
    },
    rose: {
      badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
      gradient: 'from-rose-500/20 to-pink-500/5',
      accent: 'border-rose-500'
    },
    blue: {
      badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
      gradient: 'from-sky-500/20 to-indigo-500/5',
      accent: 'border-sky-500'
    },
    amber: {
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      gradient: 'from-amber-500/20 to-orange-500/5',
      accent: 'border-amber-500'
    },
    teal: {
      badge: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20',
      gradient: 'from-teal-500/20 to-emerald-500/5',
      accent: 'border-teal-500'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left relative">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">
          Health Education Hub
        </h1>
        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Access verified healthcare literature regarding chronic conditions, prenatal guidelines, and wellness strategies.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6 max-w-2xl">
        <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search health articles by keywords or content (e.g. insulin, mosquito net)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm font-semibold outline-none dark:text-white shadow-xs"
        />
      </div>

      {/* Category Tab List */}
      <div className="flex space-x-1.5 overflow-x-auto pb-4 mb-8 border-b border-slate-200/50 dark:border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/10'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-16 text-center text-slate-400 max-w-md mx-auto">
          <BookOpen className="h-10 w-10 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold">No medical articles match your keyword filters.</p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('All'); }}
            className="text-xs text-sky-500 font-bold underline mt-2"
          >
            View all articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => {
            const pack = colorPacks[art.color] || colorPacks.blue;
            return (
              <article
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  
                  {/* Decorative Banner */}
                  <div className={`h-40 bg-gradient-to-br ${pack.gradient} flex items-center justify-center relative overflow-hidden border-b border-slate-100 dark:border-slate-800`}>
                    <span className="text-6xl select-none filter drop-shadow-md animate-float">
                      {art.image}
                    </span>
                    
                    {/* Read time floating */}
                    <span className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center shadow-xs">
                      <Clock className="h-3 w-3 mr-1" /> {art.readTime}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-left">
                    
                    {/* Category Label */}
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide ${pack.badge}`}>
                      {art.category}
                    </span>

                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-white mt-3 hover:text-sky-500 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>

                  </div>

                </div>

                {/* Footer details */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-850 mt-4">
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate max-w-40">{art.author}</span>
                  </div>
                  
                  <span className="text-sky-500 text-xs font-bold flex items-center shrink-0">
                    <span>Read Article</span>
                    <ChevronRight className="h-4 w-4 ml-0.5" />
                  </span>
                </div>

              </article>
            );
          })}
        </div>
      )}

      {/* 4. Full Article Reader Overlay Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300">
          
          {/* Reader Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative animate-fade-in max-h-[85vh] overflow-y-auto">
            
            {/* Header controls */}
            <div className="flex justify-between items-center mb-6">
              
              {/* Category */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide ${
                colorPacks[activeArticle.color]?.badge
              }`}>
                {activeArticle.category}
              </span>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => alert('Article bookmarked successfully!')} 
                  className="p-2 text-slate-400 hover:text-sky-500 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                >
                  <Bookmark className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Article link copied to clipboard!');
                  }} 
                  className="p-2 text-slate-400 hover:text-sky-500 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                >
                  <Share2 className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

            </div>

            {/* Banner details inside reader */}
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <span className="text-5xl shrink-0">{activeArticle.image}</span>
              <div>
                <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-white leading-snug">
                  {activeArticle.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
                  <span className="flex items-center"><User className="h-3.5 w-3.5 mr-1" /> {activeArticle.author}</span>
                  <span>•</span>
                  <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Markdown parsed body */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-left">
              <div className="text-sm md:text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-350 whitespace-pre-line">
                {activeArticle.content}
              </div>
            </div>

            {/* Bottom Safe Note */}
            <div className="mt-8 p-4 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/15 rounded-2xl flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
                  Verification Note
                </p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  All material in the MediGuide Education library is sourced from verified healthcare frameworks. This information is meant for educational literacy, not active self-diagnosis.
                </p>
              </div>
            </div>

            {/* Footer close */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticleId(null)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs cursor-pointer transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
