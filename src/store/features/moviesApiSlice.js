import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api_key = "6907e99bdedc5dda9e7f9f8052111610";

export const moviesApiSlice = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
    endpoints: (builder) => ({
        getMoviesDiscover: builder.query({
            query: (pgNum) => `discover/movie?api_key=${api_key}&page=${pgNum}`,
        }),
        getUpcomingMovies: builder.query({
            query: (pgNum) => `movie/upcoming?api_key=${api_key}&page=${pgNum}`,
        }),
        getTrendingMovies: builder.query({
            query: () => `trending/movie/day?api_key=${api_key}`,
        }),
        getTopRatedTvShows: builder.query({
            query: (pgNum) => `tv/top_rated?api_key=${api_key}&page=${pgNum}`,
        }),
        getPopularTvShows: builder.query({
            query: (pgNum) => `tv/popular?api_key=${api_key}&page=${pgNum}`,
        }),
        getSingleMovie: builder.query({
            query: (id) => `movie/${id}?api_key=${api_key}`,
        }),
    }),
});

export const {
    useGetMoviesDiscoverQuery,
    useGetUpcomingMoviesQuery,
    useGetTrendingMoviesQuery,
    useGetTopRatedTvShowsQuery,
    useGetSingleMovieQuery,
    useGetPopularTvShowsQuery } = moviesApiSlice