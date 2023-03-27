import React from "react";
import Button from "../UI/Button";
import '../../styles/MovieSingle/MovieSingleMoreInfo.scss';
import { Link, useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../../store/features/moviesApiSlice";

const MovieSingleMoreInfo = () => {

   const { movieId } = useParams();

   const { data, isFetching } = useGetSingleMovieQuery(movieId);

   //   if (!isFetching) {
   //     localStorage.setItem('singleMovie', JSON.stringify(data));
   // }

   const singleMovieResult = JSON.parse(localStorage.getItem('singleMovie'));

   return (
      <section className="MovieSingleMoreInfo-section">
         <div>
            <p>Status: {singleMovieResult.status}</p>
            <p>Rated: {singleMovieResult.adult ? "PG-18" : "PG-13"}</p>
            <p>Released: {new Date(singleMovieResult.release_date).toDateString()}</p>
            <p>Revenue: ${singleMovieResult.revenue}</p>
            <p>Language: {singleMovieResult.original_language}</p>
            {singleMovieResult.production_countries.map((country, index) =>
               <p key={index}>Country: {country.name}</p>
            )}
            <div className="genres">
               <p>Genre:</p>
               {singleMovieResult.genres.map((genre, index) =>
                  <p className="SingleGenre" key={index}>{genre.name}</p>
               )}
            </div>
            <h3>Production {singleMovieResult.production_companies.length > 1 ? "companies" : "company"}:</h3>
            <div className="production-companies">
               {singleMovieResult.production_companies.map((company, index) =>
                  <div key={index} className="company">
                     {company.logo_path && <img alt=""
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} />}
                     <p>{company.name}</p>
                  </div>
               )}
            </div>
         </div>
         <Link to="Comments">
            <Button className="view-comment_btn">View Comments</Button>
         </Link>
      </section>
   )
};

export default MovieSingleMoreInfo;