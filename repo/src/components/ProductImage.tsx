'use client';

interface ProductImageProps {
  name: string;
  className?: string;
}

export default function ProductImage({ name, className = '' }: ProductImageProps) {
  // Generate a consistent color based on product name
  const getColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
  };

  const bgColor = getColor(name);
  const initial = name.charAt(0);

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-white text-4xl font-bold">{initial}</span>
    </div>
  );
}
