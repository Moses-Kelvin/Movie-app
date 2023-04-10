import React, { useEffect, useState } from "react";
import '../../styles/Pages/UserFavouriteMovies.scss';
import '../../styles/Pages/Movies.scss';
import { auth, db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { Star, RemoveCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button";
import Oops from "../../assets/images/oops.png";
import { useRef } from "react";

const UserFavouriteMovies = () => {

    const [favouriteMovies, setFavouriteMovies] = useState([]);
    const scrollToUserFavourite = useRef();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    
    useEffect(() => {
        scrollToUserFavourite.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const q = query(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy('sentAt', 'desc'));
        onSnapshot(q, (snapshot) => {
                setFavouriteMovies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [currentUser?.docId]);

    const removeFavourite = async (id) => {
        const userId = currentUser?.docId;
        const docRef = doc(db, `users/${userId}/Favourites/${id}`);
        await deleteDoc(docRef);
    };

    const NofavouriteMovieFound = (
        <div className="NofavouriteMovieFound">
        <img className="oops-img" src={Oops} alt="" />
            <h1>No Favourite Movies Found!</h1>
        </div>
    )

    let moviesFound;
    if (favouriteMovies.length === 0) {
        moviesFound = "found no favourite"
    } else if (favouriteMovies.length === 1) {
        moviesFound = "found 1 favourite in total"
    } else {
        moviesFound = `found ${favouriteMovies.length} favourites in total`
    }

    return (
        <section className="favourite-movies" ref={scrollToUserFavourite}>
            <section className="MoviesGrid-section favourite-movies-Section">
                <div className="MoviesGrid-header">
                    <p>{moviesFound}</p>
                </div>
                {favouriteMovies.length === 0 ? NofavouriteMovieFound :
                    <div className="MoviesGrid-container favouriteMovies-container scroller">
                        {favouriteMovies.map((favMovie) =>
                            <div className="movie MoviesGrid-movie" key={favMovie.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${favMovie.data.imgUrl}`} alt="" />
                                <Link to={`/${favMovie.data.section}/${favMovie.data.id}`}>
                                    <Button className="readMore-btn">Read More</Button>
                                </Link>
                                <div>
                                    <h2>{favMovie.data.title}</h2>
                                    <div className="movie-info">
                                        <h4>{new Date(favMovie.data.releaseDate).getFullYear()}</h4>
                                        <div>
                                            <RemoveCircleOutline
                                                onClick={() => removeFavourite(favMovie.id)}
                                                sx={{ fontSize: '22px' }} />
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

