import { useEffect } from 'react';
import { socketService } from './socket.service';

export function useSocketEvent<T = any>(
  event: string,
  handler: (data: T) => void
) {
  useEffect(() => {
    socketService.on(event, handler);

    return () => {
      socketService.off(event, handler);
    };
  }, [event, handler]);
}
