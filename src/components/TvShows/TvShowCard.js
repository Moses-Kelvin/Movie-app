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
import { useDispatch, useSelector } from "react-redux";
import { AddBump, Addfavourite } from "../../store/actions/addFavourite";

const TvShowCard = ({data}) => {

    const [favColor, setFavColor] = useState("white");
    const [user] = useAuthState(auth);

    const dispatch = useDispatch();
    const isAddedToFav = useSelector((state) => state.Favourite.isFav);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    useEffect(() => {
        onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                const movie = snapshot.docs.find(doc => data.name === doc.data().title);
                if (movie) {
                    setFavColor("red");
                }  
            }
        )
    }, [currentUser?.docId, data]);

    const tvShowData = {
        title: data.name,
        date: data.first_air_date,
        vote: data.vote_average,
        imgUrl: data.poster_path,
        id: data.id,
        type: "TvShows"
    }

    const addFav = async () => {
        dispatch(Addfavourite(tvShowData, currentUser.docId));
        dispatch(AddBump(tvShowData, currentUser.docId));
       
    };

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
                      {user &&  <Favorite className={isAddedToFav ? "bump" : undefined}
                            onClick={addFav}
                            sx={{ fontSize: '22px', color: favColor }} />}
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