import useWebSocket, { ReadyState } from 'react-use-websocket';
import api from '../../api';

export default function useServerTime() {
    const { lastJsonMessage, readyState } = useWebSocket(api.subscribe, {
        shouldReconnect: () => true,
    });

    return {
        timestamp: lastJsonMessage?.server_time,
        connected: readyState === ReadyState.OPEN,
    };
}
