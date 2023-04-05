import { Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/CommentHeader.scss';
import useFetchProfilePic from "../../../hooks/use-fetchProfilePic";

const CommentHeader = (props) => {

    const { avatarWidth, avatarHeight, iconSize, setCommentID, type, replyId,
        sentAt, name, userId, id, setEditComment, setEditReply, setReplyId,
        setUserInput, setEditSingleComment } = props

        const profilePic = useFetchProfilePic(userId);

    const { commentId, movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    console.log(profilePic)


    const deleteReview = async (id, replyId) => {
        try {
            if (type === "comment") {
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}`);
                await deleteDoc(docRef);
            } else if (type === "reply") {
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}`);
                await deleteDoc(docRef);
            } else if (type === "singleComment") {
                const commentRoute = `/${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments`;
                console.log(commentRoute);
                const docRef = doc(db,
                    `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`);
                navigate(commentRoute);
                await deleteDoc(docRef);
            }
        } catch (e) {
            console.log(e)
        }
    };

    const editReview = async (id, replyId) => {
        if (type === "comment") {
            setEditComment(true);
            setCommentID(id);
            const docRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}`);
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().comment);
        } else if (type === "reply") {
            setEditReply(true);
            setReplyId(replyId);
            const docRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}`);
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().reply)
        } else if (type === "singleComment") {
            setEditSingleComment(true);
            const docRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`);
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().comment);
        }
    };


    return (
        <div className="commentHeader">
            <div>
                {profilePic ? <img src={profilePic} alt="" />
                    : <Avatar sx={{ width: avatarWidth, height: avatarHeight }} />}
                <h4>{name}</h4>
                <h5>7hr ago</h5>
            </div>
            <div>
                <Link to={`${id}`}>
                    {type === "comment" && <Reply sx={{ color: 'blue', fontSize: iconSize }} />}
                </Link>
                {currentUser?.data.name === name ?
                    <Edit onClick={() => editReview(id, replyId)}
                        sx={{ color: 'blue', fontSize: iconSize }} /> :
                    undefined}
                {currentUser?.data.name === name ?
                    <Delete onClick={() => deleteReview(id, replyId)}
                        sx={{ color: 'red', fontSize: iconSize }} /> :
                    undefined}
            </div>
        </div>
    )
};

export default CommentHeader;