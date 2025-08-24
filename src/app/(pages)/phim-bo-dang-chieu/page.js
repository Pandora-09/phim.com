import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-bo-dang-chieu?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Bộ Đang Chiếu 2024 - Xem Phim Bộ Mới Nhất Đang Phát Sóng",
    description:
      "Xem phim bộ đang chiếu mới nhất 2024. Theo dõi các series phim bộ hot đang được phát sóng với cập nhật tập mới liên tục.",
    keywords:
      "phim bộ đang chiếu, phim bộ mới, series đang phát sóng, phim bộ hot",
  };
}

export default async function PhimBoDangChieuPage({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const data = await getMovies(page);

  if (!data?.data?.items) {
    return <div className="text-white">Không thể tải dữ liệu</div>;
  }

  const movies = data.data.items;
  const pagination = data.data.params.pagination;

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Phim Bộ Đang Chiếu 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Theo dõi các series phim bộ hot đang được phát sóng với cập nhật tập
            mới liên tục hàng tuần.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-lime-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Đang chiếu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">LIVE</div>
                <div className="text-sm text-gray-400">Phát sóng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">📺</div>
                <div className="text-sm text-gray-400">Series</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                badges={[
                  {
                    text: "ĐANG CHIẾU",
                    className: "bg-lime-500 animate-pulse",
                  },
                ]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-bo-dang-chieu"
          />
        </section>
      </div>
    </main>
  );
}
