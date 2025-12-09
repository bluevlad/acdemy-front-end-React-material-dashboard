import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { login as loginApi, getProfile as getProfileApi } from "api/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                try {
                    const userData = await getProfileApi();
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, [token]);

    const login = async (credentials) => {
        try {
            const data = await loginApi(credentials);
            // Assuming backend returns { accessToken: "..." } or similar
            const accessToken = data.accessToken || data.token;
            localStorage.setItem("token", accessToken);
            setToken(accessToken);
            const userData = await getProfileApi();
            setUser(userData);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate("/authentication/sign-in");
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
