import React from "react";
import MovieSearch from "../../components/Movies/MovieSearch";
import MoviesGrid from "../../components/Movies/MoviesGrid";
import '../../styles/Pages/Movies.scss';
import film1 from '../../assets/images/film1.jpg';
import { useMediaQuery, useTheme } from "@mui/material";


const Movies = () => {

    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.up('sm'));

    return (<>
        <div className="Movies-header">
            <h1>MOVIE  LISTING - GRID</h1>
        </div>
        <section className="Movies-section">
            {!mobileScreen && <MovieSearch />}
            <MoviesGrid ent="movies" />
            {mobileScreen && <MovieSearch />}
        </section>
    </>
    )
};

export default Movies;