'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductById, products } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon, 
  PlusIcon, 
  MinusIcon,
  ArrowRightIcon,
  CheckIcon,
  ExclamationIcon
} from '@/components/icons';
import ProductCard from '@/components/ProductCard';
import ProductImage from '@/components/ProductImage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const product = getProductById(id);
  const { addToCart, toggleFavorite, isFavorite, cart } = useShop();
  
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <ExclamationIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">商品不存在</h1>
        <p className="text-gray-600 mb-8">抱歉，您查找的商品不存在或已被下架。</p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          返回商品列表
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  // Get related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addToCart(product, quantity);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-indigo-600">首页</Link>
        <ArrowRightIcon className="w-4 h-4 mx-2" />
        <Link href="/products" className="hover:text-indigo-600">全部商品</Link>
        <ArrowRightIcon className="w-4 h-4 mx-2" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
            <ProductImage name={product.name} className="w-full h-full" />
            {product.isNew && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                新品
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  filled={i < Math.floor(product.rating)}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviewCount} 条评价)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-indigo-600">
              ¥{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ¥{product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stock */}
          <div className="mb-6">
            <span className="text-gray-600">库存: </span>
            <span className={`font-medium ${product.stock < 10 ? 'text-orange-600' : 'text-green-600'}`}>
              {product.stock > 0 ? `${product.stock} 件` : '暂时缺货'}
            </span>
            {cartQuantity > 0 && (
              <span className="ml-4 text-indigo-600">
                购物车中已有 {cartQuantity} 件
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gray-700 font-medium">数量:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon className="w-5 h-5" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {product.stock === 0 ? '暂时缺货' : '加入购物车'}
            </button>
            <button
              onClick={() => toggleFavorite(product)}
              className={`p-4 rounded-xl border-2 transition-colors ${
                favorite 
                  ? 'border-red-500 text-red-500 bg-red-50' 
                  : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
              }`}
            >
              <HeartIcon className="w-6 h-6" filled={favorite} />
            </button>
          </div>

          {/* Added Toast */}
          {showAddedToast && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
              <CheckIcon className="w-5 h-5" />
              已成功添加到购物车！
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">相关推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
