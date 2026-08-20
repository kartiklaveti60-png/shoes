import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
  xp: number;
  tier: 'GHOST' | 'SHADOW' | 'TITAN' | 'LEGEND';
  coins: number;
  badges: string[];
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  login: (user, token) => set({ user, token, isAuthenticated: true, isAuthModalOpen: false }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  addXP: (amount) => set((state) => {
    if (!state.user) return state;
    const newXP = state.user.xp + amount;
    let newTier = state.user.tier;
    if (newXP > 2500) newTier = 'LEGEND';
    else if (newXP > 1000) newTier = 'TITAN';
    else if (newXP > 400) newTier = 'SHADOW';

    return {
      user: { ...state.user, xp: newXP, tier: newTier }
    };
  })
}));
