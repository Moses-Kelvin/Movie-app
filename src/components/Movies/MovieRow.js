import React from "react";
import { Star, Favorite } from "@mui/icons-material";
import '../../styles/Movies/MovieRow.scss';
import Button from "../UI/Button";
import { Link, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";


const MovieRow = ({ movieHeader, MoviesDiscoverData, addToFav }) => {

        const params = useParams();
        console.log(params)

        const [user] = useAuthState(auth);

        const { data: currentUser } = useFetchUserDataQuery(user?.uid);

        // useEffect(() => {
        //         onSnapshot(collection(db, `users/${currentUser?.docId}/Favourites`), orderBy(
        //                 'timestamp', 'asc'), (snapshot) => {
        //                         const movie = snapshot.docs.filter(doc => title === doc.data().title);
        //                 }
        //         )
        // }, [currentUser?.docId]);

        return (<div className="MovieRow">
                <h1>{movieHeader}</h1>
                <div className="MovieRow-Container horizontalScroll">
                        {MoviesDiscoverData.map((data, index) =>
                                <div className="movie" key={index}>
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
                                                                        sx={{ fontSize: '22px' }} />
                                                                <span>
                                                                        <Star sx={{ color: 'yellow', fontSize: '22px' }} />
                                                                        {data.vote_average}
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>)}
                </div>
        </div>
        )
};

export default MovieRow;