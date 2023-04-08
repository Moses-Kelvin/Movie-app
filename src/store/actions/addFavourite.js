import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { showPopUpMsg, addBumpToFav } from "../features/addFavouriteSlice";
import { db } from "../../firebase";

export const Addfavourite = (data, userId) => {
    return async (dispatch) => {
    const sendRequest = async () => {
        const colRef = collection(db, `users/${userId}/Favourites`);
        const docs = await getDocs(colRef);
        const movie = docs?.docs.find(doc => data.title === doc.data().title);
        if (!movie) {
            await addDoc(collection(db, "users", userId, "Favourites"), {
                title: data.title,
                releaseDate: data.date,
                rating: data.vote,
                imgUrl: data.imgUrl,
                id: data.id,
                section: data.type,
                sentAt: serverTimestamp()
            });
            dispatch(showPopUpMsg("❤️ Added to favourite!"));

        } else {
            dispatch(showPopUpMsg("Movie already added to favourie"));

        }
    }

    try {
        await sendRequest();
    } catch (e) {
        console.log(e)
    }
}
}


export const AddBump = (data, userId) => {
    return async (dispatch) => {
       try {
        const colRef = collection(db, `users/${userId}/Favourites`);
        const docs = await getDocs(colRef);
        const movie = docs?.docs.find(doc => data.title === doc.data().title);
        if (!movie) {
            dispatch(addBumpToFav(true));
        } 
       } catch(e) {
        console.log(e)
       }
    }
}