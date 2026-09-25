import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getOrCreateLearnerId } from '../api';

const LearnerContext = createContext();

export function LearnerProvider({ children }) {
  const [learnerId, setLearnerId] = useState(getOrCreateLearnerId());
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('deltax_theme') || 'dark');

  // Load dashboard and learner info
  const refreshDashboard = async () => {
    try {
      const data = await api.getDashboard();
      setDashboard(data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, [learnerId]);

  // Handle theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('deltax_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setAnonymousId = (newId) => {
    localStorage.setItem('deltax_learner_id', newId);
    setLearnerId(newId);
  };

  return (
    <LearnerContext.Provider
      value={{
        learnerId,
        setAnonymousId,
        dashboard,
        refreshDashboard,
        loading,
        theme,
        toggleTheme
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error('useLearner must be used within a LearnerProvider');
  }
  return context;
}
