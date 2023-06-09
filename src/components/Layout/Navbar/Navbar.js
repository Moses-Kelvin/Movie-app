import React, { useEffect, useState } from "react";
import '../../../styles/layout/Navbar/Navbar.scss';
import { Search, AccountCircle, Menu, Notifications } from "@mui/icons-material";
import Button from '../../UI/Button';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchModal from "../../UI/Modal/SearchModal";
import { useMediaQuery, useTheme, Badge } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../../firebase";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import Sidebar from "../../UI/Sidebar/Sidebar";
import useFetchProfilePic from "../../../hooks/use-fetchProfilePic";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Navbar = () => {

    const [openSidebar, setOpenSidebar] = useState(false);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);


    const theme = useTheme();
    const onDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const profilePic = useFetchProfilePic(currentUser?.docId);

    const location = useLocation();

    useEffect(() => {
        setOpenSidebar(false);
        setSearchIsVisible(false);
    }, [location]);

    useEffect(() => {
            const q = query(collection(db, `users/${currentUser?.docId}/Notifications`),
            where("onRead", "==", false));
            onSnapshot(q, (snapshot) => {
                setNotifications(snapshot.docs.map(doc => ({
                  id: doc.id,
                  data: doc.data()
                })))
              })
    }, [currentUser?.docId]);


    const logUserOut = () => {
        logout();
        navigate("/home")
    };


    return (
        <>
            {openSidebar &&
                <Sidebar
                    setOpenSidebar={setOpenSidebar}
                    logUserOut={logUserOut}
                />}
            {searchIsVisible && <SearchModal setSearchIsVisible={setSearchIsVisible} />}
            <nav className="navbar">
                {!onDesktop && <Menu
                    onClick={() => setOpenSidebar(true)}
                    sx={{ fontSize: '2.3rem', marginLeft: '1rem' }} />}
                <Link to='/home'>
                    <h1>KM</h1>
                </Link>
                {onDesktop && <ul>
                    <li>
                        <NavLink
                            to="/home" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Movies" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            Movies
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/TvShows" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            Tv-shows
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/News" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            News
                        </NavLink>
                    </li>
                </ul>}
                <div className="navbar-icons">
                    <Search sx={{ fontSize: '30px', paddingRight: '1rem' }}
                        onClick={() => setSearchIsVisible(true)} />
                    <Link to="notifications">
                        {user && <Badge badgeContent={notifications.length} 
                        invisible={notifications.length === 0} color="error" maximum={9}>
                            <Notifications sx={{ fontSize: '30px' }} />
                        </Badge>
                        }
                    </Link>
                    {user && <Link to={`User/${currentUser?.data.name}`}>
                        {profilePic ?
                            <img src={profilePic} alt="" />
                            : <AccountCircle sx={{ fontSize: '40px', color: 'white' }} />}
                    </Link>}
                    {(!user && onDesktop) && <Link to='/LogIn'>
                        <Button className='log-in'>Log In</Button>
                    </Link>}
                    {(onDesktop && user) && <Button className='log-out'
                        handleClick={logUserOut}>
                        Log Out
                    </Button>}
                    {(!user && onDesktop) && <Link to='/SignUp'>
                        <Button className='sign-up'>Sign Up</Button>
                    </Link>}
                </div>
            </nav>
        </>
    )
};

export default Navbar;