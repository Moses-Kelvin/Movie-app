import React from "react";
import { Facebook, Twitter, WhatsApp, GitHub } from "@mui/icons-material";
import { TextField } from "@mui/material";
import '../../../styles/Footer/Footer.scss';

const Footer = () => {
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
                <p>My Account</p>
                <p>User Guide</p>
                <p>Sign Up</p>
                <p>Log In</p>
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