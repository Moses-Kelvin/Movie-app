import React, { useEffect, useState } from "react";
import TextArea from "./TextArea";
import '../../styles/SingleReview/SingleReview.scss';
import Comment from "./Comment/Comment";
import { Link, Navigate, useLocation, useParams, useRoutes } from "react-router-dom";
import ViewReplies from "./Reply/ViewReplies";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Forum } from "@mui/icons-material";
import useFetchProfilePic from "../../hooks/use-fetchProfilePic";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { EmojiEmotions } from "@mui/icons-material";
import { useRef } from "react";


const SingleReview = () => {

    const [movieComments, setMovieComments] = useState([]);
    const [editComment, setEditComment] = useState(false);
    const [editReply, setEditReply] = useState(false);
    const [commentID, setCommentID] = useState("");
    const [replyId, setReplyId] = useState("");
    const [editSingleComment, setEditSingleComment] = useState(false);
    const [userInput, setUserInput] = useState("");
    const scrollToComments = useRef();

    const { movieId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const profilePic = useFetchProfilePic(currentUser?.docId);

    const onTvShowsPath = pathname.includes("TvShows");

    
    useEffect(() => {
        scrollToComments.current.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        const q = query(collection(db,
            `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments`),
            orderBy('sentAt', 'desc'));
        onSnapshot(q, (snapshot) => {
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


    const LoginInToAddReview = (
        <div className="LoginInToAddReview">
            <EmojiEmotions sx={{ color: 'yellow', fontSize: '8rem' }} />
            <div>
                <Link to="/LogIn">Login</Link>
                <p>to Share your thoughts here.</p>
            </div>
        </div>
    )


    const comments = (
        <section className="SingleReview-section" ref={scrollToComments}>
            <h2>{user && NoOfComment}</h2>
            <div className="review-container">
                <div className="scroller commentScroller">
                    {movieComments.map(comment => (
                        <Comment
                            key={comment.id}
                            sentAt={new Date(comment.data.sentAt?.toDate())}
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
                {!user && LoginInToAddReview}
                {(movieComments.length === 0 && user) && NoComment}
                {user && <TextArea placeHolder="Leave your thought here..."
                    action={editComment || editSingleComment ? "Update" : "Comment"}
                    userInput={userInput}
                    setUserInput={setUserInput}
                    id={commentID}
                    setEditComment={setEditComment}
                    profilePic={profilePic}
                />}
            </div>
        </section>
    );

    const Replies = (
        <section className="SingleReview-section" ref={scrollToComments}>
            <div className="review-container">
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
                profilePic={profilePic}
            />}
            </div>
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