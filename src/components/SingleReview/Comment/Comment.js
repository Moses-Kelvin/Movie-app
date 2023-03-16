import React, { memo, useEffect, useState } from "react";
import CommentHeader from "./CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "./Votes";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, onSnapshot, orderBy } from "firebase/firestore";


const SingleReply = ({ username, reply, img, movieId, id }) => {
    return (
        <div className="singleReply">
            <img src={img} alt="" />
            <Link to={`/Movies/${movieId}/comments/${id}`} className="singleReply-username">
                <h4>{username}</h4>
            </Link>
            <p>{reply.length >= 40 ? `${reply.slice(0,40)}...` : reply}</p>
        </div>
    )
};


const Comment = (props) => {

    const { userComment, name, imgUrl, id, setUserInput, setEditComment,
        setCommentID, setEditReply, setReplyId } = props;

    const [replyList, setReplyList] = useState([]);

    const { movieId } = useParams();

    useEffect(() => {
        onSnapshot(collection(db, `Movies/${movieId}/Comments/${id}/Replies`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setReplyList(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [id]);


    return (
        <div className="comment-section">
            <div className="comment">
                <Votes username={name} id={id}/>
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
            {replyList.length > 2 && <Link to={`/Movies/${movieId}/comments/${id}`} className="view-replies">
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
                        id={id}
                    />
                )}
            </div>
        </div>
    )
};

export default memo(Comment);