import React from 'react';
import ReactDOM from "react-dom";
import { BackDrop } from '../Modal/SearchModal';
import { AccountCircle, ArrowBack, Login, Settings } from '@mui/icons-material';
import "../../../styles/UI/Sidebar/Sidebar.scss";
import SidebarLinks from './SidebarLinks';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { useFetchUserDataQuery } from '../../../store/features/userDataSlice';
import useFetchProfilePic from '../../../hooks/use-fetchProfilePic';

const SidebarOverlay = ({ setOpenSidebar, logUserOut}) => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const profilePic = useFetchProfilePic(currentUser?.docId);

    return (
        <section className="sidebar">
            <div className="sidebar-dots">
                <div></div>
                <div></div>
                <div ></div>
            </div>
            <div className="sidebar-profile">
                {profilePic ?
                    <img src={profilePic} alt="" />
                    : <AccountCircle sx={{ fontSize: '3rem', paddingRight: '0.5rem' }} />}
                <h3>{currentUser?.data.name}</h3>
                <ArrowBack
                    onClick={() => setOpenSidebar(false)}
                    className="sidebar-arrowback" />
            </div>
            <SidebarLinks />
            <div className="sidebar-account">
                <h3>Account</h3>
                {!user && <Link to='/LogIn'>
                    <Login />
                    <p>Login</p>
                </Link>}
                {!user && <Link to="/SignUp">
                    <p>SigUup</p>
                </Link>}
                {user && <p onClick={() => logUserOut()}>Logout</p>}
                {user && <Link to="users/kelvin/settings">
                    <Settings />
                    <p>Settings</p>
                </Link>}
            </div>
        </section>
    )
}

const Sidebar = ({ setOpenSidebar, logUserOut }) => {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop handleClick={() => setOpenSidebar(false)} />, document.getElementById("overlays"))}
            {ReactDOM.createPortal(<SidebarOverlay setOpenSidebar={setOpenSidebar}
                logUserOut={logUserOut} 
            />, document.getElementById("overlays"))}
        </>
    )
};

export default Sidebar;