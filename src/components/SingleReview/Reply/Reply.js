import React from "react";
import CommentHeader from "../Comment/CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "../Comment/Votes";

const Reply = ({userReply, name, imgUrl, replyId, setEditReply,setReplyId, setReplyContent}) => {
    return (
        <div className="comment reply">
            <Votes className="reply-votes"/>
            <div>
                <CommentHeader 
                    name={name}
                    imgUrl={imgUrl}
                    replyId={replyId}
                    setEditReply={setEditReply}
                    setReplyId={setReplyId}
                    setReplyContent={setReplyContent}
                    avatarWidth="1.5rem"
                    avatarHeight="1.5rem"
                    iconSize="1rem"
                    type="reply"
                />
                <p>{userReply}</p>
            </div>
        </div>
    )
};

export default Reply;