import React from 'react';
import { useRoutes, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies/Movies';
import TvShows from './pages/TvShow/TvShows';
import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import MovieSingle from './pages/Movies/MovieSingle';
import TvShowSingle from './pages/TvShow/TVShowSingle';
import News from './pages/News';
import User from './pages/User//User';
import UserProfileSettings from './pages/User/UserProfileSettings';


const App = () => {

    const [user] = useAuthState(auth);
    const location = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    

    const element = useRoutes([
        { path: '/', element: <Navigate to='home' /> },
        { path: '/home', element: <Home />},
        { path: '/SignUp', element: <SignUp /> },
        { path: '/LogIn', element: <LogIn />},
        { path: '/Movies', element: <Movies /> },
        { path: '/TvShows/:tvShowId/*', element: <TvShowSingle />},
        { path: '/TvShows', element: <TvShows />},
        { path: '/News', element: <News /> },
        { path: '/Movies/:movieId/*', element: <MovieSingle />},
        { path: user && '/User/:userName/*', element: <User /> },
        { path: user && '/User/:userName/settings', element: <UserProfileSettings />},
        { path: '*', element: <Navigate to='home' /> }
    ]);


    return <Layout>{element}</Layout>
};

export default App;