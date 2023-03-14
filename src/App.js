import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import MovieSingle from './pages/Movies/MovieSingle';
import User from './pages/User//User';
import UserProfieSettings from './pages/User/UserProfileSettings';
import News from './pages/News';
import Movies from './pages/Movies/Movies';
import TvShowSingle from './pages/TvShow/TVShowSingle';
import TvShows from './pages/TvShow/TvShows';


const App = () => {

    const element = useRoutes([
        { path: '/', element: <Navigate to='home' /> },
        { path: '/home', element: <Home /> },
        { path: '/SignUp', element: <SignUp /> },
        { path: '/LogIn', element: <LogIn /> },
        { path: '/Movies', element: <Movies /> },
        { path: '/TvShows/:tvShowId', element: <TvShowSingle /> },
        { path: '/TvShows', element: <TvShows /> },
        { path: '/News', element: <News /> },
        { path: '/Movies/:movieId/*', element: <MovieSingle /> },
        { path: '/User/:userName/*', element: <User /> },
        { path: '/User/:userName/settings', element: <UserProfieSettings /> },
        { path: '*', element: <Navigate to='home' /> }
    ]);


    return  <Layout>{element}</Layout>
};

export default App;