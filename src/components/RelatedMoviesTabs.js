"use client";
import { useState } from "react";
import { Tabs } from "antd";
import Image from "next/image";
import Link from "next/link";

function MovieCard({ movie }) {
  const imageUrl = movie.poster_url
    ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
    : movie.thumb_url
    ? `https://img.ophim.live/uploads/movies/${movie.thumb_url}`
    : "/placeholder.jpg";

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/phim/${movie.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={`Xem phim ${movie.name}`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              {movie.episode_current || "HD"}
            </span>
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              {movie.quality || "HD"}
            </span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900">
            {movie.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{movie.year}</p>
        </div>
      </Link>
    </article>
  );
}

export default function RelatedMoviesTabs({ relatedMovies }) {
  const [activeKey, setActiveKey] = useState(Object.keys(relatedMovies)[0]);

  if (!relatedMovies || Object.keys(relatedMovies).length === 0) {
    return null;
  }

  const tabItems = Object.entries(relatedMovies).map(([slug, data]) => ({
    key: slug,
    label: data.name,
    children: (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    ),
  }));

  return (
    <div className="mt-5">
      <div className="bg-gray-800 light:bg-white rounded-lg p-6 shadow-sm transition-colors">
        <h2 className="text-2xl font-bold text-white light:text-gray-900">
          Phim liên quan
        </h2>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
          className="related-movies-tabs"
        />
      </div>
    </div>
  );
}
