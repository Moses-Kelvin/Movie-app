import React from "react";
import '../../styles/Pages/UserFavouriteMovies.scss';
// import MovieSearch from "../../components/Movies/MovieSearch";
import MoviesGrid from "../../components/Movies/MoviesGrid";
import '../../styles/Pages/Movies.scss';
import film1 from '../../assets/images/film1.jpg';

const data = [
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    }, 
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
    {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    },
     {
        title: "The Walk",
        img: film1,
        year: "2022",
        rating: "7.5"
    }
];


const Movies = () => {
    return  ( 
        <section className="favourite-movies">
              <MoviesGrid data={data} ent="movies"/>
        </section>
    )
};

export default Movies;





















// import React from "react";
// import '../../styles/Pages/UserFavouriteMovies.scss';
// import film1 from '../../assets/images/film1.jpg';
// import { Star } from "@mui/icons-material";


// const data = [
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
//     {
//         img: film1,
//         title: 'WEDNESSDAY',
//         ratings: '9.5'
//     },
// ];

// const UserFavouriteMovies = () => {
//     return (
//         <section className="UserFavouriteMovies-section">
//             <div className="UserFavouriteMovies-header">
//                 <p>Found 10 movies</p>
//             </div>
//             <div className="UserFavouriteMovies-body">
//                 {data.map((el, index) =>
//                     <div key={index} className="favourite-Movie">
//                         <img src={el.img} alt="" />
//                         <h2>{el.title}</h2>
//                         <div className="UserFavouriteMovies-ratings">
//                             <Star sx={{color: 'yellow'}} />
//                             <p>{el.ratings}</p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className="UserFavouriteMovies-footer">
//                 <p>Previous</p>
//                 <p>Next</p>
//             </div>
//         </section>
//     )
// };

// export default UserFavouriteMovies;