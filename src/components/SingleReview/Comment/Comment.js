import React, { memo, useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "./Votes";
import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import useFetchProfilePic from "../../../hooks/use-fetchProfilePic";


const SingleReply = ({ username, reply, userId, id}) => {
    
    const profilePic = useFetchProfilePic(userId);

    return (
        <div className="singleReply">
            <img src={profilePic} alt="" />
            <Link to={`${id}`} className="singleReply-username">
                <h4>{username}</h4>
            </Link>
            <p>{reply.length >= 40 ? `${reply.slice(0,40)}...` : reply}</p>
        </div>
    )
};


const Comment = (props) => {

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    const { userComment, name, userId, id, setUserInput, setEditComment,
        setCommentID, setEditReply, setReplyId } = props;

    const [replyList, setReplyList] = useState([]);

    const { movieId, tvShowId } = useParams();

    useEffect(() => {
        onSnapshot(collection(db,
             `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}/Replies`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setReplyList(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [id, movieId]);


    return (
        <div className="comment-section">
            <div className="comment">
                <Votes username={name} id={id} type="commentVote"/>
                <div>
                    <CommentHeader
                        name={name}
                        userId={userId}
                        id={id}
                        setCommentID={setCommentID}
                        setUserInput={setUserInput}
                        setEditComment={setEditComment}
                        setEditReply={setEditReply}
                        setReplyId={setReplyId}
                        type="comment"
                    />
                    <p>{userComment}</p>
                </div>
            </div>
            {replyList.length > 2 && <Link to={`${id}`} className="view-replies">
                <p>view replies previous {replyList.length} replies</p>
            </Link>}
            <div className="ReplyList">
                {replyList.length < 3 && replyList.map(reply =>
                    <SingleReply
                        key={reply.id}
                        userId={reply.data.userId}
                        reply={reply.data.reply}
                        username={reply.data.name}
                        id={id}
                    />
                )}
            </div>
        </div>
    )
};

export default memo(Comment);