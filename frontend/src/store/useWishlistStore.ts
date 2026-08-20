import { create } from 'zustand';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: [],

  toggleWishlist: (productId) => set((state) => {
    const exists = state.wishlistIds.includes(productId);
    return {
      wishlistIds: exists
        ? state.wishlistIds.filter(id => id !== productId)
        : [...state.wishlistIds, productId]
    };
  }),

  isInWishlist: (productId) => {
    return get().wishlistIds.includes(productId);
  }
}));
