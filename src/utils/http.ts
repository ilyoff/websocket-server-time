import axios from 'axios';
import Token from "./Token";

export enum HTTP_STATUS_CODE {
    BadRequest = 400,
    Unauthorized = 401,
    InternalServerError = 500,
}

const config = {
    baseURL: 'https://work.vint-x.net/api',
    headers: {
        accept: 'application/json',
    },
};

const http = axios.create(config);


http.interceptors.request.use((config) => {
    const jwt = Token.get();

    return !jwt ? config : {
        ...config,
        headers: {
            ...config.headers,
            'x-test-app-jwt-token': jwt,
        }
    };
});

export default http;
