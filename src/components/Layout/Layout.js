import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { showPopUpMsg } from "../../store/features/addFavouriteSlice";
import PopUp from '../UI/Modal/PopUp';
import { useDispatch, useSelector } from "react-redux";

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

    return (
        <Fragment>
            {popUpMsg && <PopUp popUpMsg={popUpMsg} />}
            {!userOnAuthPage && <Navbar />}
            <main style={{ height: userOnAuthPage && '100%' }}>{children}</main>
            {!userOnAuthPage && <Footer />}
        </Fragment>
    )
};

export default Layout;