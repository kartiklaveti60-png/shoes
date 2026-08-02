import { create } from 'zustand';

export interface CartItem {
  id: string; // product id + size + color
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  discountPercent: number;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
  
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    {
      id: 'prod_cyber_x-US 10-Stealth Obsidian',
      productId: 'prod_cyber_x',
      name: "Air Jordan 1 Game-Worn",
      slug: 'air-jordan-1-game-worn',
      price: 560000,
      image: '/images/air-jordan-1-game-worn.jpg',
      size: 'US 10',
      color: 'Stealth Obsidian',
      quantity: 1
    }
  ],
  isOpen: false,
  couponCode: null,
  discountPercent: 0,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (newItem) => set((state) => {
    const itemId = `${newItem.productId}-${newItem.size}-${newItem.color}`;
    const existingIndex = state.items.findIndex(i => i.id === itemId);

    if (existingIndex > -1) {
      const updated = [...state.items];
      updated[existingIndex].quantity += newItem.quantity;
      return { items: updated, isOpen: true };
    }

    return {
      items: [...state.items, { ...newItem, id: itemId }],
      isOpen: true
    };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    })
  })),

  applyCoupon: (code) => {
    if (code.toUpperCase() === 'FUTURE15' || code.toUpperCase() === 'SOLEVIP') {
      set({ couponCode: code.toUpperCase(), discountPercent: 15 });
      return true;
    }
    return false;
  },

  clearCart: () => set({ items: [], couponCode: null, discountPercent: 0 }),

  getSubtotal: () => {
    return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = (subtotal * get().discountPercent) / 100;
    return Math.max(0, subtotal - discount);
  }
}));
