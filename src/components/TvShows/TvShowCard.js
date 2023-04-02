import React from "react";
import { Star, Favorite } from "@mui/icons-material";
import '../../styles/Movies/MovieRow.scss';
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { auth, db } from "../../firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect } from "react";

const TvShowCard = ({data, addToFav}) => {

    const [favColor, setFavColor] = useState("");
    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    useEffect(() => {
        onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                const movie = snapshot.docs.find(doc => data.name === doc.data().title);
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
            <Link to={`/TvShows/${data.id}`}>
                <Button className="readMore-btn">Read More</Button>
            </Link>
            <div>
                <h2>{data.name}</h2>
                <div className="movie-info">
                    <h4>
                        {data.first_air_date.split("-")[0]}
                    </h4>
                    <div>
                        <Favorite
                            onClick={() =>
                                addToFav(data.name,
                                    data.first_air_date,
                                    data.vote_average,
                                    data.poster_path,
                                    data.id, "TvShows")}
                            sx={{ fontSize: '22px', color: favColor }} />
                        <span>
                            <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                            {data.vote_average}
                        </span>
                    </div>
                </div>
            </div>
        </div>)
};

export default TvShowCard;