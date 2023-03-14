import React, { useState } from "react";
import Button from "../UI/Button";
import '../../styles/Movies/MovieGenreFilter.scss';
import moviesGenre from "../../utils/GenreData";


const MovieGenreFilter = () => {

    const [selectedGenre, setSelectedGenre] = useState('');

    return (<div className="MovieGenreFilter horizontalScroll">
        {moviesGenre.map((genre, index) =>
            <Button className={`MovieGenreFilter-btn ${selectedGenre === genre.name ? 'filter-btn_color' : ''}`}
                key={index}
                handleClick={() => setSelectedGenre(genre.name)}>
                {genre.name}
            </Button>
        )}
    </div>
    )
};

export default MovieGenreFilter;