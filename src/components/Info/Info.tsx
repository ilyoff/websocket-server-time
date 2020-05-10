import React, {useContext} from 'react';
import './Info.scss';
import UserContext from "../../UserContext";
import Box from "../Box/Box";
import useServerTime from "./useServerTime";

const formatTime = (timestamp: number): string => {
    try {

        const date = new Date(timestamp * 1000);

        return date.toLocaleString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    } catch (e) {
        return '';
    }
}

const Info = (): JSX.Element => {
    const { timestamp, connected } = useServerTime();
    const { logout } = useContext(UserContext);

    return (
        <Box className="info">
            <p className="info__text">
                Status:
                <span className={`info__status ${connected ? 'info__status--connected' : 'info__status--disconnected'}`}>
                    {connected ? 'connected' : 'disconnected'}
                </span>
            </p>
            <p className="info__date">
                {formatTime(timestamp)}
            </p>

            <button className="info__logout" onClick={logout}>Logout</button>
        </Box>
    );
};

export default Info;
