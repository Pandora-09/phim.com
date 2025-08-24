import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-chieu-rap?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Chiếu Rạp 2024 - Xem Phim Rạp Mới Nhất HD Vietsub",
    description:
      "Xem phim chiếu rạp mới nhất 2024 chất lượng HD Vietsub. Các bộ phim blockbuster đang chiếu tại rạp với chất lượng cao.",
    keywords: "phim chiếu rạp, phim rạp mới, blockbuster, phim chiếu rạp 2024",
  };
}

export default async function PhimChieuRapPage({ searchParams }) {
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
            Phim Chiếu Rạp 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thưởng thức các bộ phim blockbuster đang chiếu tại rạp với chất
            lượng HD tại nhà.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-rose-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Phim rạp</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">CINEMA</div>
                <div className="text-sm text-gray-400">Rạp chiếu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">🎭</div>
                <div className="text-sm text-gray-400">Blockbuster</div>
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
                badges={[{ text: "CHIẾU RẠP", className: "bg-rose-500" }]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-chieu-rap"
          />
        </section>
      </div>
    </main>
  );
}
