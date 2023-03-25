import React, { useState } from "react";
import '../../../styles/Navbar/Navbar.scss';
import { Search, AccountCircle } from "@mui/icons-material";
import Button from '../../UI/Button';
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchModal from "../../UI/Search/SearchModal";
import { useMediaQuery, useTheme } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../../../firebase";
import { Movie, Tv, Newspaper, Home, MoreVert } from "@mui/icons-material";
import NavbarMenu from "./NavbarMenu";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";

const Navbar = () => {

    const [anchor, setAnchor] = useState(null);
    const [searchIsVisible, setSearchIsVisible] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);


    const theme = useTheme();
    const showNavItems = useMediaQuery(theme.breakpoints.up('sm'));

    const logUserOut = () => {
        logout();
        navigate("/home")
    };

    const openMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    return (
        <>
            {searchIsVisible && <SearchModal setSearchIsVisible={setSearchIsVisible} />}
            <NavbarMenu
                anchor={anchor}
                setAnchor={setAnchor}
                logUserOut={logUserOut}
                user={user}
            />
            <nav className="navbar">
                <Link to='/home'>
                    <h1>{showNavItems ? "Movies" : "KM"}</h1>
                </Link>
                <ul>
                    <li>
                        <NavLink
                            to="/home" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            {showNavItems ? "Home" : <Home sx={{ color: 'white' }} />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Movies" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            {showNavItems ? "Movies" : <Movie sx={{ color: 'white' }} />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/TvShows" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            {showNavItems ? "Tv-shows" : <Tv sx={{ color: 'white' }} />}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/News" className={({ isActive }) => (!isActive ? "unselected" : "active")}>
                            {showNavItems ? "News" : <Newspaper sx={{ color: 'white' }} />}
                        </NavLink>
                    </li>
                </ul>
                <div className="navbar-icons">
                    <Search sx={{ fontSize: '30px' }} onClick={() => setSearchIsVisible(true)} />
                    {user && <Link to='/User/kelvin'>
                        {showNavItems && (currentUser?.data.imgUrl ?<img src={currentUser?.data.imgUrl} alt = "" />
                    : <AccountCircle sx={{ fontSize: '40px', color: 'white' }} />)}
                    </Link>}
                    {(!user && showNavItems) && <Link to='/LogIn'>
                        <Button className='log-in'>Log In</Button>
                    </Link>}
                    {(showNavItems && user) && <Button className='log-out' handleClick={logUserOut}>Log Out</Button>}
                    {(!user && showNavItems) && <Link to='/SignUp'>
                        <Button className='sign-up'>Sign Up</Button>
                    </Link>}
                    {!showNavItems && <MoreVert onClick={openMenu} />}
                </div>
            </nav>
        </>
    )
};

export default Navbar;