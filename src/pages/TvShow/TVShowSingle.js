import React from "react";
import { useParams, useRoutes } from "react-router-dom";
import SingleReview from "../../components/SingleReview/SingleReview";
import TvShowSingleInfo from "../../components/TvShowSingle/TvShowSingleInfo";
import TvShowSingleMoreInfo from "../../components/TvShowSingle/TvShowSingleMoreInfo";
import '../../styles/Pages/MovieSingle.scss';

const TvShowSingle = () => {

    const params = useParams();
    console.log(params)

    const element = useRoutes([
        { index: true, element: <TvShowSingleMoreInfo /> },
        { path: '/comments/*', element: <SingleReview /> }
    ]);

    return (
        <section className="MovieSingle_section">
            <TvShowSingleInfo />
            {element}
        </section>
    )
};

export default TvShowSingle;