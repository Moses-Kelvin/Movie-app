import React from "react";
import { Navigate, useParams, useRoutes } from "react-router-dom";
import UserProfile from "../../components/User/UserProfile";
import UserProfileDetails from "../../components/User/UserProfileDetails";
import '../../styles/Pages/User.scss';
import UserFavouriteMovies from "./UserFavouriteMovies";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFetchUserDataQuery } from "../../store/features/userDataSlice";
import { auth } from '../../firebase';
import { useMediaQuery, useTheme } from "@mui/material";


const User = () => {

    const [user] = useAuthState(auth);

    const { data: currentUser } = useFetchUserDataQuery(user?.uid);

    const theme = useTheme();
    const mobileScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const profileName = <h1>{currentUser?.data.name} PROFILE</h1>;

    console.log(currentUser)

    const { userName } = useParams();

    const element = useRoutes([
        { index: true, element: <UserProfileDetails data={currentUser?.data} /> },
        { path: 'Favourite-Movies', element: <UserFavouriteMovies /> },
        { path: '*', element: <Navigate to={`/User/${userName}`} /> }
    ]);

    return (
        <section className="User-section">
            <div>
                {!mobileScreen && profileName}
                <UserProfile />
            </div>
            <div>
                {!mobileScreen && <h2>Profile Details</h2>}
                {mobileScreen && profileName}
                {element}
            </div>
        </section>
    )
};

export default User;