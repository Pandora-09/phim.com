'use client'
import Link from "next/link";
import Image from "next/image";

export default function SearchResults({ results, isLoading, onResultClick }) {
  if (isLoading) {
    return (
      <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="text-white text-center">Đang tìm kiếm...</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="text-white text-center">Không tìm thấy kết quả.</div>
      </div>
    );
  }

  return (
    <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <ul>
        {results.map((movie) => (
          <li key={movie._id} className="border-b border-gray-700 last:border-b-0">
            <Link
              href={`/movie/${movie.slug}`}
              onClick={onResultClick}
              className="flex items-center p-3 hover:bg-gray-700 transition-colors"
            >
              <div className="relative w-12 h-16 mr-4 flex-shrink-0">
                <Image
                  src={`https://img.ophim.live/uploads/movies/${movie.thumb_url}`}
                  alt={movie.name}
                  fill
                  className="object-cover rounded"
                  sizes="50px"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-white font-semibold line-clamp-1">{movie.name}</h4>
                <p className="text-gray-400 text-sm line-clamp-1">{movie.origin_name}</p>
                <p className="text-gray-400 text-sm">{movie.year}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
