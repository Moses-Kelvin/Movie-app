import { Favorite, Star } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../UI/Button";
import '../../styles/Movies/MovieRow.scss';
import '../../styles/Movies/MoviesGrid.scss';
import { FormControl, InputLabel, MenuItem, Pagination, Select, Typography } from "@mui/material";
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useGetMoviesDiscoverQuery } from "../../store/features/moviesApiSlice";


const sortMovies = (movies, sort) => {
    if (sort === "All" || !sort) {
        return movies;
    }
    if (sort === "Rating Ascending") {
        return movies.sort((prevMovie, currentMovie) => prevMovie.vote_average - currentMovie.vote_average);
    }
    if (sort === "Rating Descending") {
        return movies.sort((prevMovie, currentMovie) => currentMovie.vote_average - prevMovie.vote_average);
    }
    if (sort === "Release Year Ascending") {
        return movies.sort((prevMovie, currentMovie) => prevMovie.release_date.split("-")[0] - currentMovie.release_date.split("-")[0]);
    }
    if (sort === "Release Year Descending") {
        return movies.sort((prevMovie, currentMovie) => currentMovie.release_date.split("-")[0] - prevMovie.release_date.split("-")[0]);
    }
    if (sort === "Popularity Ascending") {
        return movies.sort((prevMovie, currentMovie) => prevMovie.popularity - currentMovie.popularity);
    }
    if (sort === "Popularity Descending") {
        return movies.sort((prevMovie, currentMovie) => currentMovie.popularity - prevMovie.popularity);
    }
}



const MoviesGrid = ({ ent }) => {

    const [filter, setFilter] = useState("");

    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    const upcomingMoviesResult = JSON.parse(localStorage.getItem('upcomingMovies'));

    const upcomingMoviesResults = upcomingMoviesResult.results;

    const [searchParam] = useSearchParams();
    const query = searchParam.get('sort');

    const params = { sort: filter }

    useEffect(() => {
        if (filter)
            navigate({
                pathname: '/movies',
                search: `?${createSearchParams(params)}`,
            })
    }, [filter])

    const sortedMovies = sortMovies(upcomingMoviesResults, query);

    // console.log(query)


    // console.log(sortedMovies)


    const handleChange = (e) => {
        setFilter(e.target.value);
    };

    const handlePageChange = (event, value) => {
       setPage(value);
    }

    const {data} = useGetMoviesDiscoverQuery(page);



    const formControl = (
        <FormControl className="MovieGrid-formControl">
            <InputLabel variant="filled" id="demo-simple-select-label">Filter Movies</InputLabel>
            <Select variant="filled"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter || query}
                onChange={handleChange}
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
                {sortedMovies.map((el, index) =>
                    <div className="movie MoviesGrid-movie" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="" />
                        <Link to="/Movies/Adam">
                            <Button className="readMore-btn">Read More</Button>
                        </Link>
                        <div>
                            <h2>{el.title}</h2>
                            <div className="movie-info">
                                <h4>{el.release_date.split("-")[0]}</h4>
                                <div>
                                    <Favorite sx={{ fontSize: '22px' }} />
                                    <span>
                                        <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                                        {el.vote_average}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="MoviesGrid-footer">
                    <Typography fontSize={20} align="center">
                        page: {page}
                    </Typography>
                    <Pagination color="primary"  count={10} page={page} onChange={handlePageChange} />
            </div>
        </section>
    )
};

export default MoviesGrid;