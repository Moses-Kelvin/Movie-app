import { Add, Remove } from "@mui/icons-material";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import '../../../styles/SingleReview/Votes.scss';

const Votes = ({ className, id }) => {

    const [votes, setVotes] = useState([]);

    const { movieId } = useParams();


    const [user] = useAuthState(auth);

    const { data } = useFetchUserDataQuery(user?.uid);

    const AddVote = async () => {
        const colRef = collection(db, "Movies", movieId, "Comments", id, "Votes");
        const q = query(colRef, where("userId", "==", data?.docId));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(colRef, {
                userId: data?.docId,
                username: data?.data.name
            })
        } else {
            alert("you cannot vote twice!")
        }
    };

    useEffect(() => {
        onSnapshot(collection(db, `Movies/${movieId}/Comments/${id}/Votes`), orderBy(
            'timestamp', 'asc'), (snapshot) => {
                setVotes(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            }
        )

    }, [id, movieId]);

    const RemoveVote = async () => {
        // const docRef = doc(db, `Movies/${movieId}/Comments/${id}/Votes/${voteId}`);
        // await deleteDoc(docRef);
    };

    return (
        <div className={`votes ${className}`}>
            <Add onClick={AddVote} />
            <p>{votes.length}</p>
            <Remove onClick={RemoveVote} />
        </div>
    )
};

export default Votes;