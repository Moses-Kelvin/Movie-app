import React from "react";
import Button from "../UI/Button";
import InputField from "../UI/InputField";
import '../../styles//Settings/ChangePassword.scss';
import { VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
    return (
        <form className="ChangePassword-form">
            <div>
                <InputField
                    id="standard-basic"
                    placeholder="Old Password"
                    textColor="white"
                    required
                    Width='100%'
                    iconEnd={<VisibilityOff sx={{color: 'white'}}/>}
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="New Password"
                    textColor="white"
                    required
                    Width='100%'
                    iconEnd={<VisibilityOff sx={{color: 'white'}}/>}
                    variant="filled" />
                <InputField
                    id="standard-basic"
                    placeholder="Confirm New Password"
                    textColor="white"
                    Width='100%'
                    iconEnd={<VisibilityOff sx={{color: 'white'}}/>}
                    variant="filled" />
            </div>
            <Button className="ChangePassword-btn">Save</Button>
        </form>
    )
};

export default ChangePassword;