import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "小众桌游配件商店 - 专业桌游配件",
  description: "精选骰子、卡牌配件、代币标记、桌游垫等专业桌游配件",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <ShopProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-4">关于我们</h4>
                  <p className="text-sm">小众桌游配件商店致力于为桌游爱好者提供高品质的配件产品。</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">联系方式</h4>
                  <p className="text-sm">邮箱: support@boardgame-shop.com</p>
                  <p className="text-sm">电话: 400-123-4567</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">快速链接</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/products" className="hover:text-white">全部商品</a></li>
                    <li><a href="/cart" className="hover:text-white">购物车</a></li>
                    <li><a href="/admin" className="hover:text-white">后台管理</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                <p>&copy; 2024 小众桌游配件商店. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ShopProvider>
      </body>
    </html>
  );
}
