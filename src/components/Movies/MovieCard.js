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

const MovieCard = ({ data, addToFav }) => {

    const [favColor, setFavColor] = useState("");
    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    useEffect(() => {
        onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                const movie = snapshot.docs.find(doc => data.title === doc.data().title);
                if (movie) {
                    setFavColor("red");
                } else {
                    setFavColor("white")
                }
            }
        )
    }, [currentUser?.docId, data]);


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
                        <Favorite
                            onClick={() =>
                                addToFav(data.title,
                                    data.release_date,
                                    data.vote_average,
                                    data.poster_path,
                                    data.id, "Movies")
                            }
                            sx={{ fontSize: '22px', color: favColor }} />
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