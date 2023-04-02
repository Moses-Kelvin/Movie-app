import React from "react";
import TvShowCard from "./TvShowCard";


const TvShowRow = ({ movieHeader, MoviesDiscoverData, addToFav }) => {

        return (<div className="MovieRow">
                <h1>{movieHeader}</h1>
                <div className="MovieRow-Container horizontalScroll">
                        {MoviesDiscoverData.map((data, index) =>
                                <TvShowCard
                                        key={index}
                                        data={data}
                                        addToFav={addToFav}
                                />
                        )}
                </div>
        </div>
        )
};

export default TvShowRow;