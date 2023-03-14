import React, { memo, useEffect, useState } from "react";
import Votes from "../Comment/Votes";
import CommentHeader from "../Comment/CommentHeader";
import Replies from "./Replies";
import '../../../styles/SingleReview/Comment.scss';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";


const ViewReplies = ({ setEditReply, setReplyId, setReplyContent }) => {

    const [currentComment, setCurrentComment] = useState("");

    const { commentId, movieId } = useParams();


    useEffect(() => {
        const getCurrentComment = async () => {
            const docRef = doc(db, `Movies/${movieId}/Comments/${commentId}`);
            const docSnap = await getDoc(docRef);
            setCurrentComment(docSnap.data())
        };
        getCurrentComment();
    }, [commentId]);

    return (
        <div className="comment-section">
            <div className="comment">
                <Votes />
                <div>
                    <CommentHeader name={currentComment.name}
                        imgUrl={currentComment.imgUrl} />
                    <p>{currentComment.comment}</p>
                </div>
            </div>
            <Replies setEditReply={setEditReply}
                setReplyContent={setReplyContent}
                setReplyId={setReplyId} />
        </div>
    )
};

export default memo(ViewReplies);