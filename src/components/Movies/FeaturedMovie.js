import React, { useState, useEffect, useRef } from "react";
import '../../styles/Movies/FeaturedMovie.scss';
import Button from '../UI/Button';
import { AddCircleOutline, Circle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useGetTrendingMoviesQuery } from "../../store/features/moviesApiSlice";
import moviesGenre from "../../utils/GenreData";
import { useMediaQuery, useTheme } from "@mui/material";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import AddedToFavourite from "../UI/AddedToFavourite";


const FeaturedMovie = () => {

    const [index, setIndex] = useState(0);
    const [addedToFav, setAddedTofav] = useState(false);
    const [popUpMsg, setPopUpMsg] = useState("");
    const timeoutRef = useRef(null);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const theme = useTheme();
    const showDots = useMediaQuery(theme.breakpoints.up('sm'));

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };


    const { data: trendingMovies, isFetching: isTrendingMoviesFetching } = useGetTrendingMoviesQuery();
    const trendingMoviesResult = JSON.parse(localStorage.getItem('trendingMovies'));

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setIndex((prevIndex) =>
                prevIndex === trendingMoviesResult.results.length - 1 ? 0 : prevIndex + 1
            ), 10000
        );
        return () => {
            resetTimeout();
        };
    }, [index, trendingMoviesResult.results.length]);

    const addToFav = async (title, releaseDate, rating, imgUrl) => {
        const colRef = collection(db, `users/${currentUser?.docId}/Favourites`);
        const docs = await getDocs(colRef);
        docs.docs.forEach(doc => {
            // try {
            if (doc.data().title === title) {
                setPopUpMsg("Movie already added to favourie");
                setAddedTofav(true);
            } else {
                setPopUpMsg("❤️ Added to favourite!");
                setAddedTofav(true);
                 addDoc(collection(db, "users", currentUser?.docId, "Favourites"), {
                    title,
                    releaseDate,
                    rating,
                    imgUrl,
                    sentAt: serverTimestamp()
                });
                setAddedTofav(false);
            }
            setAddedTofav(false);
        //  } catch (e) {
        //     console.log(e)
        //  }
        });
        // console.log(docs.docs.data());
        // setAddedTofav(true);
        
        
    }



    return (
        <div className="featuredMovie-slideshow">
            <div className="featuredMovie-slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {trendingMoviesResult.results.map((movie, index) => (
                    <div key={index}
                        className="featuredMovie"
                        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
                        <div className="featuredMovie-info">
                            <div className="featuredMovie-genre_container">
                                {moviesGenre.filter(genre => movie.genre_ids.includes(genre.id)).map((Genre, indx) =>
                                    <div key={indx} className="featuredMovie-genre">{Genre.name}</div>
                                )}
                            </div>
                            <h1>{movie.title}</h1>
                            <div className="featuredMovie_info">
                                <div>
                                    <p>Year: {new Date(movie.release_date).getFullYear()}</p>
                                    {showDots && <Circle sx={{ fontSize: '8px' }} />}
                                </div>
                                <div>
                                    <p>Rating: {movie.vote_average}</p>
                                    {showDots && <Circle sx={{ fontSize: '8px' }} />}
                                </div>
                                <div>
                                    <p>Popularity: {movie.popularity}</p>
                                    {showDots && <Circle sx={{ fontSize: '8px' }} />}
                                </div>
                                <p>Release: {movie.release_date}</p>
                            </div>
                            {addedToFav && <AddedToFavourite />}
                            <div className="featuredMovie-btn">
                                <Link to={`/Movies/${movie.id}`}>
                                    <Button className='featuredMovie-moreDetail_btn'>
                                        More Detail
                                    </Button>
                                </Link>
                                <Button className='featuredMovie-add_btn'
                                    handleClick={() =>
                                        addToFav(movie.title, movie.release_date, movie.vote_average, movie.poster_path)
                                    }>
                                    {<AddCircleOutline />} ADD TO FAVOURITE
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="slideShowDots">
                {trendingMoviesResult.results.map((_, idx) =>
                    <div key={idx} className={`slideShowDot ${index === idx ? "activeDot" : ""}`}
                        onClick={() => { setIndex(idx) }}></div>
                )}
            </div>
        </div>
    )
};

export default FeaturedMovie;