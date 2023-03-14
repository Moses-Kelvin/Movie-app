import { Avatar } from "@mui/material";
import React, { memo } from "react";
import InputField from "../UI/InputField";
import '../../styles/SingleReview/TextArea.scss';
import Button from "../UI/Button";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { useAuthState } from "react-firebase-hooks/auth";


const TextArea = (props) => {

    const { placeHolder, action, commentContent, setCommentContent, setEditComment, id, 
        replyContent, setReplyContent, replyId, setEditReply } = props;

    const [user] = useAuthState(auth);

    const { data: userData } = useFetchUserDataQuery(user?.uid);

    const { movieId, commentId } = useParams();

    const sendMessage = async () => {
        if (action === "Comment") {
            await addDoc(collection(db, "Movies", movieId, "Comments"), {
                name: userData?.data.name,
                imgUrl: userData?.data.imgUrl,
                vote: 0,
                comment: commentContent,
                sentAt: serverTimestamp()
            });
            setCommentContent("");
        } else if (action === "Update") {
            setEditComment(false);
            setCommentContent("");
            const commentRef = doc(db, `Movies/${movieId}/Comments/${id}`);
            await updateDoc(commentRef, {
                comment: commentContent
            })
        } else if (action === "Reply") {
            setReplyContent("");
            await addDoc(collection(db, "Movies", movieId, "Comments", commentId, "Replies"), {
                name: userData?.data.name,
                imgUrl: userData?.data.imgUrl,
                vote: 0,
                reply: replyContent,
                sentAt: serverTimestamp()
            });
        } else if (action === "Done") {
            setEditReply(false);
            setReplyContent("");
            const ReplyRef = doc(db, `Movies/${movieId}/Comments/${commentId}/Replies/${replyId}`);
            await updateDoc(ReplyRef, {
                reply: replyContent
            })
        }
    };

    console.log(replyContent);

    return (
        <div className="textArea">
            <div>
                {userData?.data.imgUrl ? <img src={userData.data.imgUrl} alt="" /> :
                    <Avatar sx={{ color: 'white' }} />}
                <InputField
                    id="standard-basic"
                    placeholder={`${placeHolder}`}
                    textColor="white"
                    Width="90%"    
                    value={action === "Comment" || action === "Update" ? commentContent : replyContent}
                    onChange={action === "Comment" || action === "Update" ? (e) => setCommentContent(e.target.value) :
                        (e) => setReplyContent(e.target.value)
                    }
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

export default memo(TextArea);