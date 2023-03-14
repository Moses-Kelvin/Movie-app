import React, { memo } from "react";
import CommentHeader from "./CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "./Votes";
import Replies from "../Reply/Replies";
import { Link, useLocation } from "react-router-dom";

const Comment = (props) => {

    const { userComment, name, imgUrl, id, setCommentContent, setReplyContent,
        setEditComment, setCommentID, setEditReply, setReplyId } = props;

    const { pathname } = useLocation();
    console.log(pathname)

    // const arr = ['1', '2', '3']

    return (
        <div className="comment-section">
            <div className="comment">
                <Votes />
                <div>
                    <CommentHeader
                        name={name}
                        imgUrl={imgUrl}
                        id={id}
                        setCommentContent={setCommentContent}
                        setCommentID={setCommentID}
                        setReplyContent={setReplyContent}
                        setEditComment={setEditComment}
                        setEditReply={setEditReply}
                        setReplyId={setReplyId}
                        type="comment"
                    />
                    <p>{userComment}</p>
                </div>
            </div>
            <Link className="view-replies">
                <p>view replies</p>
            </Link>
        </div>
    )
};

export default memo(Comment);