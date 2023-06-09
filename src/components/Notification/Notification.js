import React, { useEffect, useState } from "react";
import { AccountCircle, Delete } from "@mui/icons-material";
import "../../styles/Notification/Notification.scss";
import { useGetSingleMovieQuery, useGetSingleTvShowQuery } from "../../store/features/moviesApiSlice";
import timeAgo from "../../utils/TimeAgo";
import useFetchProfilePic from "../../hooks/use-fetchProfilePic";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Notification = ({ notificationData, sentAt, notificationId }) => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const [mediaName, setMediaName] = useState("");

    const profilePic = useFetchProfilePic(notificationData?.senderId);

    const { data: movieData } = useGetSingleMovieQuery(notificationData?.mediaId);

    const { data: tvShowData } = useGetSingleTvShowQuery(notificationData?.mediaId);

    const navigate = useNavigate();

    useEffect(() => {
        if (notificationData?.media === "movie") {
            setMediaName(movieData?.original_title);
        } else {
            setMediaName(tvShowData?.name);
        }
    }, [notificationData?.media, movieData?.original_title, tvShowData?.name])


    const time = timeAgo(sentAt);

    useEffect(() => {
        const myTimer = setTimeout(() => {
            timeAgo();
        }, 1000);

        return () => {
            clearTimeout(myTimer);
        }
    }, []);

    const deleteNotification = async (id) => {
        const userId = currentUser?.docId;
        const docRef = doc(db, `users/${userId}/Notifications/${id}`);
        await deleteDoc(docRef);
    };

    const openNotification = async () => {
        const moviePath = notificationData?.media === "movie";
            navigate(`/${moviePath ? "Movies" : "tvShow"}/${notificationData?.mediaId}/Comments/${notificationData?.commentId}`);
        const notificationRef = doc(db, `users/${currentUser?.docId}/Notifications/${notificationId}`);
        await updateDoc(notificationRef, {
            onRead: true,
        })
    };

    const customStyle = {
        borderLeft: notificationData?.onRead && "solid red 3px"
    };

    return (
        <div className="notification" style={customStyle}>
            {profilePic ? <img src={profilePic} alt="" /> :
                <AccountCircle sx={{ fontSize: '4rem', paddingLeft: '0.5rem' }}/>
            }
            <div>
                <div className="notification-header">
                    <h3 onClick={openNotification}>
                        <span>{notificationData?.name}</span>
                        <span className="notification-text">replied to you comment on</span>
                        <span>{mediaName}</span>
                    </h3>
                    <Delete
                        className="deleteIcon"
                        onClick={() => deleteNotification(notificationId)}
                        sx={{ color: 'red', marginRight: '0.5rem', }}/>
                </div>
                <p>{time}</p>
            </div>
        </div>
    )
};

export default Notification;


