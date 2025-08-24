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
    title: "Phim Hoạt Hình Hay Nhất 2024 - Anime & Cartoon HD Vietsub",
    description:
      "Xem phim hoạt hình, anime Nhật Bản, cartoon Disney mới nhất 2024 chất lượng HD Vietsub miễn phí. Cập nhật liên tục các bộ anime hot nhất.",
    keywords:
      "phim hoạt hình, anime, cartoon, hoạt hình Nhật Bản, anime vietsub, phim hoạt hình hay",
  };
}

export default async function HoatHinhPage({ searchParams }) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const data = await getMovies("hoat-hinh", page);

  if (!data?.data?.items) {
    return <div className="text-white">Không thể tải dữ liệu</div>;
  }

  const movies = data.data.items;
  const pagination = data.data.params.pagination;

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Phim Hoạt Hình Hay Nhất 2024
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Khám phá thế giới phim hoạt hình đa dạng với các bộ anime Nhật Bản,
            cartoon Disney và hoạt hình 3D chất lượng HD Vietsub miễn phí.
          </p>
        </header>

        <section className="mb-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-400">
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
                <div className="text-2xl font-bold text-orange-400">HD</div>
                <div className="text-sm text-gray-400">Chất lượng</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalItems={pagination.totalItems}
            basePath="/hoat-hinh"
          />
        </section>
      </div>
    </main>
  );
}
