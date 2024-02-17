import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink } from 'react-router-dom';
import { Login } from '../authentication/login/login';
import { Home } from '../home/home';
import { useAppStore } from '@/context';
import { Profile } from '../profile/profile';

import UserSettings from '@/assets/icons/user-round-cog.svg?react';
import HomeIcon from '@/assets/icons/home.svg?react';
import clsx from 'clsx';

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
        icon: <HomeIcon className='text-gray-500'/>,
        link: "/home"
    },
    {
        name: "Profile",
        icon: <UserSettings className='text-gray-500'/>,
        link: "/profile"
    }];
    return state.session ?
        <>
            <Outlet />
            <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                    {tabs.map((tab, index) => (
                        <NavLink to={tab.link} key={index} className={({ isActive }) => clsx("inline-flex text-gray-500 flex-col items-center justify-center px-5 hover: dark:hover:bg-gray-800 group",isActive ? "bg-gray-50 text-blue-600" : "") }>
                            {tab.icon}
                            <span className="text-sm">{tab.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
        : <Navigate to='/login' />
}