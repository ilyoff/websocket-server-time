import React from "react";

interface IUserContextState {
    isLoggedIn: boolean;
    setStateOnLogin: () => void;
    logout: () => void;
}

const defaultState = {
    isLoggedIn: false,
    setStateOnLogin: () => {},
    logout: () => {},
}

const UserContext = React.createContext<IUserContextState>(defaultState);

export default UserContext;
