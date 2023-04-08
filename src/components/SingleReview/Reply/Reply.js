import React from "react";
import CommentHeader from "../Comment/CommentHeader";
import '../../../styles/SingleReview/Comment.scss';
import Votes from "../Comment/Votes";

const Reply = (props) => {

    const { userReply, name, replyId, setEditReply,
        setReplyId, setUserInput, userId, sentAt, replyingTo } = props;

    return (
        <div className="comment reply">
            <Votes className="reply-votes" replyId={replyId} type="reply" />
            <div>
                <CommentHeader
                    name={name}
                    replyingTo={replyingTo}
                    sentAt={sentAt}
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
                    <p><span style={{color: 'blue'}}>{replyingTo}</span> {userReply}</p>
            </div>
        </div>
    )
};

export default Reply;