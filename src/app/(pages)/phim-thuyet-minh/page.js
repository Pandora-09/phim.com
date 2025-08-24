import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-thuyet-minh?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Thuyết Minh Hay Nhất 2024 - Xem Phim Lồng Tiếng Việt HD",
    description:
      "Xem phim thuyết minh chất lượng HD miễn phí. Các bộ phim được lồng tiếng Việt hay nhất với giọng đọc chuyên nghiệp.",
    keywords:
      "phim thuyết minh, lồng tiếng việt, phim thuyet minh, thuyết minh hd",
  };
}

export default async function PhimThuyetMinhPage({ searchParams }) {
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
            Phim Thuyết Minh Hay Nhất 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thưởng thức các bộ phim được lồng tiếng Việt chuyên nghiệp, giọng
            đọc hay và truyền cảm.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Tổng phim</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">
                  {pagination.totalPages}
                </div>
                <div className="text-sm text-gray-400">Trang</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-rose-400">🎙️</div>
                <div className="text-sm text-gray-400">Thuyết minh</div>
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
                badges={[{ text: "THUYẾT MINH", className: "bg-red-500" }]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-thuyet-minh"
          />
        </section>
      </div>
    </main>
  );
}
