import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const GRID_SIZE = 10; // Size of the game world grid
const CELL_SIZE = 50; // Size of each grid cell in pixels

const App = () => {
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState({});



  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    newSocket.on('initialPosition', (initialPosition) => {
      setPlayers((prevPlayers) => ({ ...prevPlayers, [newSocket.id]: initialPosition }));
    });

    newSocket.on('playerMoved', ({ playerId, position }) => {
      setPlayers((prevPlayers) => ({ ...prevPlayers, [playerId]: position }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  
  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleKeyDown = (event) => {
      // Handle player movement based on key presses (e.g., arrow keys)
      // Emit movement data to the server
      if (event.key === 'ArrowUp') {
        socket.emit('move', { direction: 'up' });
      } else if (event.key === 'ArrowDown') {
        socket.emit('move', { direction: 'down' });
      } else if (event.key === 'ArrowLeft') {
        socket.emit('move', { direction: 'left' });
      } else if (event.key === 'ArrowRight') {
        socket.emit('move', { direction: 'right' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [socket]);

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const cellKey = `${x}-${y}`;
        grid.push(
          <div key={cellKey} style={{ width: CELL_SIZE, height: CELL_SIZE, border: '1px solid black' }}>
            {renderPlayer(x, y)}
          </div>
        );
      }
    }
    return grid;
  };


  
  const renderPlayer = (x, y) => {
    for (const playerId in players) {
      const playerPosition = players[playerId];
      if (playerPosition.x === x && playerPosition.y === y) {
        return <div key={playerId} className="player-avatar" style={{width: '30px', height:'30px', backgroundColor: 'blue',
        borderRadius: '50%'}}></div>;
      }
    }
    return null;
  };

  

  return (
    <div>
      <h1>MMO Game</h1>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)` }}>
        {renderGrid()}
      </div>
      {/* Add other UI elements or controls here */}
    </div>
  );
};

export default App;
