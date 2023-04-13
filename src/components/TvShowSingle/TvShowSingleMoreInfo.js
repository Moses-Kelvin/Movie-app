import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleTvShowQuery, useGetTvShowVideoQuery } from "../../store/features/moviesApiSlice";
import Button from "../UI/Button";

const TvShowSingleMoreInfo = () => {

    const { tvShowId } = useParams();

    const { data } = useGetSingleTvShowQuery(tvShowId);

    const { data: videos } = useGetTvShowVideoQuery(tvShowId);

    return (
        <section className="MovieSingleMoreInfo-section">
            <div>
                <p>Status: {data?.status}</p>
                <p>Rated: {data?.adult ? "PG-18" : "PG-13"}</p>
                <p>Released: {new Date(data?.first_air_date).toDateString()}</p>
                <p>Language: {data?.original_language}</p>
                {data?.production_countries.map((country, index) =>
                    <p key={index}>Country: {country.name}</p>
                )}
                <div className="genres">
                    <p>Genre:</p>
                    {data?.genres.map((genre, index) =>
                        <p className="SingleGenre" key={index}>{genre.name}</p>
                    )}
                </div>
                <h2>Videos</h2>
                <div className="videos scroller">
                    {videos?.results.map((video) =>
                        <div className="video" key={video?.id}>
                            <iframe
                                title={video?.name}
                                id={video?.id}
                                allowFullScreen
                                allow="accelerometer; clipboard-write; gyroscope; picture-in-picture"
                                src={`https://www.youtube.com/embed/${video.key}`}>
                            </iframe>
                            <h2>{video?.name}</h2>
                            <div className="video-info">
                                <p>{video?.type}</p>
                                <p>{new Date(video?.published_at).toDateString()}</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
            <Link to="Comments">
                <Button className="view-comment_btn">View Comments</Button>
            </Link>
        </section>
    )
};

export default TvShowSingleMoreInfo;