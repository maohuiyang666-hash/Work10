'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useShop } from '@/context/ShopContext';
import { HeartIcon, ShoppingCartIcon, StarIcon, SparklesIcon, FireIcon } from './icons';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite, addToCart } = useShop();
  const favorite = isFavorite(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          <ProductImage name={product.name} className="w-full h-full" />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                <SparklesIcon className="w-3 h-3 mr-1" />
                新品
              </span>
            )}
            {product.originalPrice && (
              <span className="inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                <FireIcon className="w-3 h-3 mr-1" />
                优惠
              </span>
            )}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <HeartIcon 
              className={`w-5 h-5 ${favorite ? 'text-red-500' : 'text-gray-400'}`} 
              filled={favorite}
            />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                filled={i < Math.floor(product.rating)}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-indigo-600">
              ¥{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ¥{product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Stock */}
        {product.stock < 10 && product.stock > 0 && (
          <p className="mt-2 text-xs text-orange-600">
            仅剩 {product.stock} 件
          </p>
        )}
        {product.stock === 0 && (
          <p className="mt-2 text-xs text-red-600">
            暂时缺货
          </p>
        )}
      </div>
    </div>
  );
}
