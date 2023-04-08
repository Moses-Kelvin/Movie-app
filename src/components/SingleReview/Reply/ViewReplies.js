import React, { memo, useEffect, useState } from "react";
import Votes from "../Comment/Votes";
import CommentHeader from "../Comment/CommentHeader";
import Replies from "./Replies";
import '../../../styles/SingleReview/Comment.scss';
import { doc, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { useLocation, useParams } from "react-router-dom";


const ViewReplies = ({ setEditReply, setReplyId, setEditSingleComment, setUserInput }) => {

    const [currentComment, setCurrentComment] = useState("");

    const { commentId, movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");


    useEffect(() => {
        onSnapshot(doc(db,
             `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setCurrentComment(snapshot.data())
            }
        )
    }, [commentId, movieId]);



    return (
        <div className="comment-section">
            <div className="comment">
                <Votes type="singleCommentVote"/>
                <div>
                    <CommentHeader type="singleComment"
                        setEditSingleComment={setEditSingleComment}
                        setUserInput={setUserInput}
                        name={currentComment.name}
                        sentAt={new Date(currentComment.sentAt?.toDate())}
                         userId={currentComment.userId} />
                    <p>{currentComment.comment}</p>
                </div>
            </div>
            <Replies
                setEditReply={setEditReply}
                setUserInput={setUserInput}
                setReplyId={setReplyId} />
        </div>
    )
};

export default memo(ViewReplies);