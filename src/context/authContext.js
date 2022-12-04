import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocaleStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage("user", null);

    const navigate = useNavigate();

    // call this function to update the user (profile images, followers, following)
    const updateUser = (newUserObject) => {
        setUser(newUserObject);
    }

    // call this function when you want to authenticate the user
    const login = async (user) => {
        setUser(user);
        navigate("/");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        navigate("/signIn")
    };

    const value = useMemo(
        () => ({
            user,
            updateUser,
            login,
            logout
        }),

        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

AuthProvider.propTypes = {
    children: PropTypes.node,
    updateUser: PropTypes.func,
    login: PropTypes.func,
    logout: PropTypes.func
};
