import { Add, Remove } from "@mui/icons-material";
import {
    addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, where
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/Votes.scss';

const Votes = ({ className, id, type, replyId }) => {

    const [votes, setVotes] = useState([]);

    const { movieId, commentId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const navigate = useNavigate();

    const onTvShowsPath = pathname.includes("TvShows");

    const AddVote = async (id, type, replyId) => {
        if (user) {
            const colRef = type === "commentVote" ? collection(db,
                onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments", id, "Votes") :
                type === "singleCommentVote" ? collection(db,
                    onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments", commentId, "Votes") :
                    collection(db,
                        onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments", commentId, "Replies", replyId, "Votes");
            const q = query(colRef, where("userId", "==", currentUser?.docId));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(colRef, {
                    userId: currentUser?.docId,
                    username: currentUser?.data.name
                })
            } else {
                alert("you cannot vote twice!")
            }
        } else {
            alert("You must be logged in to like a comment/reply");
            navigate('/LogIn');
        }
    };


    const RemoveVote = async (id, type, replyId) => {
        if (user) {
            const q = query(type === "commentVote" ?
                collection(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}/Votes`) :
                type === "singleCommentVote" ? collection(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Votes`) :
                    collection(db,
                        `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}/Votes`),
                where("userId", "==", currentUser.docId));
            const docs = await getDocs(q);
            if (docs.docs !== 0) {
                const docId = docs.docs[0].id;
                const docRef = type === "commentVote" ? doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}/Votes/${docId}`) :
                    type === "singleCommentVote" ? doc(db,
                        `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Votes/${docId}`) :
                        doc(db,
                            `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}/Votes/${docId}`);
                await deleteDoc(docRef);
            }
        } else {
            alert("You must be logged in to unlike a comment/reply");
            navigate('/LogIn');
        }
    };

    useEffect(() => {
        onSnapshot(type === "commentVote" ? collection(db,
            `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}/Votes`) :
            type === "singleCommentVote" ? collection(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Votes`) :
                collection(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}/Votes`), orderBy(
                        'timestamp', 'asc'), (snapshot) => {
                            setVotes(snapshot.docs.map(doc => ({
                                id: doc.id,
                                data: doc.data()
                            })))
                        }
        )

    }, [id, movieId, commentId, replyId, type]);

    return (
        <div className={`votes ${className}`}>
            <Add onClick={() => AddVote(id, type, replyId)} />
            <p>{votes.length}</p>
            <Remove onClick={() => RemoveVote(id, type, replyId)} />
        </div>
    )
};

export default Votes;