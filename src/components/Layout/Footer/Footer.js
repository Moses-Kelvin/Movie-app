import React from "react";
import { Twitter, WhatsApp, GitHub, LinkedIn } from "@mui/icons-material";
import '../../../styles/Footer/Footer.scss';
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../../store/features/userDataSlice";
import { Link, useNavigate } from "react-router-dom";
import tmdb from '../../../assets/images/tmdb.svg';

const Footer = () => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const navigate = useNavigate();

    const accountHandler = () => {
        if (user) {
            navigate(`/User/${currentUser?.data.name}`);
        }
    };

    const CopyrightYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div>
                <h1>MOVIES</h1>
                <div className="footer-icons">
                    <a href="https://www.linkedin.com/in/kelvin-moses-90538023a">
                        <LinkedIn sx={{ color: 'white' }} />
                    </a>
                    <a href="https://twitter.com/MosesKel16003083">
                        <Twitter sx={{ color: 'white' }} />
                    </a>
                    <a href="https://wa.me/08108989321">
                        <WhatsApp sx={{ color: 'white' }} />
                    </a>
                    <a href="https://github.com/Moses-Kelvin">
                        <GitHub sx={{ color: 'white' }} />
                    </a>
                </div>
            </div>
            <div className="footer-quicklinks">
                <h3>Quick-Links</h3>
                <p><Link to="/Movies">Movies</Link></p>
                <p> <Link to="TvShows">TV Shows</Link></p>
                <p><Link to="/News">News</Link></p>
            </div>
            <div className="footer-account">
                <h3>Account</h3>
                <p onClick={accountHandler}>My Account</p>
                {!user && <Link to="SignUp"><p>Sign Up</p></Link>}
                {!user && <Link to="LogIn"><p>Log In</p></Link>}
            </div>
            <div className="footer-tmdbIcon">
                <img src={tmdb} alt="" />
                <p>© kelvin moses {CopyrightYear}</p>
            </div>
        </footer>
    )
};

export default Footer;