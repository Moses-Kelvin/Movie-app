import React from "react";
import CommentHeader from "../Comment/CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "../Comment/Votes";

const Reply = ({userReply, name, replyId, setEditReply,setReplyId, setUserInput, userId}) => {
    return (
        <div className="comment reply">
            <Votes className="reply-votes" replyId={replyId} type="reply"/>
            <div>
                <CommentHeader 
                    name={name}
                    userId={userId}
                    replyId={replyId}
                    setEditReply={setEditReply}
                    setReplyId={setReplyId}
                    setUserInput={setUserInput}
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