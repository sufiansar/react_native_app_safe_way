import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketService, SOCKET_EVENTS } from '../services/socket';

interface SocketContextType {
  isConnected: boolean;
  emit: (event: string, data?: any) => void;
  connectSocket: (token?: string) => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const connectSocket = (token?: string) => {
    const socket = socketService.connect(token);

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      setIsConnected(true);
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      setIsConnected(false);
    });
  };

  const disconnectSocket = () => {
    socketService.disconnect();
    setIsConnected(false);
  };

  const emit = (event: string, data?: any) => {
    socketService.emit(event, data);
  };

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        emit,
        connectSocket,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
