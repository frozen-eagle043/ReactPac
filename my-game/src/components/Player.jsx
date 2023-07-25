import React from 'react';

const Player = ({ x, y, image }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '50px', // You can adjust the player's width and height based on your preference
        height: '50px',
      }}
    >
      <img src={image} alt="Player" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Player;
