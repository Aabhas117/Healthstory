import { create } from '../lib/zustand.js';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('ayudrishti_theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
};

const applyThemeToDOM = (theme) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

const initialTheme = getInitialTheme();
applyThemeToDOM(initialTheme);

export const useThemeStore = create((set) => ({
  theme: initialTheme,

  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('ayudrishti_theme', newTheme);
    }
    applyThemeToDOM(newTheme);
    return { theme: newTheme };
  }),

  setTheme: (newTheme) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ayudrishti_theme', newTheme);
    }
    applyThemeToDOM(newTheme);
    return { theme: newTheme };
  })
}));
