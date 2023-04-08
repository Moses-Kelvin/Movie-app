import { Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/CommentHeader.scss';
import useFetchProfilePic from "../../../hooks/use-fetchProfilePic";
import DeleteModal from "../../UI/Modal/DeleteModal";
import timeAgo from "../../../utils/TimeAgo";
import { useEffect } from "react";


const CommentHeader = (props) => {

    const { avatarWidth, avatarHeight, iconSize, setCommentID, type, replyId,
        sentAt, name, userId, id, setEditComment, setEditReply, setReplyId,
        setUserInput, setEditSingleComment } = props

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const profilePic = useFetchProfilePic(userId);

    const { commentId, movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    console.log(profilePic)

    // Persist commnt posted time 
    const time = timeAgo(sentAt);

    // Update comment posted time
    useEffect(() => {
        const myTimer = setTimeout(() => {
            timeAgo();
        }, 1000);

        return () => {
            clearTimeout(myTimer);
        }
    }, []);



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
        <>
            {showDeleteModal && <DeleteModal
                type={type}
                id={id}
                replyId={replyId}
                setShowDeleteModal={setShowDeleteModal} />}
            <div className="commentHeader">
                <div>
                    {profilePic ? <img src={profilePic} alt="" />
                        : <Avatar sx={{ width: avatarWidth, height: avatarHeight }} />}
                    <h4>{name}</h4>
                    <h5>{time}</h5>
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
                        <Delete onClick={() => setShowDeleteModal(true)}
                            sx={{ color: 'red', fontSize: iconSize }} /> :
                        undefined}
                </div>
            </div>
        </>
    )
};

export default CommentHeader;