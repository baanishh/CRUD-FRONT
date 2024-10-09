

import React, { createContext, useState, useEffect } from 'react';
import SummaryApi from '../common/SummaryApi';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const fetchUser = async () => {
        try {
            const res = await axios.get(SummaryApi.profile.url, {
                withCredentials: true,
            });
            setUser(res.data.user);
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        } finally {
            setLoading(false); // Always set loading to false
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
