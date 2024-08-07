// App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:4001';

function App() {
    const [socket, setSocket] = useState(null);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('move', ({ id, direction }) => {
                // Update player position based on direction
                // This is just a basic example, replace it with your actual implementation
                setPlayers((prevPlayers) =>
                    prevPlayers.map((player) =>
                        player.id === id
                            ? {
                                ...player,
                                position: {
                                    x: player.position.x + direction.x,
                                    y: player.position.y + direction.y,
                                },
                            }
                            : player
                    )
                );
            });
        }
    }, [socket]);

    const handleMove = (direction) => {
        if (socket) {
            socket.emit('move', direction);
        }
    };

    return (
        <div>
            {players.map((player) => (
                <div key={player.id} style={{ position: 'absolute', left: player.position.x, top: player.position.y }}>
                    Player {player.id}
                </div>
            ))}
            <button onClick={() => handleMove({ x: -1, y: 0 })}>Move Left</button>
            <button onClick={() => handleMove({ x: 1, y: 0 })}>Move Right</button>
            <button onClick={() => handleMove({ x: 0, y: -1 })}>Move Up</button>
            <button onClick={() => handleMove({ x: 0, y: 1 })}>Move Down</button>
        </div>
    );
}

export default App;
