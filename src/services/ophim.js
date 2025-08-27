const API_BASE_URL = "https://ophim1.com/v1/api";

export async function searchMovies(keyword) {
  if (!keyword) {
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/tim-kiem?keyword=${keyword}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data.items || [];
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    return [];
  }
}

export async function getMoviesByKeyword(keyword, page = 1) {
    if (!keyword) {
        return { results: [], total_pages: 0 };
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tim-kiem?keyword=${keyword}&page=${page}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return {
            results: data.data.items || [],
            total_pages: data.data.params.pagination.totalPages || 0,
        };
    } catch (error) {
        console.error("Failed to fetch movies by keyword:", error);
        return { results: [], total_pages: 0 };
    }
}
