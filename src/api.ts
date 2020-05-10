import {AxiosError, AxiosResponse} from "axios";
import http, { HTTP_STATUS_CODE } from "./utils/http";
import Token from "./utils/Token";

interface ILoginSuccessResponse extends AxiosResponse {
    headers: {
        [header: string]: string;
        'x-test-app-jwt-token': string;
    };
    data: {
        status: 'OK';
    }
}

type ILoginErrorData = {
    code: HTTP_STATUS_CODE;
    description: string;
}

interface ISubscribeData {
    url: string;
}

class Api {
    login(data: { username: string, password: string }, attempt: number = 3): Promise<string | ILoginErrorData> {
        return http.post('/login', data)
            .then((response: ILoginSuccessResponse) => {
                const jwt = response.headers['x-test-app-jwt-token'];

                Token.set(jwt);

                return jwt;
            })
            .catch((error: AxiosError<ILoginErrorData>) => {
                const status = error?.response?.status;

                if (
                    status !== HTTP_STATUS_CODE.BadRequest
                    && status !== HTTP_STATUS_CODE.Unauthorized
                    && attempt > 0
                ) {
                    return this.login(data, attempt - 1);
                }

                return Promise.reject(error!.response!.data);
            });
    }

    subscribe(): Promise<ISubscribeData['url']> {
        return http.get('/subscribe')
            .then((response: AxiosResponse<ISubscribeData>) => {
                return response.data.url;
            })
            .catch((error: AxiosError) => {
                return Promise.reject(error.response?.status);
            });
    }
}

export default new Api();


