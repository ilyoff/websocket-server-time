import {useCallback, useEffect, useRef, useState} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import api from '../../api';

export default function useServerTime() {
    const didMount = useRef(true);
    const [changeCallbackRef, updateChangeCallbackRef] = useState(false);
    const getUrl = useCallback(() => api.subscribe(), [changeCallbackRef]);

    useEffect(() => () => {
        didMount.current = false;
    }, []);

    const { lastJsonMessage, readyState } = useWebSocket(api.subscribe, {
        shouldReconnect: () => didMount.current,
        onClose() {
            if (didMount.current) {
                updateChangeCallbackRef(!changeCallbackRef);
            }
        },
        onError(...e) {
            console.log(e);
        }
    });

    return {
        timestamp: lastJsonMessage?.server_time,
        connected: readyState === ReadyState.OPEN,
    };
}
