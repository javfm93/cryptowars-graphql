import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../../../../backend/Events/events';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:5000', {
  withCredentials: true
});

export const useSocket = () => {
  useEffect(() => {
    console.log('connecting socket');
    socket.on('connect', () => {
      console.log('connected', socket.id);
    });

    socket.on('connect_error', () => {
      console.log('connect error');
    });

    socket.on('disconnect', reason => {
      console.log('disconnected', reason);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
    };
  }, []);

  return { socket };
};
