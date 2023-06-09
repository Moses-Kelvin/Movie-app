import { Avatar } from "@mui/material";
import React from "react";
import InputField from "../UI/InputField";
import '../../styles/SingleReview/TextArea.scss';
import Button from "../UI/Button";
import { useLocation, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useAuthState } from "react-firebase-hooks/auth";


const TextArea = (props) => {

    const { placeHolder, action, setEditComment, id, setUserInput, setEditSingleComment,
        userInput, replyId, setEditReply, profilePic } = props;


    const [user] = useAuthState(auth);

    const { data: userData } = useFetchUserDataQuery(user?.uid);

    const { movieId, commentId, tvShowId } = useParams();

    const { pathname } = useLocation();

    const sendComment = async () => {
        const onTvShowsPath = pathname.includes("TvShows");
        await addDoc(collection(db,
            onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments"), {
            name: userData?.data.name,
            userId: userData?.docId,
            vote: 0,
            comment: userInput,
            sentAt: serverTimestamp()
        });
        setUserInput("");
    };

    const updateComment = async () => {
        const onTvShowsPath = pathname.includes("TvShows");
        let commentRef;
        if (commentId) {
            setEditSingleComment(false);
            commentRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`);
        } else {
            setEditComment(false);
            commentRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${id}`);
        }
        setUserInput("")
        await updateDoc(commentRef, {
            comment: userInput
        })
    };

    const sendReply = async () => {
        const onTvShowsPath = pathname.includes("TvShows");
        const docRef = doc(db, `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}`);
            const docSnap = await getDoc(docRef);
            const notificationData = {
                name: userData?.data.name,
                senderId: userData?.docId,
                type: "reply",
                commentId: commentId,
                onRead: false,
                media: onTvShowsPath ? "tvShow" : "movie",
                mediaId: onTvShowsPath ? tvShowId : movieId,
                sentAt: serverTimestamp()
            };
            await addDoc(collection(db,
                onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments", commentId, "Replies"), {
                name: userData?.data.name,
                userId: userData?.docId,
                vote: 0,
                reply: userInput,
                replyingTo: docSnap.data().name,
                sentAt: serverTimestamp(),
            });
            if (docSnap.data()?.userId !== userData?.docId) {
                await addDoc(collection(db, "users", docSnap.data().userId, "Notifications"), notificationData);
            }
            setUserInput("");
    };

    const updateReply = async () => {
        const onTvShowsPath = pathname.includes("TvShows");
        setEditReply(false);
            const ReplyRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}`);
            await updateDoc(ReplyRef, {
                reply: userInput
            })
            setUserInput("");
    };


    const sendMessage = async () => {
        if (action === "Comment") {
           sendComment();
        } else if (action === "Update") {
           updateComment();
        } else if (action === "Reply") {
             sendReply();
        } else if (action === "Done") {
             updateReply();
        }
    };


    return (
        <div className="textArea">
            <div>
                {profilePic ?
                    <img src={profilePic} alt="" />
                    : <Avatar sx={{ color: 'white' }} />}
                <InputField
                    id="standard-basic"
                    placeholder={`${placeHolder}`}
                    textColor="white"
                    Width="90%"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    variant="standard" />
            </div>
            <div>
                <Button className="send-btn"
                    handleClick={sendMessage}>
                    {action}</Button>
            </div>
        </div>
    )
};


export default TextArea;