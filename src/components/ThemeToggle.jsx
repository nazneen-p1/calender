import React from 'react';
import { useTheme } from '../App';
import '../styles/HeroPanel.css';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀ Light' : '☾ Dark'}
    </button>
  );
}
