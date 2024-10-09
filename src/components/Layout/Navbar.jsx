// src/components/Layout/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import SummaryApi from '../../common/SummaryApi';

const Navbar = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.post(SummaryApi.logout.url, {}, {
                withCredentials: true,
            });
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-xl font-bold">
                        Home
                    </Link>
                </div>
                <div>
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm">
                                Welcome, <span className="font-semibold">{user.username}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="text-sm font-bold hover:text-gray-300">
                                Login
                            </Link>
                            <Link to="/register" className="text-sm font-bold hover:text-gray-300">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
