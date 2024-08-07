import io from 'socket.io-client';
import { Game } from './Game.1';

export const socket = io('http://localhost:4000', {
withCredentials: true,
extraHeaders: {

    }
});

export default Game;
