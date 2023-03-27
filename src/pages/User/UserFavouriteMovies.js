import React, { useEffect, useState } from "react";
import '../../styles/Pages/UserFavouriteMovies.scss';
import '../../styles/Pages/Movies.scss';
import { auth, db } from "../../firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { Favorite, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";

const UserFavouriteMovies = () => {

    const [favouriteMovies, setFavouriteMovies] = useState([]);

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    useEffect(() => {
        onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setFavouriteMovies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [currentUser?.docId]);

    let moviesFound;
    if (favouriteMovies.length === 0) {
        moviesFound = "found no movie"
    } else if (favouriteMovies.length === 1) {
        moviesFound = "found 1 Movie in total"
    } else {
        moviesFound = `found ${favouriteMovies.length} Movies in total`
    }

    return (
        <section className="favourite-movies">
            <section className="MoviesGrid-section">
                <div className="MoviesGrid-header">
                    <p>{moviesFound}</p>
                </div>
                {favouriteMovies.length === 0  ? <h1>No Favourite Movies Found!</h1> :
                <div className="MoviesGrid-container favouriteMovies-container scroller">
                    {favouriteMovies.map((favMovie) =>
                        <div className="movie MoviesGrid-movie" key={favMovie.id}>
                            <img src={`https://image.tmdb.org/t/p/w500${favMovie.data.imgUrl}`} alt="" />
                            <Link to="/Movies/Adam">
                                <Button className="readMore-btn">Read More</Button>
                            </Link>
                            <div>
                                <h2>{favMovie.data.title}</h2>
                                <div className="movie-info">
                                    <h4>{new Date(favMovie.data.releaseDate).getFullYear()}</h4>
                                    <div>
                                        <Favorite sx={{ fontSize: '22px' }} />
                                        <span>
                                            <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                                            {favMovie.data.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
                <div className="MoviesGrid-footer"> </div>
            </section>
        </section>
    )
};

export default UserFavouriteMovies;

