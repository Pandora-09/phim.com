"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, Tag } from "antd";
import { PlayCircleOutlined, YoutubeOutlined } from "@ant-design/icons";

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  );
  return match ? match[1] : null;
}

export default function SmartPlayer({ movie }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentMode, setCurrentMode] = useState("episode"); // "trailer" or "episode"
  const [currentEpisode, setCurrentEpisode] = useState(0);

  useEffect(() => {
    const ep = searchParams.get("tap");
    if (ep) {
      const episodeIndex = parseInt(ep) - 1;
      if (episodeIndex >= 0) {
        setCurrentEpisode(episodeIndex);
        setCurrentMode("episode");
      }
    }
  }, [searchParams]);

  const episodes = movie?.episodes || [];
  const hasEpisodes =
    episodes.length > 0 && episodes[0]?.server_data?.length > 0;
  const hasTrailer = movie?.trailer_url;
  const youtubeId = getYouTubeId(movie?.trailer_url);

  const currentEp = hasEpisodes
    ? episodes[0].server_data[currentEpisode]
    : null;

  return (
    <Card
      style={{
        margin: "0px !important",
        padding: "0px !important",
      }}
      className="mb-6 shadow-lg"
    >
      <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
        {currentMode === "trailer" && hasTrailer ? (
          youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
              className="w-full h-full"
              allowFullScreen
              title={`Trailer ${movie.name}`}
            />
          ) : movie.trailer_url ? (
            <iframe
              src={movie.trailer_url}
              className="w-full h-full"
              allowFullScreen
              title={`Trailer ${movie.name}`}
            />
          ) : null
        ) : currentMode === "episode" && currentEp && currentEp.link_embed ? (
          <iframe
            src={currentEp.link_embed}
            className="w-full h-full"
            allowFullScreen
            title={`${movie.name} - Tập ${currentEp.name}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <div className="text-center">
              <PlayCircleOutlined className="text-6xl mb-4 text-gray-400" />
              <h3 className="text-white mb-2">{movie.name}</h3>
              <p className="text-gray-300">
                {!hasTrailer && !hasEpisodes
                  ? "Chưa có video để phát"
                  : "Chọn chế độ xem bên dưới"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Mode Selector */}
        {(hasTrailer || hasEpisodes) && (
          <div className="flex gap-2">
            {hasTrailer && (
              <Button
                type={currentMode === "trailer" ? "primary" : "default"}
                icon={<YoutubeOutlined />}
                onClick={() => setCurrentMode("trailer")}
                className={
                  currentMode === "trailer" ? "bg-red-500 border-red-500" : ""
                }
              >
                Trailer
              </Button>
            )}
            {hasEpisodes && (
              <div className="flex gap-x-1.5">
                <Button
                  type={currentMode === "episode" ? "primary" : "default"}
                  icon={<PlayCircleOutlined />}
                  onClick={() => setCurrentMode("episode")}
                  className={
                    currentMode === "episode"
                      ? "bg-blue-500 border-blue-500"
                      : ""
                  }
                >
                  Xem phim
                </Button>
                <div className="flex flex-wrap gap-2">
                  <Tag
                    className=""
                    style={{
                      textAlign: "center",
                      padding: "4px 8px",
                    }}
                    color="blue"
                  >
                    {movie.year}
                  </Tag>
                  <Tag
                    style={{
                      textAlign: "center",
                      padding: "4px 8px",
                    }}
                    color="green"
                  >
                    {movie.quality || "HD"}
                  </Tag>
                  <Tag
                    style={{
                      textAlign: "center",
                      padding: "4px 8px",
                    }}
                    color="orange"
                  >
                    {movie.lang || "Vietsub"}
                  </Tag>
                  {movie.time && (
                    <Tag
                      style={{
                        textAlign: "center",
                        padding: "4px 8px",
                      }}
                      color="purple"
                    >
                      {movie.time}
                    </Tag>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Episode List */}
        {currentMode === "episode" && hasEpisodes && (
          <div>
            <h4 className="font-medium mb-2 text-white">Danh sách tập</h4>
            <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
              {episodes[0].server_data.map((ep, index) => (
                <Button
                  key={index}
                  type={currentEpisode === index ? "primary" : "default"}
                  size="small"
                  onClick={() => {
                    setCurrentEpisode(index);
                    router.push(`?tap=${index + 1}`, { scroll: false });
                  }}
                  className="min-w-[25px]"
                >
                  {ep.name === "" ? "Chờ cập nhật" : ep.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Movie Info */}
      </div>
    </Card>
  );
}
