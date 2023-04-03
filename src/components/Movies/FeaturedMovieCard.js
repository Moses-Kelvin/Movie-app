import React from "react";
import Button from '../UI/Button';
import { AddCircleOutline, Circle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import moviesGenre from "../../utils/GenreData";
import { useMediaQuery, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { Addfavourite } from "../../store/actions/addFavourite";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const FavouriteMoviecard = ({ movie }) => {

    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [user] = useAuthState(auth);
    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const dispatch = useDispatch();

    const movieData = {
        title: movie.title,
        date: movie.release_date,
        vote: movie.vote_average,
        imgUrl: movie.poster_path,
        id: movie.id,
        type: "Movies"
    }
    return (
        <div className="featuredMovie"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/${desktop ? "w1280" : "w500"}${movie.backdrop_path})` }}>
            <div className="featuredMovie-info">
                <div className="featuredMovie-genre_container">
                    {moviesGenre.filter(genre => movie.genre_ids.includes(genre.id)).map((Genre, indx) =>
                        <div key={indx} className="featuredMovie-genre">{Genre.name}</div>
                    )}
                </div>
                <h1>{movie.title}</h1>
                <div className="featuredMovie_info">
                    <div>
                        <p>Year: {new Date(movie.release_date).getFullYear()}</p>
                        {desktop && <Circle sx={{ fontSize: '8px' }} />}
                    </div>
                    <div>
                        <p>Rating: {movie.vote_average}</p>
                        {desktop && <Circle sx={{ fontSize: '8px' }} />}
                    </div>
                    <div>
                        <p>Popularity: {movie.popularity}</p>
                        {desktop && <Circle sx={{ fontSize: '8px' }} />}
                    </div>
                    <p>Release: {movie.release_date}</p>
                </div>
                <div className="featuredMovie-btn">
                    <Link to={`/Movies/${movie.id}`}>
                        <Button className='featuredMovie-moreDetail_btn'>
                            More Detail
                        </Button>
                    </Link>
                   {user && <Button className='featuredMovie-add_btn'
                        handleClick={() =>
                            dispatch(Addfavourite(movieData, currentUser?.docId))
                        }>
                        {<AddCircleOutline />} ADD TO FAVOURITE
                    </Button>}
                </div>
            </div>
        </div>
    )
}

export default FavouriteMoviecard;