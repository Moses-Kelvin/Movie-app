import React, { useState, useEffect, useRef } from "react";
import '../../styles/Movies/FeaturedMovie.scss';
import { useGetTrendingMoviesQuery } from "../../store/features/moviesApiSlice";
import FavouriteMoviecard from "./FeaturedMovieCard";



const FeaturedMovie = () => {

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

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
                prevIndex === trendingMovies?.results.length - 1 ? 0 : prevIndex + 1
            ), 10000
        );
        return () => {
            resetTimeout();
        };
    }, [index, trendingMovies?.results.length]);



    return (
        <>
            <div className="featuredMovie-slideshow">
                <div className="featuredMovie-slideshowSlider"
                    style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                    {trendingMovies?.results.map((movie, index) => (
                        <FavouriteMoviecard
                            key={index}
                            movie={movie}
                        />
                    ))}
                </div>
                <div className="slideShowDots">
                    {trendingMovies?.results.map((_, idx) =>
                        <div key={idx} className={`slideShowDot ${index === idx ? "activeDot" : ""}`}
                            onClick={() => { setIndex(idx) }}></div>
                    )}
                </div>
            </div>
        </>
    )
};

export default FeaturedMovie;