'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingCartIcon,
  PackageIcon,
  ArrowRightIcon,
  CheckIcon
} from '@/components/icons';
import ProductImage from '@/components/ProductImage';

export default function CartPage() {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    createOrder
  } = useShop();
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: ''
  });

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const order = createOrder(cart, customerInfo);
    setOrderId(order.id);
    setOrderSuccess(true);
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckIcon className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">订单提交成功！</h1>
        <p className="text-gray-600 mb-2">订单编号: <span className="font-mono font-medium">{orderId}</span></p>
        <p className="text-gray-600 mb-8">我们会尽快处理您的订单，请保持电话畅通。</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            继续购物
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            查看订单
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">购物车是空的</h1>
        <p className="text-gray-600 mb-8">快去挑选心仪的商品吧！</p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PackageIcon className="w-5 h-5 mr-2" />
          去购物
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">购物车</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-gray-600">共 {cart.length} 件商品</span>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <TrashIcon className="w-4 h-4" />
                清空购物车
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 flex gap-4">
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`} className="shrink-0">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      <ProductImage name={item.product.name} className="w-full h-full" />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-gray-900 truncate hover:text-indigo-600">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.product.tags.slice(0, 2).join(', ')}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1.5 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ¥{item.product.price * item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          ¥{item.product.price} / 件
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">订单 summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>商品小计</span>
                <span>¥{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>运费</span>
                <span className="text-green-600">免运费</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>合计</span>
                  <span className="text-indigo-600">¥{getCartTotal()}</span>
                </div>
              </div>
            </div>

            {!showCheckoutForm ? (
              <button
                onClick={() => setShowCheckoutForm(true)}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                去结算
              </button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    收货人姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.customerName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    手机号码 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.customerPhone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入手机号"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    value={customerInfo.customerEmail}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="请输入邮箱（选填）"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    收货地址 *
                  </label>
                  <textarea
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="请输入详细地址"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    返回
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    提交订单
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
