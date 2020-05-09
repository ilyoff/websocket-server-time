import React from "react";

interface IUserContextState {
    isLoggedIn: boolean;
    setStateOnLogin: () => void;
    setStateOnLogout: () => void;
}

const defaultState = {
    isLoggedIn: false,
    setStateOnLogin: () => {},
    setStateOnLogout: () => {},
}

const UserContext = React.createContext<IUserContextState>(defaultState);

export default UserContext;
