import React from "react";
import TvShowCard from "./TvShowCard";


const TvShowRow = ({ movieHeader, MoviesDiscoverData }) => {

        return (<div className="MovieRow">
                <h1>{movieHeader}</h1>
                <div className="MovieRow-Container horizontalScroll">
                        {MoviesDiscoverData?.map((data) =>
                                <TvShowCard
                                        key={data.id}
                                        data={data}
                                />
                        )}
                </div>
        </div>
        )
};

export default TvShowRow;