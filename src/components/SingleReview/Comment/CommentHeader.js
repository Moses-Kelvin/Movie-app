import { Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/CommentHeader.scss';

const CommentHeader = (props) => {

    const { avatarWidth, avatarHeight, iconSize, setCommentID, type, replyId, 
        sentAt, name, imgUrl, id,  setEditComment, setEditReply, setReplyId,
        setUserInput, setEditSingleComment } = props

    const { commentId, movieId } = useParams();

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const deleteReview = async (id, replyId) => {
        try {
            if (type === "comment") {
                const docRef = doc(db, `Movies/${movieId}/Comments/${id}`);
                await deleteDoc(docRef);
            } else if (type === "reply") {
                const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}/Replies/${replyId}`);
                await deleteDoc(docRef);
            } else if (type === "singleComment") {
                navigate(`Movies/${movieId}/Comments`);
                const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}`);
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
            const docRef = doc(db, `Movies/${movieId}/Comments/${id}`)
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().comment);
        } else if (type === "reply") {
            setEditReply(true);
            setReplyId(replyId);
            const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}/Replies/${replyId}`);
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().reply)
        } else if (type === "singleComment") {
            setEditSingleComment(true);
            const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}`);
            const docSnap = await getDoc(docRef);
            setUserInput(docSnap.data().comment);
        }
    };


    return (
        <div className="commentHeader">
            <div>
                {imgUrl ? <img src={imgUrl} alt="" />
                    : <Avatar sx={{ width: avatarWidth, height: avatarHeight }} />}
                <h4>{name}</h4>
                <h5>7hr ago</h5>
            </div>
            <div>
                <Link to={`/Movies/${movieId}/comments/${id}`}>
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