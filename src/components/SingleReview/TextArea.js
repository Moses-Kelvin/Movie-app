import { Avatar } from "@mui/material";
import React from "react";
import InputField from "../UI/InputField";
import '../../styles/SingleReview/TextArea.scss';
import Button from "../UI/Button";
import { useLocation, useParams } from "react-router-dom";
import { addDoc, collection, doc,  serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetchProfilePic from "../../hooks/use-fetchProfilePic";


const TextArea = (props) => {

    const { placeHolder, action, setEditComment, id, setUserInput, setEditSingleComment,
        userInput, replyId, setEditReply } = props;


    const [user] = useAuthState(auth);

    const { data: userData, currentUser } = useFetchUserDataQuery(user?.uid);

    const profilePic = useFetchProfilePic(currentUser?.docId);

    const { movieId, commentId, tvShowId } = useParams();

    const { pathname } = useLocation();


    const sendMessage = async () => {
        const onTvShowsPath = pathname.includes("TvShows");
        if (action === "Comment") {
            await addDoc(collection(db,
                onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments"), {
                name: userData?.data.name,
                userId: userData?.docId,
                vote: 0,
                comment: userInput,
                sentAt: serverTimestamp()
            });
            setUserInput("");
        } else if (action === "Update") {
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
        } else if (action === "Reply") {
            await addDoc(collection(db,
                onTvShowsPath ? "TvShows" : "Movies", onTvShowsPath ? tvShowId : movieId, "Comments", commentId, "Replies"), {
                name: userData?.data.name,
                userId: userData?.docId,
                vote: 0,
                reply: userInput,
                sentAt: serverTimestamp()
            });
            setUserInput("");
        } else if (action === "Done") {
            setEditReply(false);
            const ReplyRef = doc(db,
                `${onTvShowsPath ? "TvShows" : "Movies"}/${onTvShowsPath ? tvShowId : movieId}/Comments/${commentId}/Replies/${replyId}`);
            await updateDoc(ReplyRef, {
                reply: userInput
            })
            setUserInput("");
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