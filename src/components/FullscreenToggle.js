import React from 'react';

const FullscreenToggle = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <button onClick={toggleFullscreen} className="fullscreen-toggle">
      Toggle Fullscreen
    </button>
  );
};

export default FullscreenToggle;
