"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider({ movies }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentSlide];
  const imageUrl = currentMovie.poster_url
    ? `https://img.ophim.live/uploads/movies/${currentMovie.poster_url}`
    : currentMovie.thumb_url
    ? `https://img.ophim.live/uploads/movies/${currentMovie.thumb_url}`
    : "/placeholder.jpg";

  return (
    <div className="relative h-screen w-full overflow-hidden backdrop-blur-md bg-amber-50 ">
      {/* Background Image */}
      <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 !object-center">
        <Image
          src={imageUrl}
          alt={currentMovie.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {currentMovie.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              {currentMovie.origin_name}
            </h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentMovie.year}
              </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentMovie.quality}
              </span>
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentMovie.episode_current}
              </span>
            </div>

            <p className="text-gray-300 text-lg mb-8 line-clamp-3">
              {currentMovie.content?.replace(/<[^>]*>/g, "") ||
                "Đang cập nhật nội dung..."}
            </p>

            <div className="flex gap-4">
              <Link
                href={`/movie/${currentMovie.slug}`}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Xem Ngay
              </Link>
              <button className="bg-white/20 cursor-pointer hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                Thêm vào danh sách
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}

      {/* Navigation Arrows */}
      {/* <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % movies.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-20"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button> */}
    </div>
  );
}
