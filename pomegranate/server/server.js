const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
});

const players = {};



io.on('connection', (socket) => {
    console.log('A user connected');

    // Generate a unique ID for the player
    const playerId = socket.id;

    // Store the initial position of the player
    players[playerId] = { x: 0, y: 0 };

    // Send the initial player position to the connected client
    socket.emit('initialPosition', players[playerId]);

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Remove the player from the players object when disconnected
        delete players[playerId];
    });


    socket.on('move', ({ direction }) => {
        // Update player position based on the movement direction
        if (direction === 'up') {
            players[playerId].y -= 1;
            console.log('up')
        } else if (direction === 'down') {
            players[playerId].y += 1;
            console.log('down')
        } else if (direction === 'left') {
            players[playerId].x -= 1;
            console.log('left')
        } else if (direction === 'right') {
            players[playerId].x += 1;
            console.log('right')
        }

        // Broadcast the updated position to all connected clients
        io.emit('playerMoved', { playerId, position: players[playerId] });
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});