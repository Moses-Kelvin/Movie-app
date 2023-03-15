import { collection, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import '../../../styles/SingleReview/Comment.scss';
import Reply from "./Reply";


const Replies = ({setEditReply, setReplyId, setUserInput}) => {

    const [replies, setReplies] = useState([]);

    const { commentId, movieId } = useParams();

    useEffect(() => {
        onSnapshot(collection(db, `Movies/${movieId}/Comments/${commentId}/Replies`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setReplies(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [commentId]);

    return (
        <div className="replies">
            {replies.map(reply =>
                <Reply
                    key={reply.id}
                    userReply={reply.data.reply}
                    name={reply.data.name}
                    imgUrl={reply.data.imgUrl}
                    replyId={reply.id}
                    setEditReply={setEditReply}
                    setReplyId={setReplyId}
                    setUserInput={setUserInput}
                />
            )}
        </div>
    )
};

export default Replies;