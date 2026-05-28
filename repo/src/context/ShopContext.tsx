'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useOrders } from '@/hooks/useOrders';
import { Product, CartItem, FavoriteItem, Order } from '@/types';

interface ShopContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string) => boolean;

  // Favorites
  favorites: FavoriteItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
  isFavorite: (productId: string) => boolean;
  getFavoritesCount: () => number;

  // Orders
  orders: Order[];
  createOrder: (items: CartItem[], customerInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  clearAllOrders: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();
  const favoritesHook = useFavorites();
  const ordersHook = useOrders();

  const value: ShopContextType = {
    // Cart
    cart: cartHook.cart,
    addToCart: cartHook.addToCart,
    removeFromCart: cartHook.removeFromCart,
    updateCartQuantity: cartHook.updateQuantity,
    clearCart: cartHook.clearCart,
    getCartTotal: cartHook.getCartTotal,
    getCartCount: cartHook.getCartCount,
    isInCart: cartHook.isInCart,

    // Favorites
    favorites: favoritesHook.favorites,
    addToFavorites: favoritesHook.addToFavorites,
    removeFromFavorites: favoritesHook.removeFromFavorites,
    toggleFavorite: favoritesHook.toggleFavorite,
    clearFavorites: favoritesHook.clearFavorites,
    isFavorite: favoritesHook.isFavorite,
    getFavoritesCount: favoritesHook.getFavoritesCount,

    // Orders
    orders: ordersHook.orders,
    createOrder: ordersHook.createOrder,
    updateOrderStatus: ordersHook.updateOrderStatus,
    cancelOrder: ordersHook.cancelOrder,
    deleteOrder: ordersHook.deleteOrder,
    getOrderById: ordersHook.getOrderById,
    getOrdersByStatus: ordersHook.getOrdersByStatus,
    clearAllOrders: ordersHook.clearAllOrders
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
