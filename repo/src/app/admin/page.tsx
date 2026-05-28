'use client';

import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { Order } from '@/types';
import { 
  PackageIcon, 
  ShoppingCartIcon, 
  HeartIcon, 
  RefreshIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
  TrashIcon,
  ChevronDownIcon
} from '@/components/icons';

const statusMap: { [key: string]: { label: string; color: string } } = {
  pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: '处理中', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: '已完成', color: 'bg-green-100 text-green-800' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-800' },
};

export default function AdminPage() {
  const { 
    orders, 
    cart, 
    favorites, 
    updateOrderStatus, 
    cancelOrder, 
    deleteOrder, 
    clearAllOrders,
    clearCart,
    clearFavorites
  } = useShop();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'data'>('overview');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === selectedStatus);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0),
    cartItems: cart.reduce((sum, item) => sum + item.quantity, 0),
    favoritesCount: favorites.length,
  };

  const exportData = () => {
    const data = {
      orders,
      cart,
      favorites,
      exportTime: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shop-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    if (confirm('确定要重置所有数据吗？这将清空所有订单、购物车和收藏数据。')) {
      clearAllOrders();
      clearCart();
      clearFavorites();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">后台管理</h1>
        <div className="flex gap-2">
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            导出数据
          </button>
          <button
            onClick={resetAllData}
            className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <RefreshIcon className="w-5 h-5" />
            重置数据
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b">
        {[
          { id: 'overview', label: '概览', icon: PackageIcon },
          { id: 'orders', label: '订单管理', icon: ShoppingCartIcon },
          { id: 'data', label: '数据管理', icon: RefreshIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总订单数</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <PackageIcon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">待处理订单</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCartIcon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">总销售额</p>
                  <p className="text-3xl font-bold text-green-600">¥{stats.totalRevenue}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">购物车商品</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.cartItems}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
            </div>
            {orders.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">¥{order.total}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusMap[order.status].color}`}>
                        {statusMap[order.status].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                暂无订单数据
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700">状态筛选:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部</option>
              <option value="pending">待处理</option>
              <option value="processing">处理中</option>
              <option value="shipped">已发货</option>
              <option value="delivered">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredOrders.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString('zh-CN')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${statusMap[order.status].color}`}>
                        {statusMap[order.status].label}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">收货人:</span> {order.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">电话:</span> {order.customerPhone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">地址:</span> {order.address}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">商品清单:</p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            {item.product.name} x {item.quantity} = ¥{item.product.price * item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-lg font-bold text-indigo-600">合计: ¥{order.total}</p>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              开始处理
                            </button>
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1.5 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50"
                            >
                              取消
                            </button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                          >
                            标记发货
                          </button>
                        )}
                        {order.status === 'shipped' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                          >
                            标记完成
                          </button>
                        )}
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="px-3 py-1.5 text-gray-400 hover:text-red-600"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                暂无符合条件的订单
              </div>
            )}
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">数据管理</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">订单数据</p>
                  <p className="text-sm text-gray-600">共 {orders.length} 条订单记录</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('确定要清空所有订单吗？')) clearAllOrders();
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  清空订单
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">购物车数据</p>
                  <p className="text-sm text-gray-600">共 {cart.length} 件商品</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('确定要清空购物车吗？')) clearCart();
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  清空购物车
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">收藏数据</p>
                  <p className="text-sm text-gray-600">共 {favorites.length} 件收藏</p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('确定要清空所有收藏吗？')) clearFavorites();
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  清空收藏
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">数据导入/导出</h2>
            <div className="flex gap-4">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <DownloadIcon className="w-5 h-5" />
                导出所有数据
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              导出的数据包含订单、购物车和收藏信息，可用于备份或迁移。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
