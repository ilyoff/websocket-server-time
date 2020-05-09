import React from 'react';
import './Info.scss';
import Box from "../Box/Box";

const Info = (): JSX.Element => {
    return (
        <Box className="info">
            <p className="info__text">
                Status:
                <span className="info__status info__status--connected">
                    connected
                </span>
            </p>
            <p className="info__date">
                09.05.2020 18:00:21
            </p>

            <button className="info__logout">Logout</button>
        </Box>
    );
};

export default Info;
