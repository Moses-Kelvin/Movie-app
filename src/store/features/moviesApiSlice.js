import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TMDB_API_KEY } from "../../config";


export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
    endpoints: (builder) => ({
        getMoviesDiscover: builder.query({
            query: (pgNum) => `discover/movie?api_key=${TMDB_API_KEY}&page=${pgNum}`,
        }),
        getUpcomingMovies: builder.query({
            query: (pgNum) => `movie/upcoming?api_key=${TMDB_API_KEY}&page=${pgNum}`,
        }),
        getTrendingMovies: builder.query({
            query: () => `trending/movie/day?api_key=${TMDB_API_KEY}`,
        }),
        getTopRatedTvShows: builder.query({
            query: (pgNum) => `tv/top_rated?api_key=${TMDB_API_KEY}&page=${pgNum}`,
        }),
        getPopularTvShows: builder.query({
            query: (pgNum) => `tv/popular?api_key=${TMDB_API_KEY}&page=${pgNum}`,
        }),
        getSingleMovie: builder.query({
            query: (id) => `movie/${id}?api_key=${TMDB_API_KEY}`,
        }),
        getSingleTvShow: builder.query({
            query: (id) => `tv/${id}?api_key=${TMDB_API_KEY}`,
        }),
    }),
});

export const {
    useGetMoviesDiscoverQuery,
    useGetUpcomingMoviesQuery,
    useGetTrendingMoviesQuery,
    useGetTopRatedTvShowsQuery,
    useGetSingleMovieQuery,
    useGetSingleTvShowQuery,
    useGetPopularTvShowsQuery } = moviesApiSlice