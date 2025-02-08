const API_KEY = "cb3fbcf03f3967173f5b91594a5fe068";

const requests = {
	fetchTrending: `/trending/all/day?api_key=${API_KEY}`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,
	fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
	fetchNowPlayine: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
	fetchComedyMovies: `/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`,
}

export default requests;