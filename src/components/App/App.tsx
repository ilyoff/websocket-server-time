import React, {useCallback, useState} from 'react';
import Token from "../../utils/Token";
import UserContext from '../../UserContext';
import Form from "../Form/Form";
import Info from "../Info/Info";
import Layout from "../Layout/Layout";

const App = (): JSX.Element => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Token.get());
    const setOnLogin = useCallback(() => setIsLoggedIn(true), [setIsLoggedIn]);
    const setOnLogout = useCallback(() => setIsLoggedIn(false), [setIsLoggedIn]);

    return (
        <UserContext.Provider value={{ isLoggedIn, setStateOnLogin: setOnLogin, setStateOnLogout: setOnLogout }}>
            <Layout>
                {isLoggedIn ? <Info /> : <Form/>}
            </Layout>
        </UserContext.Provider>
    );
};

export default App;
