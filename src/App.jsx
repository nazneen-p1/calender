import React, { createContext, useContext, useState, useEffect } from 'react';
import Calendar from './components/Calendar';

export const ThemeContext = createContext({ isDark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('cal_theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    try { localStorage.setItem('cal_theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      <div className="app-root">
        <Calendar />
      </div>
    </ThemeContext.Provider>
  );
}
