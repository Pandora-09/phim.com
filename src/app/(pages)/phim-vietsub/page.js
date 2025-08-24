import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-vietsub?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Vietsub Hay Nhất 2024 - Xem Phim Phụ Đề Việt HD",
    description:
      "Xem phim Vietsub chất lượng HD miễn phí. Tuyển tập các bộ phim có phụ đề tiếng Việt chuẩn xác, dịch thuật chuyên nghiệp.",
    keywords: "phim vietsub, phụ đề việt, phim phụ đề, vietsub HD",
  };
}

export default async function PhimVietsubPage({ searchParams }) {
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
            Phim Vietsub Hay Nhất 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thưởng thức các bộ phim với phụ đề tiếng Việt chất lượng cao, dịch
            thuật chuẩn xác và đồng bộ hoàn hảo.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Tổng phim</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">
                  {pagination.totalPages}
                </div>
                <div className="text-sm text-gray-400">Trang</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">🇻🇳</div>
                <div className="text-sm text-gray-400">Vietsub</div>
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
                badges={[{ text: "VIETSUB", className: "bg-yellow-500" }]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-vietsub"
          />
        </section>
      </div>
    </main>
  );
}
