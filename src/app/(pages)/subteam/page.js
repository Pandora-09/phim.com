import Pagination from "../../../components/Pagination";
import MovieCard from "../../../components/MovieCard";

async function getMovies(page = 1) {
  const res = await fetch(
    `https://ophim1.com/v1/api/danh-sach/subteam?page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  return {
    title: "Phim Subteam 2024 - Xem Phim Sub Chuyên Nghiệp HD Vietsub",
    description:
      "Xem phim được sub bởi các team phụ đề chuyên nghiệp. Chất lượng dịch thuật cao, đồng bộ hoàn hảo.",
    keywords:
      "phim subteam, sub chuyên nghiệp, team phụ đề, vietsub chất lượng",
  };
}

export default async function SubteamPage({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const data = await getMovies(page);

  if (!data?.data?.items) {
    return <div>Không thể tải dữ liệu</div>;
  }

  const movies = data.data.items;
  const pagination = data.data.params.pagination;

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Phim Subteam Chuyên Nghiệp 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thưởng thức các bộ phim được sub bởi những team phụ đề chuyên nghiệp
            nhất. Chất lượng dịch thuật cao, đồng bộ hoàn hảo.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-indigo-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Phim sub</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">PRO</div>
                <div className="text-sm text-gray-400">Chuyên nghiệp</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-400">⭐</div>
                <div className="text-sm text-gray-400">Chất lượng</div>
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
                  { text: "SUBTEAM", className: "bg-indigo-500" },
                  {
                    text: "PRO SUB",
                    className: "bg-green-500",
                    position: "bottom",
                  },
                ]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/subteam"
          />
        </section>
      </div>
    </main>
  );
}
