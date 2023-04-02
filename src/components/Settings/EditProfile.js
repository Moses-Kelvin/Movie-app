import React, { useState } from "react";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import '../../styles/Settings/EditProfile.scss';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const navigate = useNavigate();

    const editProfile = async (e) => {
          e.preventDefault();
          const userRef = doc(db, "users", currentUser?.docId);
          await updateDoc(userRef, {
             name: userName,
             email:  email,
             state: state,
             country: country
          })
          navigate('home');
    };


    return (
        <form className="EditProfile-form" onSubmit={editProfile}>
            <div>
                <InputField
                    id="standard-basic"
                    placeholder="Username"
                    type="text"
                    textColor="white"
                    required
                    Width='100%'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    type="email"
                    placeholder="Email Adress"
                    required
                    textColor="white"
                    Width='100%'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="Country"
                    type="text"
                    required
                    textColor="white"
                    Width='100%'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="State"
                    type="text"
                    textColor="white"
                    required
                    Width='100%'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    variant="filled" />
            </div>
            <Button className="EditProfile-btn">Save</Button>
        </form>
    )
};

export default EditProfile;