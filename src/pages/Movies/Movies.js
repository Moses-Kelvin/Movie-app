import React from "react";
import MovieSearch from "../../components/Movies/MovieSearch";
import MoviesGrid from "../../components/Movies/MoviesGrid";
import '../../styles/Pages/Movies.scss';
import { useMediaQuery, useTheme } from "@mui/material";


const Movies = () => {

    const theme = useTheme();
    const lgScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const mdScreen = useMediaQuery(theme.breakpoints.down('md'));

    const largeScreenLayout = (
        <>
            <MoviesGrid ent="movies" />
            <MovieSearch />
        </>
    );

    const MediumAndSmallScreenLayout = (
        <>
            <MovieSearch />
            <MoviesGrid ent="movies" />
        </>
    );






    return (<>
        <div className="Movies-header">
            <h1>MOVIE  LISTING - GRID</h1>
        </div>
        <section className="Movies-section">
            {(!lgScreen || mdScreen) ? MediumAndSmallScreenLayout : largeScreenLayout}
        </section>
    </>
    )
};

export default Movies;