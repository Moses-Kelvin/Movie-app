import React from "react";
import Button from "../UI/Button";
import '../../styles/MovieSingle/MovieSingleMoreInfo.scss';
import { Link, useParams } from "react-router-dom";
import { useGetSingleMovieQuery } from "../../store/features/moviesApiSlice";

const MovieSingleMoreInfo = () => {

   const { movieId } = useParams();

   const { data, isFetching } = useGetSingleMovieQuery(movieId);


   return (
      <section className="MovieSingleMoreInfo-section">
         <div>
            <p>Status: {data?.status}</p>
            <p>Rated: {data?.adult ? "PG-18" : "PG-13"}</p>
            <p>Released: {new Date(data?.release_date).toDateString()}</p>
            <p>Revenue: ${data?.revenue}</p>
            <p>Language: {data?.original_language}</p>
            {data?.production_countries.map((country, index) =>
               <p key={index}>Country: {country.name}</p>
            )}
            <div className="genres">
               <p>Genre:</p>
               {data?.genres.map((genre, index) =>
                  <p className="SingleGenre" key={index}>{genre.name}</p>
               )}
            </div>
            <h3>Production {data?.production_companies.length > 1 ? "companies" : "company"}:</h3>
            <div className="production-companies">
               {data?.production_companies.map((company, index) =>
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