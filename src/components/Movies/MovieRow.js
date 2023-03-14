import React from "react";
import { Star, Favorite } from "@mui/icons-material";
import '../../styles/Movies/MovieRow.scss';
import Button from "../UI/Button";
import { Link, useParams } from "react-router-dom";


const MovieRow = ({ movieHeader, MoviesDiscoverData }) => {

        const params = useParams();
        console.log(params)

        return (<div className="MovieRow">
                <h1>{movieHeader}</h1>
                <div className="MovieRow-Container horizontalScroll">
                        {MoviesDiscoverData.map((data, index) =>
                                <div className="movie" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />
                                        <Link to={`/Movies/${data.id}`}>
                                                <Button className="readMore-btn">Read More</Button>
                                        </Link>
                                        <div>
                                                <h2>{data.title}</h2>
                                                <div className="movie-info">
                                                        <h4>
                                                                { data.release_date ? data.release_date.split("-")[0] : data.first_air_date.split("-")[0]}
                                                        </h4>
                                                        <div>
                                                                <Favorite sx={{ fontSize: '22px' }} />
                                                                <span>
                                                                        <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                                                                        {data.vote_average}
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>)}
                </div>
        </div>
        )
};

export default MovieRow;