import React from "react";
import MovieSearch from "../../components/Movies/MovieSearch";
import { useMediaQuery, useTheme } from "@mui/material";
import TvShowGrid from "../../components/TvShows/TvShowGrid";


const TvShows = () => {

    const theme = useTheme();
    const lgScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const mdScreen = useMediaQuery(theme.breakpoints.down('md'));

     
    const largeScreenLayout = (
        <>
            <TvShowGrid ent="movies" />
            <MovieSearch />
        </>
    );

    const MediumAndSmallScreenLayout = (
        <>
            <MovieSearch />
            <TvShowGrid ent="movies" />
        </>
    );


    return (
        <>
            <div className="Movies-header">
                <h1>TVSHOWS LISTING - GRID</h1>
            </div>
            <section className="TVShow-section">
            {(!lgScreen || mdScreen) ? MediumAndSmallScreenLayout : largeScreenLayout}
            </section>
        </>
    )
};

export default TvShows;