import React from "react";
import { Home, Movie, Newspaper, Tv } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const SidebarLinks = () => {
    return (
        <ul className='sidebar-links'>
            <li>
                <NavLink
                    to="/home" className={({ isActive }) =>
                        (!isActive ? "unselectedSidebarLink" : "activeSidebarLink")}>
                    <Home sx={{ color: 'white', paddingLeft: '1rem' }} />
                    <p>Home</p>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/Movies" className={({ isActive }) =>
                        (!isActive ? "unselectedSidebarLink" : "activeSidebarLink")}>
                    <Movie sx={{ color: 'white', paddingLeft: '1rem' }} />
                    <p>Movies</p>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/TvShows" className={({ isActive }) =>
                        (!isActive ? "unselectedSidebarLink" : "activeSidebarLink")}>
                    <Tv sx={{ color: 'white', paddingLeft: '1rem' }} />
                    <p>TvShows</p>
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/News" className={({ isActive }) =>
                        (!isActive ? "unselectedSidebarLink" : "activeSidebarLink")}>
                    <Newspaper sx={{ color: 'white', paddingLeft: '1rem' }} />
                    <p>News</p>
                </NavLink>
            </li>
        </ul>
    )
};

export default SidebarLinks;