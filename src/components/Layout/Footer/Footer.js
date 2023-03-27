import React from "react";
import { Facebook, Twitter, WhatsApp, GitHub } from "@mui/icons-material";
import { TextField } from "@mui/material";
import '../../../styles/Footer/Footer.scss';
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const navigate = useNavigate();

    const accountHandler = () => {
        if (user) {
            navigate(`/User/${currentUser?.data.name}`);
        }
    }

    return (
        <footer className="footer">
            <div>
                <h1>MOVIES</h1>
                <div className="footer-icons">
                    <Facebook sx={{ color: 'white' }} />
                    <Twitter sx={{ color: 'white' }} />
                    <WhatsApp sx={{ color: 'white' }} />
                    <GitHub sx={{ color: 'white' }} />
                </div>
            </div>
            <div className="footer-quicklinks">
                <h3>Quick-Links</h3>
                <p>Movies</p>
                <p>TV Shows</p>
                <p>Animations</p>
                <p>Blog</p>
            </div>
            <div className="footer-account">
                <h3>Account</h3>
                <p onClick={accountHandler}>My Account</p>
                <p>User Guide</p>
                {!user && <Link to="SignUp"><p>Sign Up</p></Link>}
                {!user && <Link to="LogIn"><p>Log In</p></Link>}
            </div>
            <div className="footer-newsletter">
                <h3>NewsLetter</h3>
                <p>Subscribe to our newsletter system now to get latest news from us.</p>
                <TextField
                    id="standard-basic"
                    sx={{
                        width: '60%', "& .MuiInputBase-root": {
                            color: 'white'
                        }
                    }}
                    placeholder="Enter your Email"
                    variant="standard"
                />
                <h2>Suscribe Now</h2>
            </div>
        </footer>
    )
};

export default Footer;