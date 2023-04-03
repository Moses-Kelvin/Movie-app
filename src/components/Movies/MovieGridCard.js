import React, { useEffect, useState } from "react";
import { Favorite, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { Addfavourite } from "../../store/actions/addFavourite";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";

const MovieGridCard = ({ data }) => {


    const [favColor, setFavColor] = useState("");

    const [user] = useAuthState(auth);

    const dispatch = useDispatch();

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

    const movieData = {
        title: data.title,
        date: data.release_date,
        vote: data.vote_average,
        imgUrl: data.poster_path,
        id: data.id,
        type: "Movies"
    }


    return (
        <div className="movie MoviesGrid-movie">
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />
            <Link to="/Movies/Adam">
                <Button className="readMore-btn">Read More</Button>
            </Link>
            <div>
                <h2>{data.title}</h2>
                <div className="movie-info">
                    <h4>{new Date(data.release_date).getFullYear()}</h4>
                    <div>
                       {user && <Favorite
                            onClick={() =>
                                dispatch(Addfavourite(movieData, currentUser.docId))
                            }
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

export default MovieGridCard;