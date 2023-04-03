import React from 'react';
import MovieGenreFilter from '../components/Movies/MovieGenreFilter';
import MovieRow from '../components/Movies/MovieRow';
import FeaturedMovie from '../components/Movies/FeaturedMovie';
import {
    useGetMoviesDiscoverQuery,
    useGetPopularTvShowsQuery,
    useGetTopRatedTvShowsQuery,
    useGetUpcomingMoviesQuery
} from '../store/features/moviesApiSlice';
import { useGetTopStoriesNewsQuery } from '../store/features/newsApiSlice';
import NewsType from '../components/News/NewsType';
import TvShowRow from '../components/TvShows/TvShowRow';
 

const Home = () => {

    const { data: MoviesDiscover, isFetching: isMoviesDiscoverfetching } = useGetMoviesDiscoverQuery();
    const { data: upcomingMovies, isFetching: isUpcomingMoviesfetching } = useGetUpcomingMoviesQuery();
    const { data: TopRatedTvShows, isFetching: isTopRatedTvShowsfetching } = useGetTopRatedTvShowsQuery();
    const { data: popularTvShows, isFetching: isPopularTvShowsfetching } = useGetPopularTvShowsQuery();
    const { data: TopStoriesNews, isFetching: isTopStoriesNewsfetching } = useGetTopStoriesNewsQuery();

    // if (!isTopStoriesNewsfetching) {
    //     localStorage.setItem('TopStoriesNews', JSON.stringify(TopStoriesNews));
    // }
    // if (!isTopRatedTvShowsfetching) {
    //     localStorage.setItem('TopRatedTvShows', JSON.stringify(TopRatedTvShows));
    // }




    const moviesDiscoverResult = JSON.parse(localStorage.getItem('moviesDiscover'));
    const upcomingMoviesResult = JSON.parse(localStorage.getItem('upcomingMovies'));
    const TopRatedTvShowsResult = JSON.parse(localStorage.getItem('TopRatedTvShows'));
    const popularTvShowsResult = JSON.parse(localStorage.getItem('popularTvShows'));
    const TopStoriesNewsResult = JSON.parse(localStorage.getItem('TopStoriesNews'));

    
    return (
        <>
            <FeaturedMovie />
            <MovieGenreFilter />
            {isMoviesDiscoverfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <MovieRow movieHeader="DISCOVER"
                    MoviesDiscoverData={moviesDiscoverResult.results}

                />}
            {isUpcomingMoviesfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <MovieRow movieHeader="UPCOMING MOVIES"
                    MoviesDiscoverData={upcomingMoviesResult.results}

                />}
            {isTopRatedTvShowsfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <TvShowRow movieHeader="TOP RATED TV SHOWS"
                    MoviesDiscoverData={TopRatedTvShowsResult.results}

                />}
            {isPopularTvShowsfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <TvShowRow movieHeader="POPULAR TV SHOWS"
                    MoviesDiscoverData={popularTvShowsResult.results}
                />}
            {isTopStoriesNewsfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <NewsType NewsHeader="TOP STORIES NEWS"
                    TopStoriesNewsData={TopStoriesNewsResult.articles}

                />}
        </>
    )
};

export default Home;