import React, { useState, useEffect, useRef } from "react";
import '../../styles/Movies/MovieRow.scss';
import '../../styles/Movies/MoviesGrid.scss';
import { Pagination, Typography } from "@mui/material";
import { useGetUpcomingMoviesQuery } from "../../store/features/moviesApiSlice";
import MovieGridCard from "./MovieGridCard";
import Spinner from "../UI/Spinners/Spinner";


const MoviesGrid = ({ ent }) => {

    const [page, setPage] = useState(1);
    const scrollToMovies = useRef();

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const { data: movieData, refetch, isLoading } = useGetUpcomingMoviesQuery(page);

    useEffect(() => {
        refetch();
        scrollToMovies.current.scrollIntoView({ behavior: "smooth" });
    }, [refetch, page]);



    return (
        <>
            {isLoading && <Spinner />}
            <section className="MoviesGrid-section" ref={scrollToMovies}>
                <div className="MoviesGrid-header">
                    <p>Found {movieData?.results.length} Movies in total</p>
                </div>
                <div className="MoviesGrid-container">
                    {movieData?.results.map((data) =>
                        <MovieGridCard
                            key={data.id}
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
        </>
    )
};

export default MoviesGrid;