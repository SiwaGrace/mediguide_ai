import React, { createContext, useState, useEffect } from 'react';
import { languagePacks } from '../data/languagePacks';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Client-Side Routing
  const [activePage, setActivePage] = useState('landing');
  
  // State for passing category filter to Health Education
  const [educationCategory, setEducationCategory] = useState(null);

  // 2. Theme (Light/Dark)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('mediTheme');
    return saved || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mediTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Language Selector
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('mediLang');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('mediLang', language);
  }, [language]);

  const t = languagePacks[language] || languagePacks.en;

  // 4. Medication Reminders Mock Initial State & Actions
  const [reminders, setReminders] = useState([
    {
      id: 'rem-1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Daily',
      time: '08:00 AM',
      taken: false,
      color: 'rose', // matches hypertension theme
      condition: 'Hypertension'
    },
    {
      id: 'rem-2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00 PM',
      taken: true,
      color: 'amber', // matches diabetes theme
      condition: 'Diabetes'
    },
    {
      id: 'rem-3',
      name: 'Prenatal Multivitamin',
      dosage: '1 Tablet',
      frequency: 'Daily',
      time: '01:00 PM',
      taken: true,
      color: 'blue', // matches pregnancy theme
      condition: 'Pregnancy'
    }
  ]);

  const addReminder = (newRem) => {
    const reminder = {
      id: `rem-${Date.now()}`,
      taken: false,
      ...newRem
    };
    setReminders((prev) => [reminder, ...prev]);
  };

  const toggleReminderCompletion = (id) => {
    setReminders((prev) =>
      prev.map((rem) => (rem.id === id ? { ...rem, taken: !rem.taken } : rem))
    );
  };

  const deleteReminder = (id) => {
    setReminders((prev) => prev.filter((rem) => rem.id !== id));
  };

  // 5. ChatGPT-style Chat History and Sessions
  const [chats, setChats] = useState([
    {
      id: 'chat-session-1',
      title: 'Symptom Check: Dull headache',
      timestamp: '10:15 AM',
      messages: [
        { sender: 'user', text: 'I have a dull headache that won\'t go away.', timestamp: '10:14 AM' },
        {
          sender: 'ai',
          text: 'A dull headache can be triggered by stress, dehydration, lack of sleep, or screen strain.\n\nTry drinking a large glass of water, resting in a quiet, dark room, or applying a cool compress to your forehead. Let me know if the pain becomes sudden or severe.',
          urgency: 'Low',
          timestamp: '10:15 AM'
        }
      ]
    },
    {
      id: 'chat-session-2',
      title: 'Explaining Hypertension numbers',
      timestamp: 'Yesterday',
      messages: [
        { sender: 'user', text: 'What does 140/90 blood pressure mean?', timestamp: 'Yesterday' },
        {
          sender: 'ai',
          text: 'A reading of 140/90 mmHg is classified as Stage 2 Hypertension.\n\nThis means the force of your blood flow is high, which increases strain on your blood vessels. I highly recommend logging your pressure daily and scheduling an outpatient checkup with a physician at a nearby clinic.',
          urgency: 'Medium',
          timestamp: 'Yesterday'
        }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState('chat-session-1');

  const createNewChat = (initialText = null, initialAiResponse = null) => {
    const newId = `chat-session-${Date.now()}`;
    const initialMessages = [];
    
    if (initialText && initialAiResponse) {
      initialMessages.push(
        { sender: 'user', text: initialText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        {
          sender: 'ai',
          text: initialAiResponse.text,
          urgency: initialAiResponse.urgency,
          actions: initialAiResponse.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      );
    } else {
      initialMessages.push({
        sender: 'ai',
        text: 'Hello! I am your MediGuide AI healthcare access assistant.\n\nHow can I help you understand your symptoms, assess urgency, or find clinics today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    const newChatObj = {
      id: newId,
      title: initialText ? (initialText.length > 25 ? initialText.substring(0, 25) + '...' : initialText) : 'New Conversation',
      timestamp: 'Just now',
      messages: initialMessages
    };

    setChats((prev) => [newChatObj, ...prev]);
    setActiveChatId(newId);
    setActivePage('chat');
  };

  const addMessageToActiveChat = (sender, text, extraProps = {}) => {
    setChats((prevChats) =>
      prevChats.map((c) => {
        if (c.id === activeChatId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newMessages = [...c.messages, { sender, text, timestamp, ...extraProps }];
          let updatedTitle = c.title;
          
          // Auto-update default title from first user message
          if (c.title === 'New Conversation' && sender === 'user') {
            updatedTitle = text.length > 25 ? text.substring(0, 25) + '...' : text;
          }
          
          return {
            ...c,
            title: updatedTitle,
            timestamp: 'Just now',
            messages: newMessages
          };
        }
        return c;
      })
    );
  };

  const deleteChatSession = (id, e) => {
    e.stopPropagation();
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) {
      const remaining = chats.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        setActiveChatId(remaining[0].id);
      } else {
        // Fallback: Create a blank chat
        const fallbackId = `chat-session-${Date.now()}`;
        setChats([
          {
            id: fallbackId,
            title: 'New Conversation',
            timestamp: 'Just now',
            messages: [
              {
                sender: 'ai',
                text: 'Hello! I am your MediGuide AI healthcare access assistant. How can I help you today?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          }
        ]);
        setActiveChatId(fallbackId);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        educationCategory,
        setEducationCategory,
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        reminders,
        addReminder,
        toggleReminderCompletion,
        deleteReminder,
        chats,
        activeChatId,
        setActiveChatId,
        createNewChat,
        addMessageToActiveChat,
        deleteChatSession
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
