import { Favorite, Star } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { AddBump, Addfavourite } from "../../store/actions/addFavourite";

const MovieCard = ({ data }) => {

    const [favColor, setFavColor] = useState("white");
    const [user] = useAuthState(auth);
    
    const dispatch = useDispatch();
    const isAddedToFav = useSelector((state) => state.Favourite.isFav);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    useEffect(() => {
        onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                const movie = snapshot.docs.find(doc => data.title === doc.data().title);
                if (movie) {
                    setFavColor("red");
                } 
            }
        )
    }, [currentUser?.docId, data]);

    const movieData = {
        title: data.title,
        date: data.release_date,
        vote: data.vote_average,
        imgUrl: data.poster_path,
        id: data.id,
        type: "Movies"
    }

    const addFav = async () => {
        dispatch(Addfavourite(movieData, currentUser.docId));
        dispatch(AddBump(movieData, currentUser.docId));
       
    };


    return (
        <div className="movie">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />
            <Link to={`/Movies/${data.id}`}>
                <Button className="readMore-btn">Read More</Button>
            </Link>
            <div>
                <h2>{data.title}</h2>
                <div className="movie-info">
                    <h4>{new Date(data.release_date).getFullYear()}</h4>
                    <div>
                       {user && <Favorite className={isAddedToFav ? "bump" : undefined}
                            onClick={addFav}
                            sx={{ fontSize: '22px', color: favColor }} />}
                        <span>
                            <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                            {data.vote_average}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MovieCard;