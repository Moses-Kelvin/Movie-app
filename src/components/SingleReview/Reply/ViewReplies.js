import React, { memo, useEffect, useState } from "react";
import Votes from "../Comment/Votes";
import CommentHeader from "../Comment/CommentHeader";
import Replies from "./Replies";
import '../../../styles/SingleReview/Comment.scss';
import { doc, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";


const ViewReplies = ({ setEditReply, setReplyId, setEditSingleComment, setUserInput }) => {

    const [currentComment, setCurrentComment] = useState("");

    const { commentId, movieId } = useParams();

    useEffect(() => {
        onSnapshot(doc(db, `Movies/${movieId}/Comments/${commentId}`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setCurrentComment(snapshot.data())
            }
        )
    }, [commentId]);



    return (
        <div className="comment-section">
            <div className="comment">
                <Votes />
                <div>
                    <CommentHeader type="singleComment"
                        setEditSingleComment={setEditSingleComment}
                        setUserInput={setUserInput}
                        name={currentComment.name}
                        imgUrl={currentComment.imgUrl} />
                    <p>{currentComment.comment}</p>
                </div>
            </div>
            <Replies setEditReply={setEditReply}
                setUserInput={setUserInput}
                setReplyId={setReplyId} />
        </div>
    )
};

export default memo(ViewReplies);