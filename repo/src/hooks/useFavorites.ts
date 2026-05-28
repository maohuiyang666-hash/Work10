'use client';

import { useCallback } from 'react';
import { Product, FavoriteItem } from '@/types';
import { useLocalStorage } from './useLocalStorage';

const FAVORITES_KEY = 'boardgame-shop-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(FAVORITES_KEY, []);

  const addToFavorites = useCallback((product: Product) => {
    setFavorites(prev => {
      if (prev.some(item => item.product.id === product.id)) {
        return prev;
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, [setFavorites]);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites(prev => prev.filter(item => item.product.id !== productId));
  }, [setFavorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.product.id === product.id);
      if (exists) {
        return prev.filter(item => item.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, [setFavorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some(item => item.product.id === productId);
  }, [favorites]);

  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isFavorite,
    getFavoritesCount
  };
}
