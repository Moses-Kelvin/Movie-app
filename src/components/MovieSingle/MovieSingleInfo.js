import { Star } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../../store/features/moviesApiSlice";
import '../../styles/MovieSingle/MovieSingleInfo.scss';

const MovieSingleInfo = () => {

    const { movieId } = useParams();

    const { data, isFetching } = useGetSingleMovieQuery(movieId);

    //   if (!isFetching) {
    //     localStorage.setItem('singleMovie', JSON.stringify(data));
    // }

    const singleMovieResult =   JSON.parse(localStorage.getItem('singleMovie')); 

    console.log(singleMovieResult);

    return (
        <section className="MovieSingleInfo_section">
            <div>
                <h1>{data?.original_title}</h1>
                <p>{new Date(data?.release_date).getFullYear()}</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`} alt="" />
            <div className="MovieSingleInfo_info">
                <span><Star sx={{ color: 'yellow' }} /> {data?.vote_average}</span>
                <h4>Runtime: {data?.runtime}min</h4>
            </div>
            <div>
                <p>{data?.overview}</p>
            </div>
        </section>
    )
};

export default MovieSingleInfo;