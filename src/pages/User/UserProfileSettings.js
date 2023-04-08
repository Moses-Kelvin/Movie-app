import React from "react";
import ChangePassword from "../../components/Settings/ChangePassWord";
import EditProfile from "../../components/Settings/EditProfile";
import '../../styles/Pages/UserProfieSettings.scss';

const UserProfileSettings = () => {
    return (
        <section className="UserProfieSettings-section">
            <h1>SETTINGS</h1>
            <div className="UserProfieSettings-card">
                <div className="edit-profile">
                    <h2>01 Edit Profile</h2>
                    <EditProfile />
                </div>
                <div className="change-password">
                    <h2>02 Change Password</h2>
                    <ChangePassword />
                </div>
            </div>
        </section>
    )
};

export default UserProfileSettings;