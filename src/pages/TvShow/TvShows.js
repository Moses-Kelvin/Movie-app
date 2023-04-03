import React from "react";
import MovieSearch from "../../components/Movies/MovieSearch";
import { useMediaQuery, useTheme } from "@mui/material";
import TvShowGrid from "../../components/TvShows/TvShowGrid";


const TvShows = () => {
    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <div className="Movies-header">
                <h1>TVSHOWS LISTING - GRID</h1>
            </div>
            <section className="TVShow-section">
                {!mobileScreen && <MovieSearch />}
                <TvShowGrid ent="Series" />
                {mobileScreen && <MovieSearch />}
            </section>
        </>
    )
};

export default TvShows;