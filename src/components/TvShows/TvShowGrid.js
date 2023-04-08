import React, { useEffect, useRef, useState } from "react";
import '../../styles/Movies/MovieRow.scss';
import '../../styles/Movies/MoviesGrid.scss';
import { Pagination, Typography } from "@mui/material";
import { useGetPopularTvShowsQuery } from "../../store/features/moviesApiSlice";
import TvShowGridCard from "./TvShowGridCard";


const TvShowGrid = ({ ent }) => {

    const [page, setPage] = useState(1);
    const  scrollToTvShows = useRef();

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const { data: tvShowData, refetch } = useGetPopularTvShowsQuery(page);


    useEffect(() => {
        refetch();
        scrollToTvShows.current.scrollIntoView({ behavior: "smooth" });
    }, [refetch, page]);



    return (
        <section className="MoviesGrid-section" ref={scrollToTvShows}>
            <div className="MoviesGrid-header">
                <p>Found {tvShowData?.results.length} TvShows in total</p>
            </div>
            <div className="MoviesGrid-container">
                {tvShowData?.results.map((data) =>
                    <TvShowGridCard
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
    )
};

export default TvShowGrid;