import React, { useEffect, useState } from "react";
import TextArea from "./TextArea";
import '../../styles/SingleReview/SingleReview.scss';
import Comment from "./Comment/Comment";
import { Navigate, useLocation, useParams, useRoutes } from "react-router-dom";
import ViewReplies from "./Reply/ViewReplies";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Forum } from "@mui/icons-material";
import ReviewSpinner from "../UI/Spinners/ReviewSpinner";


const SingleReview = () => {

    const [movieComments, setMovieComments] = useState([]);
    const [editComment, setEditComment] = useState(false);
    const [editReply, setEditReply] = useState(false);
    const [commentID, setCommentID] = useState("");
    const [replyId, setReplyId] = useState("");
    const [editSingleComment, setEditSingleComment] = useState(false);
    const [userInput, setUserInput] = useState("");

    const { movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const [user] = useAuthState(auth);


    useEffect(() => {
        const onTvShowsPath = pathname.includes("TvShows");
        onSnapshot(collection(db,
            `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments`),
            orderBy(
                'timestamp', 'asc'), (snapshot) => {
                    setMovieComments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                }
        )
    }, [movieId]);


    let NoOfComment;

    if (movieComments.length === 0) {
        NoOfComment = "No Comment"
    } else if (movieComments.length === 1) {
        NoOfComment = "01 Comment"
    } else if (movieComments.length <= 9 && movieComments.length !== 1) {
        NoOfComment = `0${movieComments.length} Comments`
    } else {
        NoOfComment = `${movieComments.length} Comments`
    }

    const NoComment = (
        <div className="NoComment">
            <Forum sx={{ fontSize: '15rem' }} />
            <h3>Be the first to comment</h3>
        </div>
    );


    const comments = (
        <section className="MovieSingleReview-section">
            <h2>{NoOfComment}</h2>
            <div className="scroller commentScroller">
                {movieComments.map(comment => (
                    <Comment
                        key={comment.id}
                        userComment={comment.data.comment}
                        name={comment.data.name}
                        userId={comment.data.userId}
                        id={comment.id}
                        setUserInput={setUserInput}
                        setCommentID={setCommentID}
                        setEditComment={setEditComment}
                    />
                ))}
            </div>
            {movieComments.length === 0 && NoComment}
            {user && <TextArea placeHolder="Leave your thought here..."
                action={editComment || editSingleComment ? "Update" : "Comment"}
                userInput={userInput}
                setUserInput={setUserInput}
                id={commentID}
                setEditComment={setEditComment} />}
        </section>
    );

    const Replies = (
        <section className="MovieSingleReview-section">
            <div className="scroller commentScroller">
                <ViewReplies
                    setEditReply={setEditReply}
                    setUserInput={setUserInput}
                    setEditSingleComment={setEditSingleComment}
                    setReplyId={setReplyId} />
            </div>
            {user && <TextArea placeHolder="Write a reply..."
                action={editReply ? "Done" : editSingleComment ? "Update" : "Reply"}
                userInput={userInput}
                setEditSingleComment={setEditSingleComment}
                setUserInput={setUserInput}
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