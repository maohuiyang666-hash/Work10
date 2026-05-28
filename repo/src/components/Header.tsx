'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  SearchIcon, 
  MenuIcon, 
  XIcon,
  AdminIcon,
  HomeIcon,
  PackageIcon
} from './icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount, getFavoritesCount } = useShop();

  const cartCount = getCartCount();
  const favoritesCount = getFavoritesCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <PackageIcon className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">桌游配件铺</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
              首页
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-indigo-600 font-medium">
              全部商品
            </Link>
            <Link href="/products?category=dice" className="text-gray-700 hover:text-indigo-600 font-medium">
              骰子
            </Link>
            <Link href="/products?category=cards" className="text-gray-700 hover:text-indigo-600 font-medium">
              卡牌配件
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="relative p-2 text-gray-700 hover:text-indigo-600">
              <HeartIcon className="h-6 w-6" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/admin" className="hidden md:flex p-2 text-gray-700 hover:text-indigo-600">
              <AdminIcon className="h-6 w-6" />
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索商品..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="h-5 w-5" />
                <span>首页</span>
              </Link>
              <Link 
                href="/products" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <PackageIcon className="h-5 w-5" />
                <span>全部商品</span>
              </Link>
              <Link 
                href="/favorites" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <HeartIcon className="h-5 w-5" />
                <span>收藏 ({favoritesCount})</span>
              </Link>
              <Link 
                href="/cart" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                <span>购物车 ({cartCount})</span>
              </Link>
              <Link 
                href="/admin" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <AdminIcon className="h-5 w-5" />
                <span>后台管理</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
