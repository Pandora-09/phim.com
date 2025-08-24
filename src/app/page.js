import HeroSlider from "../components/HeroSlider";
import MovieCard from "../components/MovieCard";
import Link from "next/link";

async function getMovies(category, limit = 12) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/${category}?page=1`,
    {
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data?.data?.items?.slice(0, limit) || [];
}

export async function generateMetadata() {
  return {
    title: "Xem Phim Online HD Miễn Phí - Phim Mới Nhất 2024 Vietsub",
    description:
      "Xem phim online chất lượng HD miễn phí. Cập nhật phim mới nhất 2024, phim bộ, phim lẻ, hoạt hình với phụ đề Vietsub chuẩn.",
    keywords:
      "xem phim online, phim mới 2024, phim HD, phim vietsub, phim bộ, phim lẻ",
  };
}

function Section({ title, movies, viewAllLink }) {
  return (
    <section className="bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link
          href={viewAllLink}
          className="text-gray-300 hover:text-white font-medium transition-colors"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [
    phimMoi,
    phimBo,
    phimLe,
    hoatHinh,
    phimChieuRap,
    tvShows,
    phimSapChieu,
  ] = await Promise.all([
    getMovies("phim-moi-cap-nhat", 12),
    getMovies("phim-bo", 12),
    getMovies("phim-le", 12),
    getMovies("hoat-hinh", 12),
    getMovies("phim-chieu-rap", 12),
    getMovies("tv-shows", 12),
    getMovies("phim-sap-chieu", 24),
  ]);

  return (
    <main className="bg-gray-900">
      {/* Hero Slider */}
      <HeroSlider movies={phimSapChieu} />

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-400">1000+</div>
            <div className="text-sm text-gray-400">Phim Mới</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-400">500+</div>
            <div className="text-sm text-gray-400">Phim Bộ</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-400">HD</div>
            <div className="text-sm text-gray-400">Chất Lượng</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-gray-400">Cập Nhật</div>
          </div>
        </section>

        {/* Movie Sections */}
        <Section
          title="🔥 Phim Mới Cập Nhật"
          movies={phimMoi}
          viewAllLink="/phim-moi"
        />

        <Section
          title="📺 Phim Bộ Hot"
          movies={phimBo}
          viewAllLink="/phim-bo"
        />

        <Section
          title="🎥 Phim Lẻ Hay"
          movies={phimLe}
          viewAllLink="/phim-le"
        />

        <Section
          title="🎨 Phim Hoạt Hình"
          movies={hoatHinh}
          viewAllLink="/hoat-hinh"
        />

        <Section
          title="🎭 Phim Chiếu Rạp"
          movies={phimChieuRap}
          viewAllLink="/phim-chieu-rap"
        />

        <Section title="📡 TV Shows" movies={tvShows} viewAllLink="/tv-shows" />
      </div>
    </main>
  );
}
