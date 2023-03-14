import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children, setSearchIsVisible }) => {

    const { pathname } = useLocation();
    const userOnAuthPage = pathname.includes('SignUp') || pathname.includes('LogIn');
    // console.log(userOnAuthPage);

    return (
        <Fragment>
            {!userOnAuthPage && <Navbar setSearchIsVisible={setSearchIsVisible} />}
            <main style={{ height: userOnAuthPage && '100%' }}>{children}</main>
            {!userOnAuthPage && <Footer />}
        </Fragment>
    )
};

export default Layout;