import React, { useState, useEffect } from "react";
import '../../styles/User/UserProfile.scss';
import { Avatar } from '@mui/material';
import { AddAPhoto, Settings } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import ProfilePreview from "../UI/Modal/ProfilePreview";
import useFetchProfilePic from "../../hooks/use-fetchProfilePic";


const UserProfile = () => {

    const [file, setFile] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser, refetch } = useFetchUserDataQuery(user?.uid);

    const [photoUrl, setPhotoUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const profilePic = useFetchProfilePic(currentUser?.docId);

    useEffect(() => {
        if (photoUrl) {
            refetch();
        }
    }, [photoUrl, refetch])


    useEffect(() => {
        const addProfilePic = async () => {
            const colRef = collection(db, "users", currentUser?.docId, "ProfilePics");
            await addDoc(colRef, {
                imgurl: photoUrl,
                userId: currentUser?.docId,
                timestamp: serverTimestamp()
            });
        };
        if (photoUrl) addProfilePic();
    }, [photoUrl, currentUser?.docId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) return;

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setPhotoUrl(downloadUrl);
                    setFile("");
                });
            }
        );

    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
    };


    const params = useParams();
    console.log(params);

    return (
        <>
            {file && <ProfilePreview
                file={file}
                handleSubmit={handleSubmit}
                onClose={() => setFile(null)} />}
            <section className="userProfile-section">
                <div className="userProfile-avatar">
                    {profilePic ?
                        <img className="userImg" src={profilePic} alt="" /> :
                        <Avatar sx={{ width: '10rem', height: '10rem' }} />}
                    <label htmlFor="fileInput">
                        <div className="addAPhoto">
                            <AddAPhoto sx={{ fontSize: '1.8rem' }} />
                        </div>
                    </label>
                    <input type="file" id="fileInput" onChange={handleFileChange} />
                </div>
                <div className="userProfile-account_details">
                    <p>Account Details</p>
                    <Link to='/User/kelvin'>
                        <h4>PROFILE</h4>
                    </Link>
                    <Link to='Favourite-Movies'>
                        <h4>FAVOURITE MOVIES</h4>
                    </Link>
                    <h4>USER GUIDE</h4>
                </div>
                <div className="userProfile-other_info">
                    <p>others</p>
                    <Link to='settings'>
                        <h4 className="settings"> <Settings sx={{ color: 'white' }} /> SETTINGS</h4>
                    </Link>
                    <h4>LOG OUT</h4>
                </div>
            </section>
        </>
    )
};

export default UserProfile;