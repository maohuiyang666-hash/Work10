'use client';

import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { HeartIcon, ShoppingCartIcon, TrashIcon, PackageIcon } from '@/components/icons';
import ProductImage from '@/components/ProductImage';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, clearFavorites, addToCart, isInCart } = useShop();

  if (favorites.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <HeartIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">暂无收藏商品</h1>
        <p className="text-gray-600 mb-8">点击商品上的爱心图标添加到收藏夹</p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PackageIcon className="w-5 h-5 mr-2" />
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">我的收藏</h1>
          <p className="text-gray-600 mt-1">共 {favorites.length} 件商品</p>
        </div>
        <button
          onClick={clearFavorites}
          className="text-red-600 hover:text-red-700 flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <TrashIcon className="w-5 h-5" />
          清空收藏
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((item) => {
          const inCart = isInCart(item.product.id);
          return (
            <div key={item.product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              {/* Image */}
              <Link href={`/products/${item.product.id}`} className="block relative">
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <ProductImage name={item.product.name} className="w-full h-full" />
                  {item.product.isNew && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                      新品
                    </span>
                  )}
                  {item.product.originalPrice && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      优惠
                    </span>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link href={`/products/${item.product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-indigo-600 transition-colors">
                    {item.product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-indigo-600">
                    ¥{item.product.price}
                  </span>
                  {item.product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ¥{item.product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock */}
                <p className={`text-sm mb-3 ${item.product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
                  {item.product.stock > 0 ? `库存: ${item.product.stock} 件` : '暂时缺货'}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.product, 1)}
                    disabled={item.product.stock === 0 || inCart}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingCartIcon className="w-4 h-4" />
                    {inCart ? '已在购物车' : '加入购物车'}
                  </button>
                  <button
                    onClick={() => removeFromFavorites(item.product.id)}
                    className="p-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <HeartIcon className="w-5 h-5" filled />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
