import React from "react";
import film1 from '../../assets/images/img4.jpg';
import MoviesGrid from "../../components/Movies/MoviesGrid";
import MovieSearch from "../../components/Movies/MovieSearch";
import { useMediaQuery, useTheme } from "@mui/material";


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
                <MoviesGrid ent="Series" />
                {mobileScreen && <MovieSearch />}
            </section>
        </>
    )
};

export default TvShows;