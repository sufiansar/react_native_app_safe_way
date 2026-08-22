import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from './events';

export const SOCKET_URL = 'http://localhost:5000'; // Update with backend Socket.IO URL

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  // Initialize and connect Socket.IO
  public connect(token?: string): Socket {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        token: token || '',
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      this.isConnected = true;
      console.log('⚡ [Socket.IO] Connected successfully to server:', this.socket?.id);
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      this.isConnected = false;
      console.log('⚡ [Socket.IO] Disconnected from server:', reason);
    });

    this.socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
      this.isConnected = false;
      console.error('⚡ [Socket.IO] Connection error:', error.message);
    });

    return this.socket;
  }

  // Disconnect Socket
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('⚡ [Socket.IO] Socket manually disconnected');
    }
  }

  // Get active socket instance
  public getSocket(): Socket | null {
    return this.socket;
  }

  // Check connection status
  public checkIsConnected(): boolean {
    return this.isConnected && !!this.socket?.connected;
  }

  // Emit event to server
  public emit(event: string, data?: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn(`⚡ [Socket.IO] Cannot emit "${event}". Socket is not connected.`);
    }
  }

  // Listen to event from server
  public on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remove listener for event
  public off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = new SocketService();
