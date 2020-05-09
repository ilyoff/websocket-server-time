import {AxiosError, AxiosResponse} from "axios";
import http, { HTTP_STATUS_CODE } from "./utils/http";
import Token from "./utils/Token";

interface ILoginSuccessResponse extends AxiosResponse {
    headers: {
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

class Api {
    login(data: { username: string, password: string }, attempt: number = 3): Promise<string | ILoginErrorData> {
        return http.post('/login', data)
            .then((response: ILoginSuccessResponse) => {
                const jwt = response.headers['x-test-app-jwt-token'];

                Token.set(jwt);

                return jwt;
            })
            .catch((error: AxiosError<ILoginErrorData>) => {
                if (error?.response?.status === HTTP_STATUS_CODE['Internal Server Error'] && attempt > 0) {
                    return this.login(data, attempt - 1);
                }

                throw error!.response!.data;
            });
    }
}

export default new Api();


