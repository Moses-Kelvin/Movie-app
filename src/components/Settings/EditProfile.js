import React from "react";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import '../../styles/Settings/EditProfile.scss';

const EditProfile = () => {
    return (
        <form className="EditProfile-form">
            <div>
                <InputField
                    id="standard-basic"
                    placeholder="Username"
                    textColor="white"
                    Width='100%'
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="Email Adress"
                    textColor="white"
                    Width='100%'
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="Country"
                    textColor="white"
                    Width='100%'
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="State"
                    textColor="white"
                    Width='100%'
                    variant="filled" />
            </div>
            <Button className="EditProfile-btn">Save</Button>
        </form>
    )
};

export default EditProfile;