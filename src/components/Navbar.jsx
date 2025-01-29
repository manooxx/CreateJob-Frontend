import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";


const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    const token = localStorage.getItem('token');
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    const handleCreateJobClick = () => {
        if (!isAuthenticated) {
            navigate('/login'); 
        } else {
            navigate('/createJob'); 
        }
    };

    return (
        <div className='w-full h-20 shadow-xl'>
            <div className='p-4 h-20 w-[80%] mx-auto  flex justify-between items-center '>
            <div className='w-12 h-12 '>
                <img src="https://cdn.pixabay.com/photo/2023/03/06/13/58/logo-7833520_1280.png" alt="" />
            </div>

<div>
    <ul className='flex justify-between items-center gap-8 text-gray-700'>
        <li className='cursor-pointer hover:underline duration-300 hover:text-purple-900 text-lg font-medium'><Link to="/">Jobs</Link></li>
        <li className='cursor-pointer hover:underline duration-300 hover:text-purple-900 text-lg font-medium' onClick={handleCreateJobClick}>Create Job</li>
        <li className='cursor-pointer hover:underline duration-300 hover:text-purple-900 text-lg font-medium'><Link to="/contact">Contact</Link></li>
    </ul>
</div>

<div className='flex justify-center items-center gap-4'>
    {isAuthenticated && (
        <div>
            <ul>
                <li className='cursor-pointer'><Link to="/companyDashboard"><FaUserAlt className='text-purple-600 text-xl ' /></Link></li>
            </ul>
        </div>
    )}

    {isAuthenticated ? (
        <button className="flex cursor-pointer text-xs justify-center items-center rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900" onClick={handleLogout}>Logout</button>
    ) : (
        <button className="flex cursor-pointer text-xs justify-center items-center rounded h-8 w-24 shadow-md text-white font-semibold bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900" onClick={handleLogin}>Login</button>
    )}
</div>

            </div>
           
        </div>
    );
};

export default Navbar;
