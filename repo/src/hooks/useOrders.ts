'use client';

import { useCallback } from 'react';
import { Order, CartItem } from '@/types';
import { useLocalStorage } from './useLocalStorage';

const ORDERS_KEY = 'boardgame-shop-orders';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage<Order[]>(ORDERS_KEY, []);

  const createOrder = useCallback((items: CartItem[], customerInfo: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
  }) => {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...customerInfo
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [setOrders]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, [setOrders]);

  const cancelOrder = useCallback((orderId: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
  }, [setOrders]);

  const deleteOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, [setOrders]);

  const getOrderById = useCallback((orderId: string) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const getOrdersByStatus = useCallback((status: Order['status']) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const clearAllOrders = useCallback(() => {
    setOrders([]);
  }, [setOrders]);

  return {
    orders,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    getOrderById,
    getOrdersByStatus,
    clearAllOrders
  };
}
