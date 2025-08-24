"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const menuItems = [
    { href: "/", label: "🏠 Trang Chủ" },
    { href: "/phim-moi", label: "🔥 Phim Mới" },
    { href: "/phim-bo", label: "📺 Phim Bộ" },
    { href: "/phim-le", label: "🎬 Phim Lẻ" },
    { href: "/tv-shows", label: "📡 TV Shows" },
    { href: "/hoat-hinh", label: "🎨 Hoạt Hình" },
    { href: "/phim-vietsub", label: "🇻🇳 Vietsub" },
    { href: "/phim-thuyet-minh", label: "🎙️ Thuyết Minh" },
    { href: "/phim-long-tien", label: "🔊 Lồng Tiếng" },
    { href: "/phim-chieu-rap", label: "🎭 Chiếu Rạp" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold text-white">Xem Phim Online</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 border border-white/20"
              />
            </form>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 shadow-2xl transform transition-transform duration-300 z-50 ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold text-white">Menu</span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center py-3 px-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}