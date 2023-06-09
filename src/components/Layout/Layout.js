import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { showPopUpMsg } from "../../store/features/addFavouriteSlice";
import PopUp from '../UI/Modal/PopUp';
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "@mui/icons-material";
import "../../styles/layout/Layout.scss";

const Layout = ({ children, }) => {

    const popUpMsg = useSelector((state) => state.Favourite.message);
    const dispatch = useDispatch();

    const { pathname } = useLocation();
    const userOnAuthPage = pathname.includes('SignUp') || pathname.includes('LogIn');

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(showPopUpMsg(""));
        }, 1000);

        return () => clearTimeout(timer);
    }, [popUpMsg, dispatch]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    };

    return (
        <Fragment>
            {popUpMsg && <PopUp popUpMsg={popUpMsg} />}
           {!userOnAuthPage && <div className="navigation">
                <Navigation 
                onClick={scrollToTop} sx={{color: 'blue', fontSize: '2rem'}} />
            </div>}
            {!userOnAuthPage && <Navbar />}
            <main style={{ height: userOnAuthPage && '100%' }}>{children}</main>
            {!userOnAuthPage && <Footer />}
        </Fragment>
    )
};

export default Layout;