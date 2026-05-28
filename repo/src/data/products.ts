import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'dice',
    name: '骰子',
    icon: 'Dice',
    description: '各种材质、样式的精美骰子'
  },
  {
    id: 'cards',
    name: '卡牌配件',
    icon: 'Cards',
    description: '卡套、卡盒、牌垫等卡牌保护配件'
  },
  {
    id: 'tokens',
    name: '代币标记',
    icon: 'Coins',
    description: '金属代币、木质标记、塑料筹码'
  },
  {
    id: 'mats',
    name: '桌游垫',
    icon: 'LayoutGrid',
    description: '游戏垫、牌垫、骰子垫'
  },
  {
    id: 'storage',
    name: '收纳盒',
    icon: 'Box',
    description: '游戏盒、收纳盒、卡盒'
  },
  {
    id: 'tools',
    name: '游戏工具',
    icon: 'Wrench',
    description: '计分器、沙漏、规则书套'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: '复古金属骰子套装',
    description: '一套7颗复古风格金属骰子，包含D4、D6、D8、D10、D12、D20和百分比骰子。采用锌合金材质，表面做旧处理，手感沉稳，适合龙与地下城等TRPG游戏。',
    price: 128,
    originalPrice: 158,
    category: 'dice',
    tags: ['金属', '复古', 'TRPG', 'DND'],
    image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?w=400&h=400&fit=crop',
    stock: 50,
    rating: 4.8,
    reviewCount: 126,
    isNew: false,
    isFeatured: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: '星空树脂骰子',
    description: '手工制作的树脂骰子，内含闪粉和星空效果，每颗都独一无二。透明树脂中漂浮着蓝色和紫色的星云效果，在光线下格外美丽。',
    price: 89,
    category: 'dice',
    tags: ['树脂', '手工', '星空', '独特'],
    image: 'https://images.unsplash.com/photo-1610890716171-6b1c9f2bd40c?w=400&h=400&fit=crop',
    stock: 30,
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
    isFeatured: true,
    createdAt: '2024-03-20'
  },
  {
    id: '3',
    name: '龙与地下城主题骰子塔',
    description: '精美的木质骰子塔，雕刻有龙与地下城经典元素。骰子从顶部放入，经过内部轨道随机翻滚后从底部出口掉出，确保投掷的随机性。',
    price: 268,
    category: 'tools',
    tags: ['木质', '骰子塔', 'DND', '雕刻'],
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=400&fit=crop',
    stock: 15,
    rating: 4.7,
    reviewCount: 45,
    isNew: false,
    isFeatured: true,
    createdAt: '2024-02-10'
  },
  {
    id: '4',
    name: '磨砂卡套 100张',
    description: '高品质磨砂卡套，保护您的珍贵卡牌免受磨损。适用于标准尺寸卡牌(63x88mm)，磨砂表面防反光，洗牌手感顺滑。',
    price: 35,
    originalPrice: 45,
    category: 'cards',
    tags: ['卡套', '保护', '磨砂', '标准尺寸'],
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=400&fit=crop',
    stock: 200,
    rating: 4.6,
    reviewCount: 312,
    isNew: false,
    isFeatured: false,
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    name: '金属金币代币套装',
    description: '50枚金属金币代币，包含不同面值和设计。适合各种桌游中的货币系统，手感真实，声音清脆，提升游戏体验。',
    price: 78,
    category: 'tokens',
    tags: ['金属', '代币', '金币', '50枚'],
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop',
    stock: 80,
    rating: 4.5,
    reviewCount: 67,
    isNew: false,
    isFeatured: true,
    createdAt: '2024-01-20'
  },
  {
    id: '6',
    name: '双面游戏垫 60x60cm',
    description: '高品质橡胶游戏垫，双面设计，一面为网格图案适合战棋游戏，另一面为纯色适合卡牌游戏。可卷起收纳，携带方便。',
    price: 158,
    category: 'mats',
    tags: ['游戏垫', '双面', '橡胶', '便携'],
    image: 'https://images.unsplash.com/photo-1563941402830-21612aa9387f?w=400&h=400&fit=crop',
    stock: 40,
    rating: 4.7,
    reviewCount: 98,
    isNew: false,
    isFeatured: false,
    createdAt: '2024-02-01'
  },
  {
    id: '7',
    name: '多功能桌游收纳盒',
    description: '大容量桌游收纳盒，内部可调节隔板，适应不同尺寸的游戏配件。透明盖子方便查看内容，坚固耐用。',
    price: 68,
    category: 'storage',
    tags: ['收纳盒', '多功能', '透明', '大容量'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    stock: 60,
    rating: 4.4,
    reviewCount: 56,
    isNew: true,
    isFeatured: false,
    createdAt: '2024-03-15'
  },
  {
    id: '8',
    name: '复古沙漏计时器套装',
    description: '包含30秒、1分钟、3分钟、5分钟四个沙漏，木质底座，玻璃计时器。适合各种需要计时的桌游，也是精美的桌面装饰。',
    price: 45,
    category: 'tools',
    tags: ['沙漏', '计时器', '木质', '套装'],
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop',
    stock: 100,
    rating: 4.6,
    reviewCount: 134,
    isNew: false,
    isFeatured: false,
    createdAt: '2024-01-10'
  },
  {
    id: '9',
    name: '彩虹渐变骰子套装',
    description: '7颗彩虹渐变色彩骰子，颜色鲜艳夺目。采用优质树脂材质，数字清晰易读，是收藏和实用的完美结合。',
    price: 56,
    category: 'dice',
    tags: ['彩虹', '渐变', '树脂', '彩色'],
    image: 'https://images.unsplash.com/photo-1596832842260-bb38c7d7b8a7?w=400&h=400&fit=crop',
    stock: 75,
    rating: 4.7,
    reviewCount: 203,
    isNew: true,
    isFeatured: true,
    createdAt: '2024-03-25'
  },
  {
    id: '10',
    name: '皮革卡盒 100+',
    description: '手工制作的皮革卡盒，可容纳100张以上卡牌。磁吸闭合，内部柔软衬里保护卡牌，外观复古优雅。',
    price: 88,
    originalPrice: 108,
    category: 'cards',
    tags: ['卡盒', '皮革', '手工', '磁吸'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
    stock: 35,
    rating: 4.8,
    reviewCount: 78,
    isNew: false,
    isFeatured: true,
    createdAt: '2024-02-20'
  },
  {
    id: '11',
    name: '木质资源标记套装',
    description: '200个木质资源标记，包含木材、石头、粮食、金币四种资源，每种50个。适合各种资源管理类桌游。',
    price: 42,
    category: 'tokens',
    tags: ['木质', '资源', '标记', '200个'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    stock: 120,
    rating: 4.5,
    reviewCount: 89,
    isNew: false,
    isFeatured: false,
    createdAt: '2024-01-25'
  },
  {
    id: '12',
    name: '定制图案牌垫',
    description: '可定制图案的橡胶牌垫，提供多种预设图案选择，也可上传自己的设计。60x35cm尺寸，适合大多数卡牌游戏。',
    price: 128,
    category: 'mats',
    tags: ['牌垫', '定制', '橡胶', '个性'],
    image: 'https://images.unsplash.com/photo-1563941402830-21612aa9387f?w=400&h=400&fit=crop',
    stock: 25,
    rating: 4.9,
    reviewCount: 34,
    isNew: true,
    isFeatured: false,
    createdAt: '2024-03-10'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
