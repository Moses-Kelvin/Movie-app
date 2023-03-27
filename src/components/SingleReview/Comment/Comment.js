import React, { memo, useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "./Votes";
import { Link, useLocation, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore";


const SingleReply = ({ username, reply, img, movieId, id, tvShowId }) => {
    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    return (
        <div className="singleReply">
            <img src={img} alt="" />
            <Link to={`${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}`} className="singleReply-username">
                <h4>{username}</h4>
            </Link>
            <p>{reply.length >= 40 ? `${reply.slice(0,40)}...` : reply}</p>
        </div>
    )
};


const Comment = (props) => {

    const { pathname } = useLocation();

    const onTvShowsPath = pathname.includes("TvShows");

    const { userComment, name, imgUrl, id, setUserInput, setEditComment,
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
                        imgUrl={imgUrl}
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
                        img={reply.data.imgUrl}
                        reply={reply.data.reply}
                        username={reply.data.name}
                        movieId={movieId}
                        tvShowId={tvShowId}
                        id={id}
                    />
                )}
            </div>
        </div>
    )
};

export default memo(Comment);