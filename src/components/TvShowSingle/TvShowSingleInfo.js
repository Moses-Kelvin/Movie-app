import { Star } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleTvShowQuery } from "../../store/features/moviesApiSlice";
import TvShowSeasonCard from "./TvShowSeasonCard";

const TvShowSingleInfo = () => {

    const { tvShowId } = useParams();

    const { data, isFetching } = useGetSingleTvShowQuery(tvShowId);

    const singleTvShowResult = JSON.parse(localStorage.getItem('singleTvShow'));

    console.log(singleTvShowResult);

    return (
        <section className="MovieSingleInfo_section">
            <div>
                <h1>{data?.name}</h1>
                <p>{new Date(data?.first_air_date).getFullYear()}</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`} alt="" />
            <div className="MovieSingleInfo_info">
                <span><Star sx={{ color: 'yellow' }} /> {data?.vote_average}</span>
                <h4>Runtime: {data?.runtime}min</h4>
            </div>
            <div>
                <p>{data?.overview}</p>
            </div>
            <div className="TvShowSeasons horizontalScroll">
                {data?.seasons.map((data, index) =>
                    <TvShowSeasonCard
                        key={index}
                        data={data} />
                )}
            </div>
        </section>
    )
};

export default TvShowSingleInfo;