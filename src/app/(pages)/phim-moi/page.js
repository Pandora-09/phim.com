import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-moi-cap-nhat?page=${page}`,
    {
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Mới Cập Nhật 2024 - Xem Phim Mới Nhất HD Vietsub",
    description:
      "Xem phim mới cập nhật hàng ngày 2024. Tuyển tập các bộ phim mới nhất được cập nhật liên tục với chất lượng HD Vietsub miễn phí.",
    keywords:
      "phim mới, phim mới cập nhật, phim mới nhất, phim hot, phim trending",
  };
}

export default async function PhimMoiPage({ searchParams }) {
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
            Phim Mới Cập Nhật 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cập nhật liên tục các bộ phim mới nhất hàng ngày. Đón xem những tác
            phẩm điện ảnh hot nhất, trending nhất được yêu thích bởi hàng triệu
            khán giả trên toàn thế giới.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Phim mới</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-sm text-gray-400">Cập nhật</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">🔥</div>
                <div className="text-sm text-gray-400">Trending</div>
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
                badges={[{ text: "MỚI", className: "bg-green-500" }]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-moi"
          />
        </section>
      </div>
    </main>
  );
}
