import React, { useState } from "react";
import '../../styles/Movies/MovieRow.scss';
import '../../styles/Movies/MoviesGrid.scss';
import { Pagination, Typography } from "@mui/material";
import { useGetMoviesDiscoverQuery } from "../../store/features/moviesApiSlice";
import MovieGridCard from "./MovieGridCard";


const MoviesGrid = ({ ent }) => {

    const [page, setPage] = useState(1);

    const upcomingMoviesResult = JSON.parse(localStorage.getItem('upcomingMovies'));

    const upcomingMoviesResults = upcomingMoviesResult.results;

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const { data } = useGetMoviesDiscoverQuery(page);




    return (
        <section className="MoviesGrid-section">
            <div className="MoviesGrid-header">
                <p>Found 70 {ent} in total</p>
            </div>
            <div className="MoviesGrid-container">
                {upcomingMoviesResults.map((data, index) =>
                    <MovieGridCard
                        key={index}
                        data={data}
                    />
                )}
            </div>
            <div className="MoviesGrid-footer">
                <Typography fontSize={20} align="center">
                    page: {page}
                </Typography>
                <Pagination color="primary" count={10} page={page} onChange={handlePageChange} />
            </div>
        </section>
    )
};

export default MoviesGrid;