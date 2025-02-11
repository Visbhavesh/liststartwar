import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  login: (email, password) => {
    
    if (email === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      set({ isAuthenticated: true });
    } else {
      alert('Invalid email or password');
    }
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false });
  },
}));