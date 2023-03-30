import React, { useState } from 'react';
import MovieGenreFilter from '../components/Movies/MovieGenreFilter';
import MovieRow from '../components/Movies/MovieRow';
import FeaturedMovie from '../components/Movies/FeaturedMovie';
import { useGetMoviesDiscoverQuery, useGetPopularTvShowsQuery, useGetTopRatedTvShowsQuery, useGetUpcomingMoviesQuery } from '../store/features/moviesApiSlice';
import { useGetTopStoriesNewsQuery } from '../store/features/newsApiSlice';
import NewsType from '../components/News/NewsType';
import TvShowRow from '../components/TvShows/TvShowRow';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetchUserDataQuery } from '../store/features/userDataSlice';

const Home = () => {

    const [addedToFav, setAddedTofav] = useState(false);
    const [alreadyExist, setAlreadyExist] = useState(false);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

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

    const removePopUp = () => {
        setTimeout(() => {
            setAddedTofav(false);
        }, 1000);
    };

    const addToFav = async (title, releaseDate, rating, imgUrl, id, section) => {
        try {
            const colRef = collection(db, `users/${currentUser?.docId}/Favourites`);
            const docs = await getDocs(colRef);
            const movie = docs?.docs.filter(doc => title === doc.data().title);
            if (movie.length === 0) {
                setAddedTofav(true);
                setAlreadyExist(false);
                addDoc(collection(db, "users", currentUser?.docId, "Favourites"), {
                    title,
                    releaseDate,
                    rating,
                    imgUrl,
                    id,
                    section,
                    sentAt: serverTimestamp()
                });
                removePopUp();
            } else {
                setAlreadyExist(true);
                setAddedTofav(true);
                removePopUp();
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>
            <FeaturedMovie
                addToFav={addToFav}
                addedToFav={addedToFav}
                alreadyExist={alreadyExist} />
            <MovieGenreFilter />
            {isMoviesDiscoverfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <MovieRow movieHeader="DISCOVER"
                    addToFav={addToFav}
                    MoviesDiscoverData={moviesDiscoverResult.results}

                />}
            {isUpcomingMoviesfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <MovieRow movieHeader="UPCOMING MOVIES"
                    addToFav={addToFav}
                    MoviesDiscoverData={upcomingMoviesResult.results}

                />}
            {isTopRatedTvShowsfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <TvShowRow movieHeader="TOP RATED TV SHOWS"
                    addToFav={addToFav}
                    MoviesDiscoverData={TopRatedTvShowsResult.results}

                />}
            {isPopularTvShowsfetching ? <p style={{ color: 'white' }}>Loading..</p> :
                <TvShowRow movieHeader="POPULAR TV SHOWS"
                    addToFav={addToFav}
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