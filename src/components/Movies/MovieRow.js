import React from "react";
import MovieCard from "./MovieCard";


const MovieRow = ({ movieHeader, MoviesDiscoverData, addToFav }) => {

        return (
                <div className="MovieRow">
                        <h1>{movieHeader}</h1>
                        <div className="MovieRow-Container horizontalScroll">
                                {MoviesDiscoverData.map((data, index) =>
                                        <MovieCard 
                                           key={index}
                                           data={data}
                                           addToFav={addToFav}
                                        />
                                )}
                        </div>
                </div>
        )
};

export default MovieRow;