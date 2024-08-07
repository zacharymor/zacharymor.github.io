import React, { useState, useEffect, useRef } from 'react';
import { socket } from './Game';

export const Game = () => {
    const [players, setPlayers] = useState({});
    const [playerId, setPlayerId] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const chatInputRef = useRef(null);

    useEffect(() => {
        socket.on('init', ({ id, players }) => {
            setPlayerId(id);
            setPlayers(players);
        });

        socket.on('newPlayer', (player) => {
            setPlayers((prevPlayers) => ({ ...prevPlayers, [player.id]: player }));
        });

        socket.on('updatePlayer', (player) => {
            setPlayers((prevPlayers) => ({ ...prevPlayers, [player.id]: player }));
        });

        socket.on('removePlayer', (id) => {
            setPlayers((prevPlayers) => {
                const newPlayers = { ...prevPlayers };
                delete newPlayers[id];
                return newPlayers;
            });
        });

        socket.on('chat', ({ id, message }) => {
            setChatMessages((prevMessages) => [...prevMessages, { id, message }]);
        });

        return () => {
            socket.off('init');
            socket.off('newPlayer');
            socket.off('updatePlayer');
            socket.off('removePlayer');
            socket.off('chat');
            socket.disconnect(); // Clean up the socket connection on component unmount
        };
    }, []);

    const handleKeyDown = (e) => {
        if (!playerId) return;
        let { x, y } = players[playerId];
        if (e.key === 'ArrowUp') y -= 5;
        if (e.key === 'ArrowDown') y += 5;
        if (e.key === 'ArrowLeft') x -= 5;
        if (e.key === 'ArrowRight') x += 5;
        socket.emit('move', { x, y });
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        const message = chatInputRef.current.value;
        if (message.trim()) {
            socket.emit('chat', message);
            chatInputRef.current.value = '';
        }
    };

    return (
        <div tabIndex="0" onKeyDown={handleKeyDown} style={{ height: '100vh', outline: 'none' }}>
            <div className="game-area">
                {Object.values(players).map((player) => (
                    <div key={player.id} className="player" style={{ top: player.y, left: player.x }}>
                        {player.name}
                    </div>
                ))}
            </div>
            <div className="chat-area">
                <div className="messages">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="message">
                            <strong>{msg.id}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleChatSubmit}>
                    <input type="text" ref={chatInputRef} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};
