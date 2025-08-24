import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black light:bg-gray-900 text-white mt-16 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">🎬 Xem Phim Online</h3>
            <p className="text-gray-400 text-sm">
              Trang web xem phim online miễn phí với kho phim khổng lồ, 
              chất lượng HD, cập nhật liên tục.
            </p>
          </div>

          {/* Thể Loại */}
          <div>
            <h4 className="font-semibold mb-4">Thể Loại</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phim-bo" className="text-gray-400 hover:text-white">Phim Bộ</Link></li>
              <li><Link href="/phim-le" className="text-gray-400 hover:text-white">Phim Lẻ</Link></li>
              <li><Link href="/hoat-hinh" className="text-gray-400 hover:text-white">Hoạt Hình</Link></li>
              <li><Link href="/tv-shows" className="text-gray-400 hover:text-white">TV Shows</Link></li>
            </ul>
          </div>

          {/* Danh Mục */}
          <div>
            <h4 className="font-semibold mb-4">Danh Mục</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phim-moi" className="text-gray-400 hover:text-white">Phim Mới</Link></li>
              <li><Link href="/phim-chieu-rap" className="text-gray-400 hover:text-white">Phim Chiếu Rạp</Link></li>
              <li><Link href="/phim-vietsub" className="text-gray-400 hover:text-white">Phim Vietsub</Link></li>
              <li><Link href="/phim-thuyet-minh" className="text-gray-400 hover:text-white">Phim Thuyết Minh</Link></li>
            </ul>
          </div>

          {/* Liên Kết */}
          <div>
            <h4 className="font-semibold mb-4">Liên Kết</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/phim-sap-chieu" className="text-gray-400 hover:text-white">Phim Sắp Chiếu</Link></li>
              <li><Link href="/phim-bo-dang-chieu" className="text-gray-400 hover:text-white">Phim Đang Chiếu</Link></li>
              <li><Link href="/phim-bo-hoan-thanh" className="text-gray-400 hover:text-white">Phim Hoàn Thành</Link></li>
              <li><Link href="/subteam" className="text-gray-400 hover:text-white">Subteam</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Xem Phim Online. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Chất lượng HD</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Miễn phí</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Cập nhật 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}