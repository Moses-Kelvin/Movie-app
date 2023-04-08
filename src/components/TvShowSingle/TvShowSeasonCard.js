import React from "react";
import '../../styles/TvShow/TvShowSeasonCard.scss';

const TvShowSeasonCard = ({ data }) => {
    return (
        <section className="TvShowSeasonCard">
            <img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt=""/>
            <h2>{data.name}</h2>
            <details>
                <summary>overview</summary>
                <p>{data.overview}</p>
                <p>No of episodes: {data.episode_count}</p>
                <p>Air Date: {data.air_date}</p>
            </details>
        </section>
    )
};

export default TvShowSeasonCard;