import React, { useState, useEffect } from "react";
import '../../styles/User/UserProfile.scss';
import { Avatar } from '@mui/material';
import { AddAPhoto, Settings } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import ProfilePreview from "../UI/ProfilePreview";
 

const UserProfile = () => {

    const [file, setFile] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser, refetch } = useFetchUserDataQuery(user?.uid);
    console.log(currentUser?.docId)

    const [photoUrl, setPhotoUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    useEffect(() => {
        if (photoUrl) {
            refetch();
        }
    }, [photoUrl, refetch])

    useEffect(() => {
        const updatePhoto = async () => {
            const userRef = doc(db, "users", currentUser?.docId);
            await updateDoc(userRef, {
                imgUrl: photoUrl
            })
        }
        if (photoUrl !== null) { updatePhoto(); }
    }, [photoUrl, currentUser?.docId])

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
            {file && <ProfilePreview file={file} handleSubmit={handleSubmit} onClose={() => setFile(null)} />}
            <section className="userProfile-section">
                <div className="userProfile-avatar">
                    {currentUser?.data.imgUrl ?
                        <img className="userImg" src={currentUser?.data.imgUrl} alt="" /> :
                        <Avatar sx={{ width: '8rem', height: '8rem' }} />}
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