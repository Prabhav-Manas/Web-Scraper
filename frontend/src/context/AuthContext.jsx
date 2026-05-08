import { createContext, useState, useEffect, useRef } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const logoutTimerRef = useRef(null);

    // Helper — decode JWT and get expiry time
    const getTokenExpiry = (authToken) => {
        try {
            const payload = JSON.parse(atob(authToken.split('.')[1]));
            return payload.exp * 1000; // convert to milliseconds
        } catch (error) {
            return null;
        }
    };

    // Helper — calculate remaining time in ms
    const getRemainingTime = (authToken) => {
        const expiry = getTokenExpiry(authToken);
        if (!expiry) return null;
        return expiry - Date.now();
    };

    const clearLogoutTimer = () => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        clearLogoutTimer();
    };

    // Start auto logout timer
    const startLogoutTimer = (authToken) => {
        const remainingTime = getRemainingTime(authToken);

        if (!remainingTime || remainingTime <= 0) {
            // Token already expired
            logout();
            return;
        }

        console.log(`Auto logout in ${Math.round(remainingTime / 1000 / 60)} minutes`);

        // Clear any existing timer first
        clearLogoutTimer();

        // Set new timer
        logoutTimerRef.current = setTimeout(() => {
            console.log('Token expired — auto logging out');
            logout();
            window.location.href = '/login';
        }, remainingTime);
    };

    // On app load — check token validity
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            const remainingTime = getRemainingTime(storedToken);

            if (!remainingTime || remainingTime <= 0) {
                // Token already expired — clear everything
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } else {
                // Token still valid — restore session
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                startLogoutTimer(storedToken);
            }
        }

        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));

        // ✅ Start auto logout timer on login
        startLogoutTimer(authToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};