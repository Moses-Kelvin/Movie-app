import { Star } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleTvShowQuery } from "../../store/features/moviesApiSlice";

const TvShowSingleInfo = () => {

    const { tvShowId } = useParams();

    const { data, isFetching} = useGetSingleTvShowQuery(tvShowId);

    //   if (!isFetching) {
    //     localStorage.setItem('singleTvShow', JSON.stringify(data));
    // }

    const singleTvShowResult =   JSON.parse(localStorage.getItem('singleTvShow')); 

    console.log(singleTvShowResult);

    return (
        <section className="MovieSingleInfo_section">
               <div>
                <h1>{singleTvShowResult.name}</h1>
                <p>{new Date(singleTvShowResult.first_air_date).getFullYear()}</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w1280${singleTvShowResult.backdrop_path}`} alt="" />
            <div className="MovieSingleInfo_info">
                <span><Star sx={{ color: 'yellow' }} /> {singleTvShowResult.vote_average}</span>
                <h4>Runtime: {singleTvShowResult.runtime}min</h4>
            </div>
            <div>
                <p>{singleTvShowResult.overview}</p>
            </div>
        </section>
    )
};

export default TvShowSingleInfo;