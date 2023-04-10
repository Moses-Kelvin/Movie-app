import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../firebase";

const useFetchProfilePic = (id) => {

    const [profilePics, setProfilePics] = useState([]);

    useEffect(() => {
        const q = query(collection(db, `users/${id}/ProfilePics`),  orderBy('timestamp', 'desc')) 
        onSnapshot(q, (snapshot) => {
                setProfilePics(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )
    }, [id]);

    return profilePics[0]?.data.imgurl;

};

export default useFetchProfilePic;