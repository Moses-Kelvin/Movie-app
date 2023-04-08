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
import CardSkeleton from '../components/UI/Spinners/CardSpinner';

const array = new Array(20);


const Home = () => {

    const { data: MoviesDiscover, isFetching: isMoviesDiscoverfetching } = useGetMoviesDiscoverQuery();
    const { data: upcomingMovies, isFetching: isUpcomingMoviesfetching } = useGetUpcomingMoviesQuery();
    const { data: TopRatedTvShows, isFetching: isTopRatedTvShowsfetching } = useGetTopRatedTvShowsQuery();
    const { data: popularTvShows, isFetching: isPopularTvShowsfetching } = useGetPopularTvShowsQuery();
    const { data: TopStoriesNews, isFetching: isTopStoriesNewsfetching } = useGetTopStoriesNewsQuery();


    const spinner = (
        <div className="horizontalScroll">
          {array.map((el, index) => <CardSkeleton />)}
        </div>
    );

return (
    <>
        <FeaturedMovie />
        <MovieGenreFilter />
        {isMoviesDiscoverfetching ? spinner :
            <MovieRow movieHeader="DISCOVER"
                MoviesDiscoverData={MoviesDiscover?.results}

            />}
        {isUpcomingMoviesfetching ?  spinner :
            <MovieRow movieHeader="UPCOMING MOVIES"
                MoviesDiscoverData={upcomingMovies?.results}

            />}
        {isTopRatedTvShowsfetching ? spinner :
            <TvShowRow movieHeader="TOP RATED TV SHOWS"
                MoviesDiscoverData={TopRatedTvShows?.results}

            />}
        {isPopularTvShowsfetching ? spinner :
            <TvShowRow movieHeader="POPULAR TV SHOWS"
                MoviesDiscoverData={popularTvShows?.results}
            />}
        {isTopStoriesNewsfetching ? spinner :
            <NewsType NewsHeader="TOP STORIES NEWS"
                TopStoriesNewsData={TopStoriesNews?.articles}
            />}
    </>
)
};

export default Home;