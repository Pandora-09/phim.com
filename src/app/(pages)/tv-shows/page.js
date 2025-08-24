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
    title: "TV Shows Hay Nhất 2024 - Xem TV Shows HD Vietsub Miễn Phí",
    description: "Xem TV Shows, chương trình truyền hình hay nhất 2024 chất lượng HD Vietsub. Các show giải trí đình đám từ khắp nơi trên thế giới.",
    keywords: "tv shows, chương trình truyền hình, show giải trí, tv shows vietsub",
  };
}

export default async function TVShowsPage({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const data = await getMovies("tv-shows", page);

  if (!data?.data?.items) {
    return <div className="text-white">Không thể tải dữ liệu</div>;
  }

  const movies = data.data.items;
  const pagination = data.data.params.pagination;

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            TV Shows Hay Nhất 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Khám phá các chương trình truyền hình và show giải trí đình đám từ khắp nơi trên thế giới.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">
                  {pagination.totalItems}
                </div>
                <div className="text-sm text-gray-400">Tổng show</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {pagination.totalPages}
                </div>
                <div className="text-sm text-gray-400">Trang</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sky-400">📺</div>
                <div className="text-sm text-gray-400">TV Shows</div>
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
                  { text: "TV", className: "bg-cyan-500" }
                ]}
              />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/tv-shows"
          />
        </section>
      </div>
    </main>
  );
}