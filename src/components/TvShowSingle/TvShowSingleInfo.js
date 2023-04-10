import { Star } from "@mui/icons-material";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleTvShowQuery } from "../../store/features/moviesApiSlice";
import TvShowSeasonCard from "./TvShowSeasonCard";
import Spinner from "../UI/Spinners/Spinner";

const TvShowSingleInfo = () => {

    const { tvShowId } = useParams();

    const { data, isLoading } = useGetSingleTvShowQuery(tvShowId);

    return (
        <>
            {isLoading && <Spinner />}
            <section className="MovieSingleInfo_section">
                <div>
                    <h1>{data?.name}</h1>
                    <p>{new Date(data?.first_air_date).getFullYear()}</p>
                </div>
                <img src={`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`} alt="" />
                <div className="MovieSingleInfo_info">
                    <span><Star sx={{ color: 'yellow' }} /> {data?.vote_average}</span>
                </div>
                <div>
                    <p>{data?.overview}</p>
                </div>
                <h1>{`Seasons(${data?.seasons.length})`}</h1>
                <div className="TvShowSeasons horizontalScroll"> 
                    {data?.seasons.map((data, index) =>
                        <TvShowSeasonCard
                            key={index}
                            data={data} />
                    )}
                </div>
            </section>
        </>
    )
};

export default TvShowSingleInfo;