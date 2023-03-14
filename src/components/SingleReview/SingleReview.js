import React, { useEffect, useState } from "react";
import TextArea from "./TextArea";
import '../../styles/SingleReview/SingleReview.scss';
import Comment from "./Comment/Comment";
import { Navigate, useParams, useRoutes } from "react-router-dom";
import ViewReplies from "./Reply/ViewReplies";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SingleReview = () => {

    const [commentContent, setCommentContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [movieComments, setMovieComments] = useState([]);
    const [editComment, setEditComment] = useState(false);
    const [editReply, setEditReply] = useState(false);
    const [commentID, setCommentID] = useState("");
    const [replyId, setReplyId] = useState("");

    const { movieId, commentId } = useParams();

    const [user] = useAuthState(auth);


    useEffect(() => {
        onSnapshot(collection(db, `Movies/${movieId}/Comments`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setMovieComments(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [movieId]);


    const comments = (
        <section className="MovieSingleReview-section">
            <h2>06 Comments</h2>
            <div className="scroller commentScroller">
                {movieComments.map(comment => (
                    <Comment
                        key={comment.id}
                        userComment={comment.data.comment}
                        name={comment.data.name}
                        imgUrl={comment.data.imgUrl}
                        id={comment.id}
                        setCommentContent={setCommentContent}
                        setCommentID={setCommentID}
                        setEditComment={setEditComment}
                    />
                ))}
            </div>
            {user && <TextArea placeHolder="Write a comment..."
                action={editComment ? "Update" : "Comment"}
                commentContent={commentContent}
                id={commentID}
                setEditComment={setEditComment}
                setCommentContent={setCommentContent} />}
        </section>
    );

    const Replies = (
        <section className="MovieSingleReview-section">
            <div className="scroller commentScroller">
                <ViewReplies  setEditReply={setEditReply} 
                  setReplyContent={setReplyContent} 
                setReplyId={setReplyId} />
            </div>
            {user && <TextArea placeHolder="Write a reply..."
                action={editReply ? "Done" : "Reply"}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                replyId={replyId}
                setEditReply={setEditReply}
            />}
        </section>
    );

    const element = useRoutes([
        { index: true, element: comments },
        { path: ':commentId', element: Replies },
        { path: '*', element: <Navigate to={`/Movies/${movieId}/comments`} /> }
    ]);


    return <>
        {element}
    </>
};

export default SingleReview;