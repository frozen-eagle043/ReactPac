import React from 'react';

const Enemy = ({ x, y, image }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '50px', // Adjust the enemy's width and height as needed
        height: '50px',
      }}
    >
      <img src={image} alt="Enemy" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Enemy;
