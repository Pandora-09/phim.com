import { Suspense } from "react";

function SearchContent({ searchParams }) {
  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Kết Quả Tìm Kiếm
        </h1>
        {searchParams?.q && (
          <p className="text-gray-400 text-center mb-8">
            Từ khóa: <strong className="text-white">"{searchParams.q}"</strong>
          </p>
        )}
        <div className="text-center py-12">
          <div className="text-gray-400">
            Tính năng tìm kiếm đang được phát triển
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white mt-4">Đang tải...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent searchParams={params} />
    </Suspense>
  );
}