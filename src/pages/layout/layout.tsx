import { BrowserRouter, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import { Login } from '../authentication/login/login';
import { Home } from '../home/home';
import { useAppStore } from '@/context';
import { Profile } from '../profile/profile';

import UserSettings from '@/assets/icons/user-round-cog.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';

export const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = () => {
    const state = useAppStore();

    const tabs = [{
        name: "Home",
        icon: <HomeIcon />,
        link: "/home"
    },
    {
        name: "Profile",
        icon: <UserSettings />,
        link: "/profile"
    }];
    return state.session ?
        <>
            <Outlet />
            <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                    {tabs.map((tab, index) => (
                        <Link to={tab.link} key={index} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                            {tab.icon}
                            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{tab.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
        : <Navigate to='/login' />
}