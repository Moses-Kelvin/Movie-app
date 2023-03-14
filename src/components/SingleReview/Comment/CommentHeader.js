import { Delete, Edit, Reply } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/CommentHeader.scss';

const CommentHeader = (props) => {

    const { avatarWidth, avatarHeight, iconSize, setCommentID, type, replyId, setReplyContent,
    sentAt, name, imgUrl, id, setCommentContent, setEditComment, setEditReply, setReplyId } = props

    const { movieTitle, commentId, movieId } = useParams();

    const [user] = useAuthState(auth);

    const { data } = useFetchUserDataQuery(user?.uid);

    const deleteReview = async (id, replyId) => {
        try {
            if (type === "comment") {
                const docRef = doc(db, `Movies/${movieId}/Comments/${id}`);
                await deleteDoc(docRef);
            } else {
                const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}/Replies/${replyId}`);
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
            const docRef = doc(db, `Movies/${movieId}/Comments/${id}`);
            const docSnap = await getDoc(docRef);
            setCommentContent(docSnap.data().comment)
        } else if (type === "reply") {
            setEditReply(true);
            setReplyId(replyId);
            const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}/Replies/${replyId}`);
            const docSnap = await getDoc(docRef);
            setReplyContent(docSnap.data().reply)
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
                {data?.data.name === name ?
                    <Edit onClick={() => editReview(id, replyId)}
                        sx={{ color: 'blue', fontSize: iconSize }} /> :
                    undefined}
                {data?.data.name === name ?
                    <Delete onClick={() => deleteReview(id, replyId)}
                        sx={{ color: 'red', fontSize: iconSize }} /> :
                    undefined}
            </div>
        </div>
    )
};

export default CommentHeader;