// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

import SummaryApi from '../common/SummaryApi';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get(SummaryApi.profile.url,{
                withCredentials: true,
            }); // You need to create this route
            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
