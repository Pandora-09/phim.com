import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { getMoviesByKeyword } from "@/services/ophim";
import { Suspense } from "react";

async function SearchContent({ searchParams }) {
  const keyword = searchParams?.q?.trim() || "";
  const page = parseInt(searchParams?.page || "1");
  
  let movies = [];
  let totalPages = 0;
  
  if (keyword) {
    try {
      const data = await getMoviesByKeyword(keyword, page);
      movies = data.results;
      totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">
            {keyword ? (
              <>
                Kết quả tìm kiếm cho{" "}
                <span className="text-primary">"{keyword}"</span>
                {movies.length > 0 && (
                  <span className="text-gray-400 text-xl ml-2">
                    (Trang {page})
                  </span>
                )}
              </>
            ) : (
              "Tìm Kiếm Phim"
            )}
          </h1>

          {keyword ? (
            movies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      baseUrl={`/search?q=${encodeURIComponent(keyword)}`}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-400 text-lg">
                  Không tìm thấy kết quả phù hợp với từ khóa "{keyword}"
                </div>
                <p className="text-gray-500 mt-2">
                  Vui lòng thử lại với từ khóa khác
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg">
                Nhập từ khóa vào ô tìm kiếm để bắt đầu
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-white mt-4">Đang tải...</p>
          </div>
        </div>
      }
    >
      <SearchContent searchParams={searchParams} />
    </Suspense>
  );
}
