import MovieCard from "../../../components/MovieCard";
import Pagination from "../../../components/Pagination";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/phim-sap-chieu?page=${page}`,
    {
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Sắp Chiếu 2024 - Xem Trailer Phim Mới Sắp Ra Mắt",
    description:
      "Cập nhật thông tin phim sắp chiếu mới nhất 2024. Xem trailer và thông tin các bộ phim blockbuster sắp ra mắt.",
    keywords:
      "phim sắp chiếu, phim mới 2024, trailer phim mới, phim sắp ra mắt",
  };
}

export default async function PhimSapChieuPage({ searchParams }) {
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
            Phim Sắp Chiếu 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cập nhật thông tin những bộ phim blockbuster sắp ra mắt. Xem trailer
            và đặt lịch để không bỏ lỡ!
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Sắp chiếu</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">SOON</div>
                <div className="text-sm text-gray-400">Sắp có</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400">⏰</div>
                <div className="text-sm text-gray-400">Đợi chờ</div>
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
                    text: "SẮP CHIẾU",
                    className: "bg-yellow-500 animate-pulse",
                  },
                  {
                    text: "TRAILER",
                    className: "bg-purple-500",
                    position: "bottom",
                  },
                ]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/phim-sap-chieu"
          />
        </section>
      </div>
    </main>
  );
}
