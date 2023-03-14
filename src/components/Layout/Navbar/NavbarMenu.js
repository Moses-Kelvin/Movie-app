import { Box, Menu, MenuItem, Slide } from "@mui/material";
import React, { useState } from "react";
import { AccountCircle, Login, Logout, Settings } from "@mui/icons-material";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import { Link } from "react-router-dom";

const NavbarMenu = ({ anchor, setAnchor, logUserOut, user }) => {

    const { data } = useFetchUserDataQuery(user?.uid);

    const linkStyle = {
        textDecoration: 'none',
        color: 'black',
    }

    const options = [
        {
            action: data?.data.name,
            icon: <AccountCircle sx={{ fontSize: "3rem" }} />
        },
        user ? {
            action: "Logout",
            icon: <Logout onClick={logUserOut} />
        } :
            {
                action:  <Link to="/LogIn" style={linkStyle}>Login</Link>,
                icon: <Login />
            },
            !user && {
                action:  <Link to="/SignUp" style={linkStyle}>SignUP</Link>,
                icon: ""
            },

        {
            action: <Link to="/User/kelvin/settings" style={linkStyle}>Settings</Link>,
            icon: <Settings />
        },
    ];

    const [selected, setSelected] = useState(-1);

    const closeMenu = () => {
        setAnchor(null);
    };

    const onMenuItemClick = (event, index) => {
        setAnchor(null);
        setSelected(index);
    };

    return (
        <Box>
            <Menu
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={closeMenu}
                keepMounted
                TransitionComponent={Slide}
                PaperProps={{
                    style: {
                        maxHeight: 50 * 4,
                        width: "20rem",
                        background: "white",
                    },
                }}
            >
                {options.map((options, index) => (
                    <MenuItem key={index}
                        style={{ fontWeight: "bold" }}
                        onClick={(event) => onMenuItemClick(event, index)}
                        selected={index === selected}>
                        {options.action}  {options.icon && options.icon}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
};

export default NavbarMenu;