import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'vip';
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
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  addXP: (amount: number) => void;
}

const initialUser: UserProfile = {
  id: 'usr_titan_alex',
  name: 'Alex Mercer',
  email: 'alex.mercer@future.sole',
  role: 'vip',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  xp: 1450,
  tier: 'TITAN',
  coins: 480,
  badges: ['EARLY_ADOPTER', 'SNEAKERHEAD_SUPREME', 'TOP_STYLIST']
};

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  token: 'mock_jwt_token_2026',
  isAuthenticated: true,

  login: (user, token) => set({ user, token, isAuthenticated: true }),
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
