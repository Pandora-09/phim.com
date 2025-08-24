import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie, badges = [], href }) {
  const imageUrl = movie.poster_url
    ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
    : movie.thumb_url
    ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
    : "/placeholder.jpg";

  const movieHref = href || `/movie/${movie.slug}`;

  return (
    <article className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
      <Link href={movieHref}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={`Xem phim ${movie.name}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-70 transition-all duration-300 flex items-center justify-center">
            <div className="relative">
              {/* Ripple Effect */}
              <div className="absolute inset-0 bg-white/50 rounded-full animate-ping"></div>
              <div
                className="absolute inset-0 bg-white/30 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="absolute inset-0 bg-white/15 rounded-full animate-ping"
                style={{ animationDelay: "0.4s" }}
              ></div>

              {/* Play Button */}
              <div className="relative bg-orange-500 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl border border-white/20">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              {movie.episode_current || "HD"}
            </span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              {movie.quality || "HD"}
            </span>
            {badges.map((badge, index) => (
              <span
                key={index}
                className={`text-white text-xs px-2 py-1 rounded ${
                  badge.className || "bg-blue-500"
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>

          {/* Bottom right badge */}
          {badges.some((b) => b.position === "bottom") && (
            <div className="absolute bottom-2 right-2 z-10">
              {badges
                .filter((b) => b.position === "bottom")
                .map((badge, index) => (
                  <span
                    key={index}
                    className={`text-white text-xs px-2 py-1 rounded ${
                      badge.className || "bg-green-500"
                    }`}
                  >
                    {badge.text}
                  </span>
                ))}
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-medium text-[12px] line-clamp-2 lg:text-[14px] xl:text-[16px] 2xl:text-lg text-white">
            {movie.name}
          </h3>
        </div>
      </Link>
    </article>
  );
}
