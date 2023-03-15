import React, { memo } from "react";
import CommentHeader from "./CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "./Votes";
import Replies from "../Reply/Replies";
import { Link, useLocation, useParams } from "react-router-dom";

const Comment = (props) => {

    const { userComment, name, imgUrl, id, setUserInput, setEditComment,
        setCommentID, setEditReply, setReplyId } = props;

    const { movieId } = useParams();

    return (
        <div className="comment-section">
            <div className="comment">
                <Votes />
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
            <Link to={`/Movies/${movieId}/comments/${id}`} className="view-replies">
                <p>view replies</p>
            </Link>
        </div>
    )
};

export default memo(Comment);