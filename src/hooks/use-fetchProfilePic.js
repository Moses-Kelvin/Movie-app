import { collection, onSnapshot, orderBy } from "firebase/firestore";
import  { useEffect, useState } from "react";
import { db } from "../firebase";

const useFetchProfilePic = (id) => {

    const [profilePics, setProfilePics] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, `users/${id}/ProfilePics`),
            orderBy('timestamp', 'asc'), (snapshot) => {
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