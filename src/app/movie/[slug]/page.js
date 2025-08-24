import { notFound } from "next/navigation";
import Image from "next/image";
import { Tag } from "antd";
import SmartPlayer from "../../../components/SmartPlayer";
import RelatedMoviesTabs from "../../../components/RelatedMoviesTabs";

async function getMovie(slug) {
  try {
    const res = await fetch(`https://ophim1.com/v1/api/phim/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedMoviesByCategory(categorySlug) {
  try {
    const res = await fetch(
      `https://ophim1.com/v1/api/the-loai/${categorySlug}?page=1`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.items?.slice(0, 12) || [];
  } catch {
    return [];
  }
}

async function getRelatedMovies(categories) {
  if (!categories || categories.length === 0) return {};

  const relatedMovies = {};
  const limitedCategories = categories.slice(0, 4);

  for (const category of limitedCategories) {
    if (category.slug) {
      const movies = await getRelatedMoviesByCategory(category.slug);
      if (movies.length > 0) {
        relatedMovies[category.slug] = {
          name: category.name,
          movies: movies,
        };
      }
    }
  }

  return relatedMovies;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const movie = await getMovie(slug);
  if (!movie?.data?.item) return {};

  return {
    title: `${movie.data.item.name} (${movie.data.item.year}) - Xem Phim Online`,
    description:
      movie.data.item.content ||
      `Xem phim ${movie.data.item.name} ${movie.data.item.year} chất lượng HD miễn phí`,
  };
}

export default async function MoviePage({ params }) {
  const { slug } = await params;

  const [movie, relatedMovies] = await Promise.all([
    getMovie(slug),
    getMovie(slug).then((data) =>
      data?.data?.item?.category
        ? getRelatedMovies(data.data.item.category)
        : {}
    ),
  ]);

  if (!movie?.data?.item) {
    notFound();
  }

  const { data } = movie;

  return (
    <div className="min-h-screen bg-gray-900 light:bg-gray-50 transition-colors">
      <div className="container mx-auto p-4">
        <SmartPlayer movie={data.item} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5 mt-6">
          <div className="lg:col-span-1">
            {(data.item.poster_url || data.item.thumb_url) && (
              <div className="sticky top-4">
                <Image
                  priority
                  src={
                    data.item.poster_url
                      ? `https://img.ophim.live/uploads/movies/${data.item.thumb_url}`
                      : `https://img.ophim.live/uploads/movies/${data.item.thumb_url}`
                  }
                  alt={data.item.name}
                  width={300}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-gray-800 light:bg-white rounded-lg p-6 shadow-sm mb-2 transition-colors">
              <h1 className="text-3xl font-bold mb-2 text-white light:text-gray-900">
                {data.item.name}
              </h1>
              <h2 className="text-xl text-gray-300 light:text-gray-600 mb-2.5">
                {data.item.origin_name}
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Năm:</strong> {data.item.year}
                  </p>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Quốc gia:</strong>{" "}
                    {data.item.country?.map((c) => c.name).join(", ")}
                  </p>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Trạng thái:</strong> {data.item.episode_current}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Chất lượng:</strong> {data.item.quality}
                  </p>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Ngôn ngữ:</strong> {data.item.lang}
                  </p>
                  <p className="mb-2 text-gray-200 light:text-gray-800">
                    <strong>Thời lượng:</strong> {data.item.time}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <strong className="text-gray-200 light:text-gray-800">
                  Thể loại:{" "}
                </strong>
                {data.item.category?.map((cat) => (
                  <Tag key={cat.id} color="blue" className="ml-1">
                    {cat.name}
                  </Tag>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white light:text-gray-900 border-b">
                  Nội dung phim
                </h3>
                <div
                  className="prose max-w-none text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] text-gray-300 light:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: data.item.content }}
                />
              </div>
            </div>
          </div>
        </div>

        <RelatedMoviesTabs relatedMovies={relatedMovies} />
      </div>
    </div>
  );
}
