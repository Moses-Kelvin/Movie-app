import React from "react";
import '../../styles/User/UserProfileDetails.scss';


const UserProfileDetails = ({ data }) => {

    return (
        <section className="UserProfileDetails-section">
            <div className="UserProfileDetails-section_details">
                <div>
                    <p>Username</p>
                    <h3>{data?.name}</h3>
                </div>
                <div>
                    <p>Email</p>
                    <h3>{data?.email}</h3>
                </div>
                <div>
                    <p>Country</p>
                    <h3>Nigeria</h3>
                </div>
                <div>
                    <p>State</p>
                    <h3>Lagos</h3>
                </div>
            </div>
        </section>
    )
};

export default UserProfileDetails;