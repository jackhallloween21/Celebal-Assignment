import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Check localStorage or system preference
    return localStorage.getItem('theme') === 'dark' ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggleTheme = () => setDark(d => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <div className="font-sans text-gray-800 dark:text-gray-100">{children}</div>
    </ThemeContext.Provider>
  );
}