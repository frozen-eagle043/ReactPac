import React, { useEffect, useState } from 'react';
import Player from './Player';
import Enemy from './Enemy';

const GRID_SIZE = 50;
const MAZE_WIDTH = 10;
const MAZE_HEIGHT = 10;

const Game = () => {
  const [gameState, setGameState] = useState({
    playerX: 50,
    playerY: 50,
    playerSpeed: 5,
    enemies: [
      { id: 1, x: 250, y: 100, speed: 3 },
      { id: 2, x: 400, y: 300, speed: 4 },
    ],
    score: 0,
    gameOver: false,
  });

  const handleKeyPress = (event) => {
    if (!gameState.gameOver) {
      // Update player position based on the key pressed (e.g., arrow keys)
      if (event.key === 'ArrowUp') {
        setGameState((prevState) => ({
          ...prevState,
          playerY: prevState.playerY - prevState.playerSpeed,
        }));
      } else if (event.key === 'ArrowDown') {
        setGameState((prevState) => ({
          ...prevState,
          playerY: prevState.playerY + prevState.playerSpeed,
        }));
      } else if (event.key === 'ArrowLeft') {
        setGameState((prevState) => ({
          ...prevState,
          playerX: prevState.playerX - prevState.playerSpeed,
        }));
      } else if (event.key === 'ArrowRight') {
        setGameState((prevState) => ({
          ...prevState,
          playerX: prevState.playerX + prevState.playerSpeed,
        }));
      }
    }
  };

  useEffect(() => {
    const checkCollisions = () => {
      // Check for collisions between player and enemies
      gameState.enemies.forEach((enemy) => {
        if (
          gameState.playerX < enemy.x + GRID_SIZE &&
          gameState.playerX + GRID_SIZE > enemy.x &&
          gameState.playerY < enemy.y + GRID_SIZE &&
          gameState.playerY + GRID_SIZE > enemy.y
        ) {
          // Collision detected, game over
          setGameState((prevState) => ({
            ...prevState,
            gameOver: true,
          }));
        }
      });
    };

    // Check for collisions on each player/enemy movement
    checkCollisions();
  }, [gameState]);

  useEffect(() => {
    const updateGame = () => {
      if (!gameState.gameOver) {
        // Update enemy positions
        const updatedEnemies = gameState.enemies.map((enemy) => ({
          ...enemy,
          x: enemy.x + enemy.speed,
        }));

        setGameState((prevState) => ({
          ...prevState,
          enemies: updatedEnemies,
          score: prevState.score + 1,
        }));

        // Request the next animation frame
        requestAnimationFrame(updateGame);
      }
    };

    // Start the game loop
    updateGame();

    // Clean up the loop on unmount
    return () => cancelAnimationFrame(updateGame);
  }, [gameState]);

  useEffect(() => {
    // Add event listeners for key presses
    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listeners on unmount
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div style={{ position: 'relative', width: `${MAZE_WIDTH * GRID_SIZE}px`, height: `${MAZE_HEIGHT * GRID_SIZE}px` }}>
      {gameState.gameOver && <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' }}>Game Over</div>}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'grid', gridTemplateColumns: `repeat(${MAZE_WIDTH}, ${GRID_SIZE}px)` }}>
        {/* Render maze walls here if needed */}
      </div>
      <Player x={gameState.playerX} y={gameState.playerY} image={playerImage} />
      {gameState.enemies.map((enemy) => (
        <Enemy key={enemy.id} x={enemy.x} y={enemy.y} image={enemyImage} />
      ))}
    </div>
  );
};

export default Game;
