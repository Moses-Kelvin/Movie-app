import React from "react";
import '../../styles/Movies/FeaturedMovie.scss';
import { useGetTrendingMoviesQuery } from "../../store/features/moviesApiSlice";
import FavouriteMoviecard from "./FeaturedMovieCard";
import { useMediaQuery, useTheme } from "@mui/material";
import { Scrollbar, Navigation, Pagination, Autoplay, EffectCoverflow} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';



const FeaturedMovie = () => {

    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { data: trendingMovies, isFetching: isTrendingMoviesFetching } = useGetTrendingMoviesQuery();

    return (
        <>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, EffectCoverflow]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={desktop} 
                autoplay={{delay: 10000}}
                effect="coverflow"
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {trendingMovies?.results.map((movie, index) => (
                    <SwiperSlide>
                        <FavouriteMoviecard
                            key={movie.id}
                            movie={movie}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
};

export default FeaturedMovie;



// <div className="featuredMovie-slideshow">
// <div className="featuredMovie-slideshowSlider"
//     style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
//     {trendingMovies?.results.map((movie, index) => (
//         <FavouriteMoviecard
//             key={index}
//             movie={movie}
//         />
//     ))}
// </div>
// <div className="slideShowDots">
//     {trendingMovies?.results.map((_, idx) =>
//         <div key={idx} className={`slideShowDot ${index === idx ? "activeDot" : ""}`}
//             onClick={() => { setIndex(idx) }}></div>
//     )}
// </div>
// </div>