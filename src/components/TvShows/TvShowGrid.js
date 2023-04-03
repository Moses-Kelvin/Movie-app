import React, { useState } from "react";
import '../../styles/Movies/MovieRow.scss';
import '../../styles/Movies/MoviesGrid.scss';
import { FormControl, InputLabel, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { useGetPopularTvShowsQuery } from "../../store/features/moviesApiSlice";
import TvShowGridCard from "./TvShowGridCard";


const TvShowGrid = ({ ent }) => {

    const [page, setPage] = useState(1);

    const upcomingMoviesResult = JSON.parse(localStorage.getItem('popularTvShows'));

    const upcomingMoviesResults = upcomingMoviesResult.results;

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    // const { data } = useGetMoviesDiscoverQuery(page);

    const { data } = useGetPopularTvShowsQuery(page);



    const formControl = (
        <FormControl className="MovieGrid-formControl">
            <InputLabel variant="filled" id="demo-simple-select-label">Filter Movies</InputLabel>
            <Select variant="filled"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={filter || query}
                // onChange={handleChange}
            // label={search}
            >
                <MenuItem value="Popularity Ascending">Popularity Ascending</MenuItem>
                <MenuItem value="Popularity Descending">Popularity Descending</MenuItem>
                <MenuItem value="Rating Ascending">Rating Ascending</MenuItem>
                <MenuItem value="Rating Descending">Rating Descending</MenuItem>
                <MenuItem value="Release Year Ascending">Release Year Ascending</MenuItem>
                <MenuItem value="Release Year Descending">Release Year Descending</MenuItem>
            </Select>
        </FormControl>
    );

    return (
        <section className="MoviesGrid-section">
            <div className="MoviesGrid-header">
                <p>Found 70 {ent} in total</p>
                <div>
                    <div className="MovieGrid-sortBy">
                        <p>Sort by:</p>
                    </div>
                    {formControl}
                </div>
            </div>
            <div className="MoviesGrid-container">
                {upcomingMoviesResults.map((data, index) =>
                    <TvShowGridCard
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

export default TvShowGrid;