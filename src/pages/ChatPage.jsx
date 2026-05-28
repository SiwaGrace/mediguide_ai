import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { getAIResponse } from "../services/aiService";
import {
  Bot,
  User,
  Send,
  ShieldAlert,
  Sparkles,
  Plus,
  Trash2,
  ChevronRight,
  MessageSquare,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function ChatPage() {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    createNewChat,
    addMessageToActiveChat,
    deleteChatSession,
    setActivePage,
    setEducationCategory,
    t,
  } = useContext(AppContext);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];

  // Auto-scroll to bottom of chat on new messages or typing state
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput("");

    // 1. Add User Message
    addMessageToActiveChat("user", text);
    setIsTyping(true);

    try {
      // 2. Fetch Simulated AI response
      const response = await getAIResponse(text, activeChat.messages);

      // 3. Add AI Message with metadata
      addMessageToActiveChat("ai", response.text, {
        urgency: response.urgency,
        actions: response.actions,
      });
    } catch (e) {
      addMessageToActiveChat(
        "ai",
        "Sorry, I encountered an issue. Please try again.",
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSend(suggestionText);
  };

  const handleActionClick = (action) => {
    if (action.actionType === "NAV_CLINICS") {
      setActivePage("clinics");
    } else if (action.actionType === "NAV_EDUCATION") {
      if (action.payload) {
        setEducationCategory(action.payload);
      }
      setActivePage("education");
    } else if (action.actionType === "NAV_REMINDERS") {
      setActivePage("reminders");
    }
  };

  const suggestions = [
    { label: "“I have a headache”", query: "I have a headache" },
    { label: "“Find nearby clinics”", query: "Find nearby clinics" },
    { label: "“Explain hypertension”", query: "Explain hypertension" },
    { label: "“Pregnancy advice”", query: "Pregnancy advice" },
  ];

  return (
    <div className="w-full flex h-[calc(100vh-4rem)] border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      {/* 1. Sidebar - Desktop view */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => createNewChat()}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl shadow-md shadow-sky-500/10 hover:shadow-sky-500/25 transition-all cursor-pointer text-sm"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>New Assessment</span>
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-left">
          <h3 className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Assessment History
          </h3>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                activeChatId === chat.id
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-l-4 border-sky-500"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center space-x-2.5 overflow-hidden w-4/5">
                <MessageSquare className="h-4 w-4 shrink-0 opacity-70" />
                <span className="text-xs font-semibold truncate">
                  {chat.title}
                </span>
              </div>
              <button
                onClick={(e) => deleteChatSession(chat.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:text-red-500 p-1 rounded-lg transition-all"
                title="Delete history"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile Drawer Trigger Bar */}
      <div className="md:hidden absolute top-4 left-4 z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shadow-md border border-slate-200 dark:border-slate-700"
        >
          <MessageSquare className="h-4 w-4" />
          <span>History ({chats.length})</span>
        </button>
      </div>

      {/* Mobile Sidebar overlay backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`md:hidden fixed top-16 bottom-0 left-0 w-64 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              createNewChat();
              setSidebarOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl shadow-md text-sm cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Assessment</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-left">
          <h3 className="px-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Assessment History
          </h3>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setActiveChatId(chat.id);
                setSidebarOpen(false);
              }}
              className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                activeChatId === chat.id
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            >
              <div className="flex items-center space-x-2.5 overflow-hidden w-4/5">
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="text-xs font-semibold truncate">
                  {chat.title}
                </span>
              </div>
              <button
                onClick={(e) => deleteChatSession(chat.id, e)}
                className="text-slate-400 hover:text-red-500 p-1 rounded-lg"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. Main Chat Workspace */}
      <main className="flex-1 flex flex-col h-full bg-slate-50/30 dark:bg-slate-950/20 text-left">
        {/* Chat History Panel */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* Emergency Alert Card at top of the thread */}
          <div className="max-w-3xl mx-auto bg-red-500/5 dark:bg-red-500/10 border border-red-500/15 rounded-3xl p-5 flex items-start space-x-4 mb-4 mt-8 md:mt-0">
            <div className="p-2.5 bg-red-500 text-white rounded-2xl shadow-md shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-600 dark:text-red-400">
                {t.disclaimerTitle}
              </h4>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {t.emergencyDisclaimer}
              </p>
            </div>
          </div>

          {/* Render Active Chat Messages */}
          <div className="max-w-3xl mx-auto space-y-6">
            {activeChat?.messages.map((msg, index) => {
              const isAi = msg.sender === "ai";

              // Get Urgency Color Class
              let badgeColor = "bg-sky-500/10 text-sky-600 dark:text-sky-400";
              if (msg.urgency === "High") {
                badgeColor =
                  "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 animate-pulse";
              } else if (msg.urgency === "Medium") {
                badgeColor =
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400";
              }

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-3 sm:space-x-4 animate-fade-in ${
                    isAi ? "" : "flex-row-reverse space-x-reverse"
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`p-2.5 rounded-2xl shrink-0 shadow-sm ${
                      isAi
                        ? "bg-linear-to-r from-sky-500 to-emerald-500 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {isAi ? (
                      <Bot className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>

                  {/* Message Bubble wrapper */}
                  <div className="space-y-2 max-w-[80%] sm:max-w-[70%]">
                    {/* Glassmorphic Bubble */}
                    <div
                      className={`p-4 rounded-3xl shadow-sm border ${
                        isAi
                          ? "bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 rounded-tl-none text-slate-800 dark:text-slate-200"
                          : "bg-sky-500 text-white border-sky-500 rounded-tr-none"
                      }`}
                    >
                      {/* Urgency Badge above AI responses */}
                      {isAi && msg.urgency && (
                        <div className="flex items-center space-x-1.5 mb-2.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold ${badgeColor}`}
                          >
                            <AlertCircle className="h-3 w-3 mr-1 shrink-0" />
                            {msg.urgency === "High"
                              ? t.urgencyHigh
                              : msg.urgency === "Medium"
                                ? t.urgencyMedium
                                : t.urgencyLow}
                          </span>
                        </div>
                      )}

                      {/* Content text parsed as standard paragraphs/lists */}
                      <div className="text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line text-left">
                        {msg.text}
                      </div>

                      {/* Dynamic CTA buttons inside AI message bubble */}
                      {isAi && msg.actions && msg.actions.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left">
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                            Quick Healthcare Actions
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => handleActionClick(act)}
                                className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:text-sky-700 rounded-xl text-xs font-bold border border-slate-200/80 dark:border-slate-700/80 hover:border-sky-500/35 transition-all flex items-center space-x-1 cursor-pointer"
                              >
                                <span>{act.label}</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Timestamp */}
                    <div
                      className={`text-[10px] text-slate-400 dark:text-slate-500 font-semibold px-2 ${
                        isAi ? "text-left" : "text-right"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Simulated Thinking / Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 sm:space-x-4 animate-fade-in text-left">
                <div className="p-2.5 rounded-2xl bgl-to-r from-sky-500 to-emerald-500 text-white shrink-0 shadow-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl rounded-tl-none p-4 w-28 flex items-center justify-center space-x-1.5 shadow-sm">
                  <div className="h-2 w-2 bg-sky-500 rounded-full typing-dot"></div>
                  <div className="h-2 w-2 bg-sky-500 rounded-full typing-dot"></div>
                  <div className="h-2 w-2 bg-sky-500 rounded-full typing-dot"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggestion Chips and Input Tray */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Suggestion Chips (only display when there are few user messages in conversation) */}
            {activeChat?.messages.length <= 2 && !isTyping && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left flex items-center">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 mr-1 animate-pulse" />
                  Try a quick symptom checker or medical guide chip
                </p>
                <div className="flex flex-wrap gap-2 text-left">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(sug.query)}
                      className="px-3.5 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about headache, pregnancy care, find a nearby hospital..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-xs sm:text-sm font-semibold transition-all dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-3.5 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 rounded-2xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/25 transition-all cursor-pointer shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
