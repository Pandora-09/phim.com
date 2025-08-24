import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(category, page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/${category}?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Lẻ Hay Nhất 2024 - Xem Phim Lẻ HD Vietsub Miễn Phí",
    description:
      "Xem phim lẻ mới nhất 2024 chất lượng HD Vietsub. Tuyển tập các bộ phim lẻ hay nhất từ Hollywood, Hàn Quốc, Trung Quốc.",
    keywords: "phim lẻ, phim lẻ hay, phim lẻ mới, phim lẻ HD, phim lẻ vietsub",
  };
}

export default async function PhimLePage({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const data = await getMovies("phim-le", page);

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
            Phim Lẻ Hay Nhất 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tuyển tập các bộ phim lẻ hay nhất từ Hollywood, Hàn Quốc, Trung Quốc
            với chất lượng HD Vietsub miễn phí.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Tổng phim</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  {pagination.totalPages}
                </div>
                <div className="text-sm text-gray-400">Trang</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">HD</div>
                <div className="text-sm text-gray-400">Chất lượng</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-le"
          />
        </section>
      </div>
    </main>
  );
}
