import React from "react";
import { useParams, useRoutes } from "react-router-dom";
import MovieSingleInfo from "../../components/MovieSingle/MovieSingleInfo";
import MovieSingleMoreInfo from "../../components/MovieSingle/MovieSingleMoreInfo";
import SingleReview from "../../components/SingleReview/SingleReview";
import '../../styles/Pages/MovieSingle.scss';

const MovieSingle = () => {

    const params = useParams();
    console.log(params)

    const element = useRoutes([
        { index: true, element: <MovieSingleMoreInfo /> },
        { path: '/comments/*', element: <SingleReview /> }
    ]);

    return (
        <section className="MovieSingle_section">
            <MovieSingleInfo />
            {element}
        </section>
    )
};

export default MovieSingle;